import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Points configuration
const POINTS = {
  ATTENDANCE: 10,
  STREAK_BONUS: {
    WEEKLY: 50,   // 7 days streak
    MONTHLY: 200, // 30 days streak
  },
  DURATION_BONUS: 1, // 1 point per 10 minutes spent in lab
};

export async function recordAttendance(userId: string, labSessionId: string) {
  // Check if lab session exists and is active
  const labSession = await prisma.labSession.findUnique({
    where: { id: labSessionId },
  });

  if (!labSession) {
    throw new Error('Lab session not found');
  }

  if (!labSession.isActive) {
    throw new Error('Lab session is not active');
  }

  // Check if user already checked in
  const existingAttendance = await prisma.attendance.findUnique({
    where: {
      userId_labSessionId: {
        userId,
        labSessionId,
      },
    },
  });

  if (existingAttendance) {
    throw new Error('Already checked in for this session');
  }

  // Record attendance
  const attendance = await prisma.attendance.create({
    data: {
      userId,
      labSessionId,
      checkInTime: new Date(),
    },
  });

  // Update streak
  await updateStreak(userId);

  // Award base attendance points
  await awardPoints(userId, POINTS.ATTENDANCE);

  return attendance;
}

export async function recordCheckout(userId: string, labSessionId: string) {
  // Find the attendance record
  const attendance = await prisma.attendance.findUnique({
    where: {
      userId_labSessionId: {
        userId,
        labSessionId,
      },
    },
  });

  if (!attendance) {
    throw new Error('No check-in record found');
  }

  if (attendance.checkOutTime) {
    throw new Error('Already checked out');
  }

  const checkOutTime = new Date();
  const durationMinutes = Math.floor((checkOutTime.getTime() - attendance.checkInTime.getTime()) / (1000 * 60));

  // Update attendance with checkout time and duration
  await prisma.attendance.update({
    where: { id: attendance.id },
    data: {
      checkOutTime,
      duration: durationMinutes,
    },
  });

  // Award duration bonus points (1 point per 10 minutes)
  const durationPoints = Math.floor(durationMinutes / 10) * POINTS.DURATION_BONUS;
  if (durationPoints > 0) {
    await awardPoints(userId, durationPoints);
  }

  return { durationMinutes, pointsAwarded: durationPoints };
}

export async function updateStreak(userId: string) {
  // Get user
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, currentStreak: true, longestStreak: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Get the most recent attendance before today
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Format date to YYYY-MM-DD for comparison
  const yesterdayFormatted = yesterday.toISOString().split('T')[0];

  // Check if there was a lab session yesterday
  const yesterdayLabSession = await prisma.labSession.findFirst({
    where: {
      date: {
        gte: new Date(`${yesterdayFormatted}T00:00:00Z`),
        lt: new Date(`${yesterdayFormatted}T23:59:59Z`),
      },
    },
  });

  // Check if yesterday was a holiday
  const yesterdayHoliday = await prisma.holiday.findUnique({
    where: {
      date: new Date(`${yesterdayFormatted}T00:00:00Z`),
    },
  });

  // If there was no lab session yesterday or it was a holiday, don't break the streak
  const shouldCheckStreak = yesterdayLabSession && !yesterdayHoliday;

  if (shouldCheckStreak) {
    // Check if user attended yesterday
    const yesterdayAttendance = await prisma.attendance.findFirst({
      where: {
        userId,
        labSession: {
          date: {
            gte: new Date(`${yesterdayFormatted}T00:00:00Z`),
            lt: new Date(`${yesterdayFormatted}T23:59:59Z`),
          },
        },
      },
    });

    // If no attendance yesterday and there was a lab session, reset streak
    if (!yesterdayAttendance) {
      await prisma.user.update({
        where: { id: userId },
        data: { currentStreak: 1 }, // Reset to 1 for today's attendance
      });
      return { currentStreak: 1 };
    }
  }

  // Increment streak
  const newStreak = user.currentStreak + 1;
  const newLongestStreak = Math.max(newStreak, user.longestStreak);

  // Check for streak milestones and award bonus points
  if (newStreak % 7 === 0) {
    // Weekly streak bonus
    await awardPoints(userId, POINTS.STREAK_BONUS.WEEKLY);
  }

  if (newStreak % 30 === 0) {
    // Monthly streak bonus
    await awardPoints(userId, POINTS.STREAK_BONUS.MONTHLY);
  }

  // Update user streak
  await prisma.user.update({
    where: { id: userId },
    data: {
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
    },
  });

  return { currentStreak: newStreak, longestStreak: newLongestStreak };
}

export async function awardPoints(userId: string, points: number) {
  // Update user points
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      points: { increment: points },
    },
    select: { id: true, points: true },
  });

  // Check for badge eligibility
  await checkAndAwardBadges(userId, user.points);

  return { points: user.points };
}

export async function checkAndAwardBadges(userId: string, totalPoints: number) {
  // Get all badges that the user is eligible for but doesn't have yet
  const eligibleBadges = await prisma.badge.findMany({
    where: {
      pointsRequired: { lte: totalPoints },
      userBadges: {
        none: {
          userId,
        },
      },
    },
  });

  // Award new badges
  const newBadges = [];
  for (const badge of eligibleBadges) {
    const userBadge = await prisma.userBadge.create({
      data: {
        userId,
        badgeId: badge.id,
      },
      include: {
        badge: true,
      },
    });
    newBadges.push(userBadge);
  }

  return newBadges;
}

export async function getUserStats(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      points: true,
      currentStreak: true,
      longestStreak: true,
      userBadges: {
        include: {
          badge: true,
        },
      },
      attendances: {
        select: {
          id: true,
          checkInTime: true,
          checkOutTime: true,
          duration: true,
          labSession: {
            select: {
              date: true,
              startTime: true,
              endTime: true,
            },
          },
        },
        orderBy: {
          checkInTime: 'desc',
        },
        take: 10,
      },
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}