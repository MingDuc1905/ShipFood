import { PrismaClient } from '@prisma/client';
import { uploadImage, deleteImage } from '../utils/upload.js';

const prisma = new PrismaClient();

export const createMenu = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, price, description, categoryId } = req.body;

    let image = null;
    if (req.files?.image) {
      image = await uploadImage(req.files.image);
    }

    const menu = await prisma.menu.create({
      data: {
        restaurantId: userId,
        name,
        price: parseFloat(price),
        description,
        categoryId: parseInt(categoryId),
        image,
        status: 1,
      },
    });

    res.status(201).json({ message: 'Menu created', menu });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMenusByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const menus = await prisma.menu.findMany({
      where: {
        restaurantId: parseInt(restaurantId),
        status: 1,
      },
      include: {
        category: true,
        promotions: {
          include: { promotion: true },
        },
      },
    });

    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await prisma.menu.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
        restaurant: true,
        promotions: {
          include: { promotion: true },
        },
      },
    });

    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { name, price, description, categoryId, status } = req.body;

    // Verify ownership
    const menu = await prisma.menu.findUnique({
      where: { id: parseInt(id) },
    });

    if (!menu || menu.restaurantId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    let image = undefined;
    if (req.files?.image) {
      if (menu.image) {
        await deleteImage(menu.image);
      }
      image = await uploadImage(req.files.image);
    }

    const updatedMenu = await prisma.menu.update({
      where: { id: parseInt(id) },
      data: {
        name: name || undefined,
        price: price ? parseFloat(price) : undefined,
        description: description || undefined,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        image: image || undefined,
        status: status !== undefined ? parseInt(status) : undefined,
      },
    });

    res.json({ message: 'Menu updated', menu: updatedMenu });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const menu = await prisma.menu.findUnique({
      where: { id: parseInt(id) },
    });

    if (!menu || menu.restaurantId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (menu.image) {
      await deleteImage(menu.image);
    }

    await prisma.menu.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Menu deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMenusByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const menus = await prisma.menu.findMany({
      where: {
        categoryId: parseInt(categoryId),
        status: 1,
      },
      include: {
        category: true,
        restaurant: {
          select: {
            userId: true,
            name: true,
            rating: true,
          },
        },
      },
      orderBy: { rating: 'desc' },
    });

    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchMenus = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({ error: 'Search query required' });
    }

    const menus = await prisma.menu.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
        status: 1,
      },
      include: {
        category: true,
        restaurant: {
          select: {
            userId: true,
            name: true,
            rating: true,
          },
        },
      },
      take: 20,
    });

    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
