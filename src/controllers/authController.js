import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword, generateToken } from '../utils/auth.js';
import { isValidPhone, isValidEmail } from '../utils/helpers.js';

const prisma = new PrismaClient();

export const register = async (req, res) => {
  try {
    const { username, password, userType, phone, email } = req.body;

    // Validate input
    if (!username || !password || !userType || !phone || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        userType,
        phone,
        email,
        status: userType === 'Khách hàng' ? 1 : 0, // Khách hàng auto-approved, others need approval
      },
    });

    // Create user profile based on type
    if (userType === 'Khách hàng') {
      await prisma.customer.create({
        data: {
          userId: user.userId,
          name: username,
        },
      });
    } else if (userType === 'Quán ăn') {
      await prisma.restaurant.create({
        data: {
          userId: user.userId,
          name: username,
          address: '',
        },
      });
    } else if (userType === 'Shipper') {
      await prisma.shipper.create({
        data: {
          userId: user.userId,
          name: username,
          address: '',
        },
      });
    }

    const token = generateToken(user.userId, user.userType);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        userId: user.userId,
        username: user.username,
        userType: user.userType,
        email: user.email,
        status: user.status,
      },
    });
  } catch (error) {
    if (error.code === 'P2002') {
      const field = error.meta?.target?.[0] || 'field';
      return res.status(400).json({ error: `${field} already exists` });
    }
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        userId: true,
        username: true,
        password: true,
        userType: true,
        email: true,
        phone: true,
        status: true,
        balance: true,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check status
    if (user.status === 0) {
      return res.status(403).json({ error: 'Account pending approval' });
    }

    if (user.status === 2) {
      return res.status(403).json({ error: 'Account is locked' });
    }

    const token = generateToken(user.userId, user.userType);

    res.json({
      message: 'Login successful',
      token,
      user: {
        userId: user.userId,
        username: user.username,
        userType: user.userType,
        email: user.email,
        balance: user.balance,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await prisma.user.findUnique({
      where: { userId },
      select: {
        userId: true,
        username: true,
        userType: true,
        email: true,
        phone: true,
        balance: true,
        avatar: true,
        status: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { email, phone } = req.body;

    const user = await prisma.user.update({
      where: { userId },
      data: {
        email: email || undefined,
        phone: phone || undefined,
      },
      select: {
        userId: true,
        username: true,
        userType: true,
        email: true,
        phone: true,
      },
    });

    res.json({ message: 'Profile updated', user });
  } catch (error) {
    if (error.code === 'P2002') {
      const field = error.meta?.target?.[0] || 'field';
      return res.status(400).json({ error: `${field} already in use` });
    }
    res.status(500).json({ error: error.message });
  }
};
