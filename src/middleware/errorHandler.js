export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Prisma Unique Constraint Error
  if (err.code === 'P2002') {
    const field = err.meta?.target?.[0] || 'field';
    return res.status(400).json({
      error: `${field} already exists`,
      details: `The ${field} is already in use. Please choose a different one.`
    });
  }

  // Prisma Not Found Error
  if (err.code === 'P2025') {
    return res.status(404).json({
      error: 'Resource not found'
    });
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expired'
    });
  }

  // Default Error
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
};
