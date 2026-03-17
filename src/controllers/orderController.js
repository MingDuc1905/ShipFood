import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrder = async (req, res) => {
  try {
    const customerId = req.userId;
    const { restaurantId, items, deliveryAddressId, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order items required' });
    }

    // Calculate total price
    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const menu = await prisma.menu.findUnique({
        where: { id: item.menuId },
      });

      if (!menu) {
        return res.status(404).json({ error: `Menu ${item.menuId} not found` });
      }

      const subtotal = menu.price * item.quantity;
      totalPrice += subtotal;

      orderItems.push({
        menuId: item.menuId,
        quantity: item.quantity,
        price: menu.price,
        subtotal,
      });
    }

    const order = await prisma.order.create({
      data: {
        customerId,
        restaurantId: parseInt(restaurantId),
        totalPrice,
        finalPrice: totalPrice,
        statusId: 1,
        notes,
        items: {
          createMany: {
            data: orderItems,
          },
        },
      },
      include: {
        items: {
          include: { menu: true },
        },
      },
    });

    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        items: { include: { menu: true } },
        customer: true,
        restaurant: true,
        delivery: { include: { shipper: true } },
        history: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrdersByCustomer = async (req, res) => {
  try {
    const customerId = req.userId;

    const orders = await prisma.order.findMany({
      where: { customerId },
      include: {
        items: { include: { menu: true } },
        restaurant: true,
        delivery: { include: { shipper: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrdersByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.userId;

    const orders = await prisma.order.findMany({
      where: { restaurantId },
      include: {
        items: { include: { menu: true } },
        customer: true,
        delivery: { include: { shipper: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusId } = req.body;

    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { statusId },
      include: { items: { include: { menu: true } } },
    });

    // Add history
    await prisma.orderHistory.create({
      data: {
        orderId: order.id,
        statusId,
      },
    });

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { statusId: 0 }, // Cancelled
    });

    res.json({ message: 'Order cancelled', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
