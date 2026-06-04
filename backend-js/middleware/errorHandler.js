const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for development
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  const response = {
    success: false,
    message: error.message || 'Server Error'
  };

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    response.message = 'Validation Error';
    response.errors = err.errors?.map((e) => ({
      field: e.path,
      message: e.message
    }));
    return res.status(400).json(response);
  }

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    response.message = 'Duplicate field value entered';
    response.errors = err.errors?.map((e) => ({
      field: e.path,
      message: `${e.path} already exists`
    }));
    return res.status(400).json(response);
  }

  // Sequelize foreign key constraint error
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    response.message = 'Related record not found';
    return res.status(400).json(response);
  }

  // Sequelize database connection error
  if (err.name === 'SequelizeConnectionError') {
    response.message = 'Database connection error';
    return res.status(500).json(response);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    response.message = 'Invalid token';
    return res.status(401).json(response);
  }

  if (err.name === 'TokenExpiredError') {
    response.message = 'Token expired';
    return res.status(401).json(response);
  }

  // Multer errors (file upload)
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      response.message = 'File too large. Maximum size is 5MB';
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      response.message = 'Unexpected file field';
    } else {
      response.message = err.message;
    }
    return res.status(400).json(response);
  }

  // Add stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(error.statusCode || 500).json(response);
};

module.exports = errorHandler;