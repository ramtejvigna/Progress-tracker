import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createLabSession(date: Date, startTime: Date, endTime: Date) {
  // Format date to YYYY-MM-DD for comparison
  const dateFormatted = date.toISOString().split('T')[0];
  
  // Check if there's already a lab session for this date
  const existingSession = await prisma.labSession.findFirst({
    where: {
      date: {
        gte: new Date(`${dateFormatted}T00:00:00Z`),
        lt: new Date(`${dateFormatted}T23:59:59Z`),
      },
    },
  });

  if (existingSession) {
    throw new Error('A lab session already exists for this date');
  }

  // Check if this date is a holiday
  const holiday = await prisma.holiday.findUnique({
    where: {
      date: new Date(`${dateFormatted}T00:00:00Z`),
    },
  });

  if (holiday) {
    throw new Error(`Cannot create lab session on holiday: ${holiday.name}`);
  }

  // Create lab session
  const labSession = await prisma.labSession.create({
    data: {
      date,
      startTime,
      endTime,
      isActive: true,
    },
  });

  return labSession;
}

export async function updateLabSession(id: string, data: { startTime?: Date; endTime?: Date; isActive?: boolean }) {
  const labSession = await prisma.labSession.findUnique({
    where: { id },
  });

  if (!labSession) {
    throw new Error('Lab session not found');
  }

  return prisma.labSession.update({
    where: { id },
    data,
  });
}

export async function deleteLabSession(id: string) {
  const labSession = await prisma.labSession.findUnique({
    where: { id },
    include: {
      attendances: true,
    },
  });

  if (!labSession) {
    throw new Error('Lab session not found');
  }

  if (labSession.attendances.length > 0) {
    throw new Error('Cannot delete lab session with attendance records');
  }

  return prisma.labSession.delete({
    where: { id },
  });
}

export async function getLabSessions(options: { past?: boolean; future?: boolean; date?: Date } = {}) {
  const { past, future, date } = options;
  const now = new Date();
  
  let whereClause: any = {};
  
  if (date) {
    const dateFormatted = date.toISOString().split('T')[0];
    whereClause.date = {
      gte: new Date(`${dateFormatted}T00:00:00Z`),
      lt: new Date(`${dateFormatted}T23:59:59Z`),
    };
  } else if (past && !future) {
    whereClause.date = { lt: now };
  } else if (!past && future) {
    whereClause.date = { gte: now };
  }
  
  return prisma.labSession.findMany({
    where: whereClause,
    orderBy: {
      date: 'asc',
    },
    include: {
      attendances: {
        select: {
          id: true,
          userId: true,
          checkInTime: true,
          checkOutTime: true,
          duration: true,
        },
      },
    },
  });
}

export async function addHoliday(date: Date, name: string, description?: string) {
  // Format date to YYYY-MM-DD
  const dateFormatted = date.toISOString().split('T')[0];
  const holidayDate = new Date(`${dateFormatted}T00:00:00Z`);
  
  // Check if there's already a lab session for this date
  const existingSession = await prisma.labSession.findFirst({
    where: {
      date: {
        gte: holidayDate,
        lt: new Date(`${dateFormatted}T23:59:59Z`),
      },
    },
  });

  if (existingSession) {
    throw new Error('Cannot add holiday: A lab session already exists for this date');
  }

  // Create holiday
  const holiday = await prisma.holiday.create({
    data: {
      date: holidayDate,
      name,
      description,
    },
  });

  return holiday;
}

export async function updateHoliday(id: string, data: { name?: string; description?: string }) {
  const holiday = await prisma.holiday.findUnique({
    where: { id },
  });

  if (!holiday) {
    throw new Error('Holiday not found');
  }

  return prisma.holiday.update({
    where: { id },
    data,
  });
}

export async function deleteHoliday(id: string) {
  const holiday = await prisma.holiday.findUnique({
    where: { id },
  });

  if (!holiday) {
    throw new Error('Holiday not found');
  }

  return prisma.holiday.delete({
    where: { id },
  });
}

export async function getHolidays(options: { past?: boolean; future?: boolean } = {}) {
  const { past, future } = options;
  const now = new Date();
  
  let whereClause: any = {};
  
  if (past && !future) {
    whereClause.date = { lt: now };
  } else if (!past && future) {
    whereClause.date = { gte: now };
  }
  
  return prisma.holiday.findMany({
    where: whereClause,
    orderBy: {
      date: 'asc',
    },
  });
}