import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createBadge(name: string, description: string, imageUrl: string, pointsRequired: number) {
  // Check if badge with this name already exists
  const existingBadge = await prisma.badge.findUnique({
    where: { name },
  });

  if (existingBadge) {
    throw new Error('Badge with this name already exists');
  }

  // Create badge
  const badge = await prisma.badge.create({
    data: {
      name,
      description,
      imageUrl,
      pointsRequired,
    },
  });

  return badge;
}

export async function updateBadge(id: string, data: { name?: string; description?: string; imageUrl?: string; pointsRequired?: number }) {
  const badge = await prisma.badge.findUnique({
    where: { id },
  });

  if (!badge) {
    throw new Error('Badge not found');
  }

  // If name is being updated, check for uniqueness
  if (data.name && data.name !== badge.name) {
    const existingBadge = await prisma.badge.findUnique({
      where: { name: data.name },
    });

    if (existingBadge) {
      throw new Error('Badge with this name already exists');
    }
  }

  return prisma.badge.update({
    where: { id },
    data,
  });
}

export async function deleteBadge(id: string) {
  const badge = await prisma.badge.findUnique({
    where: { id },
    include: {
      userBadges: true,
    },
  });

  if (!badge) {
    throw new Error('Badge not found');
  }

  if (badge.userBadges.length > 0) {
    throw new Error('Cannot delete badge that has been awarded to users');
  }

  return prisma.badge.delete({
    where: { id },
  });
}

export async function getBadges() {
  return prisma.badge.findMany({
    orderBy: {
      pointsRequired: 'asc',
    },
  });
}

export async function getUsersWithBadge(badgeId: string) {
  const badge = await prisma.badge.findUnique({
    where: { id: badgeId },
    include: {
      userBadges: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              points: true,
              currentStreak: true,
            },
          },
        },
      },
    },
  });

  if (!badge) {
    throw new Error('Badge not found');
  }

  return badge.userBadges.map((userBadge: { user: any; earnedAt: any; }) => ({
    ...userBadge.user,
    earnedAt: userBadge.earnedAt,
  }));
}