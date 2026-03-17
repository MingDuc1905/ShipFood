import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboard = async (req, res) => {
  try {
    const userId = req.userId;

    // Check if user is admin
    const admin = await prisma.admin.findUnique({
      where: { userId },
    });

    if (!admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const [userCount, restaurantCount, shipperCount, orderCount] = await Promise.all([
      prisma.user.count(),
      prisma.restaurant.count(),
      prisma.shipper.count(),
      prisma.order.count(),
    ]);

    res.json({
      userCount,
      restaurantCount,
      shipperCount,
      orderCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const userId = req.userId;

    // Check if user is admin
    const admin = await prisma.admin.findUnique({
      where: { userId },
    });

    if (!admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const users = await prisma.user.findMany({
      select: {
        userId: true,
        username: true,
        userType: true,
        email: true,
        phone: true,
        status: true,
        createdAt: true,
      },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const approveRestaurant = async (req, res) => {
  try {
    const adminId = req.userId;
    const { restaurantId } = req.params;

    // Check if user is admin
    const admin = await prisma.admin.findUnique({
      where: { userId: adminId },
    });

    if (!admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const user = await prisma.user.update({
      where: { userId: parseInt(restaurantId) },
      data: { status: 1 }, // Approved
    });

    res.json({ message: 'Restaurant approved', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const lockUser = async (req, res) => {
  try {
    const adminId = req.userId;
    const { userId } = req.params;

    // Check if user is admin
    const admin = await prisma.admin.findUnique({
      where: { userId: adminId },
    });

    if (!admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const user = await prisma.user.update({
      where: { userId: parseInt(userId) },
      data: { status: 2 }, // Locked
    });

    res.json({ message: 'User locked', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
