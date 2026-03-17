import { PrismaClient } from '@prisma/client';
import { normalizeSearchText } from '../utils/helpers.js';
import { uploadImage, deleteImage } from '../utils/upload.js';

const prisma = new PrismaClient();

export const getAllRestaurants = async (req, res) => {
  try {
    const { search, categoryId } = req.query;

    let where = {
      user: {
        status: 1, // Only approved restaurants
      },
    };

    if (search) {
      const searchNormalized = normalizeSearchText(search);
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { user: { username: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const restaurants = await prisma.restaurant.findMany({
      where,
      include: {
        user: {
          select: {
            username: true,
          },
        },
        menus: {
          where: { status: 1 },
          select: { id: true },
        },
      },
      orderBy: { rating: 'desc' },
    });

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await prisma.restaurant.findUnique({
      where: { userId: parseInt(id) },
      include: {
        user: {
          select: {
            email: true,
            phone: true,
          },
        },
        menus: {
          where: { status: 1 },
          include: {
            category: true,
            orderItems: {
              select: { quantity: true },
            },
          },
        },
      },
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, address, latitude, longitude } = req.body;

    let avatar = undefined;
    if (req.files?.avatar) {
      const oldRestaurant = await prisma.restaurant.findUnique({
        where: { userId },
        select: { avatar: true },
      });

      if (oldRestaurant?.avatar) {
        await deleteImage(oldRestaurant.avatar);
      }

      avatar = await uploadImage(req.files.avatar);
    }

    const restaurant = await prisma.restaurant.update({
      where: { userId },
      data: {
        name: name || undefined,
        address: address || undefined,
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
        avatar: avatar || undefined,
      },
    });

    res.json({ message: 'Restaurant updated', restaurant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRestaurantStatus = async (req, res) => {
  try {
    const userId = req.userId;

    const restaurant = await prisma.restaurant.findUnique({
      where: { userId },
      select: { status: true },
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json({ status: restaurant.status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRestaurantStatus = async (req, res) => {
  try {
    const userId = req.userId;
    const { status } = req.body;

    const restaurant = await prisma.restaurant.update({
      where: { userId },
      data: { status },
    });

    res.json({ message: 'Status updated', restaurant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
