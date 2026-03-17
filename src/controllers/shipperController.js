import { PrismaClient } from '@prisma/client';
import { uploadImage, deleteImage } from '../utils/upload.js';

const prisma = new PrismaClient();

export const getShippers = async (req, res) => {
  try {
    const shippers = await prisma.shipper.findMany({
      where: {
        user: { status: 1 },
      },
      include: {
        user: {
          select: {
            email: true,
            phone: true,
          },
        },
      },
      orderBy: { rating: 'desc' },
    });

    res.json(shippers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getShipperById = async (req, res) => {
  try {
    const { id } = req.params;

    const shipper = await prisma.shipper.findUnique({
      where: { userId: parseInt(id) },
      include: {
        user: true,
        deliveries: { include: { order: true } },
      },
    });

    if (!shipper) {
      return res.status(404).json({ error: 'Shipper not found' });
    }

    res.json(shipper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateShipperProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, address, latitude, longitude, status } = req.body;

    let avatar = undefined;
    if (req.files?.avatar) {
      const oldShipper = await prisma.shipper.findUnique({
        where: { userId },
        select: { avatar: true },
      });

      if (oldShipper?.avatar) {
        await deleteImage(oldShipper.avatar);
      }

      avatar = await uploadImage(req.files.avatar);
    }

    const shipper = await prisma.shipper.update({
      where: { userId },
      data: {
        name: name || undefined,
        address: address || undefined,
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
        avatar: avatar || undefined,
        status: status || undefined,
      },
    });

    res.json({ message: 'Profile updated', shipper });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getShipperDeliveries = async (req, res) => {
  try {
    const userId = req.userId;

    const deliveries = await prisma.delivery.findMany({
      where: { shipperId: userId },
      include: {
        order: {
          include: {
            customer: true,
            restaurant: true,
            items: { include: { menu: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const acceptDelivery = async (req, res) => {
  try {
    const shipperId = req.userId;
    const { orderId } = req.body;

    const delivery = await prisma.delivery.create({
      data: {
        orderId,
        shipperId,
        statusId: 1,
      },
      include: { order: true },
    });

    // Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: { statusId: 4 }, // Ready for delivery
    });

    res.status(201).json({ message: 'Delivery accepted', delivery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
