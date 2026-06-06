import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    req.body = value;
    next();
  };
};

// Common validation schemas
export const schemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    roleId: Joi.string().uuid().optional(),
    professionId: Joi.string().uuid().optional()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  updateProfile: Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    avatar: Joi.string().uri().optional()
  }),

  changePassword: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required()
  }),

  createPage: Joi.object({
    professionId: Joi.string().uuid().required(),
    title: Joi.string().required(),
    slug: Joi.string().required(),
    description: Joi.string().optional(),
    metaTitle: Joi.string().optional(),
    metaDescription: Joi.string().optional(),
    metaKeywords: Joi.string().optional(),
    isActive: Joi.boolean().optional(),
    order: Joi.number().integer().optional(),
    layoutType: Joi.string().optional()
  }),

  createProject: Joi.object({
    professionId: Joi.string().uuid().required(),
    title: Joi.string().required(),
    slug: Joi.string().required(),
    description: Joi.string().optional(),
    content: Joi.string().optional(),
    featuredImage: Joi.string().uri().optional(),
    gallery: Joi.array().items(Joi.string().uri()).optional(),
    category: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    technologies: Joi.array().items(Joi.string()).optional(),
    client: Joi.string().optional(),
    projectUrl: Joi.string().uri().optional(),
    githubUrl: Joi.string().uri().optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    status: Joi.string().valid('completed', 'in-progress', 'upcoming').optional(),
    isActive: Joi.boolean().optional(),
    order: Joi.number().integer().optional()
  }),

  contact: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().optional(),
    subject: Joi.string().required(),
    message: Joi.string().required()
  }),

  createBlogPost: Joi.object({
    title: Joi.string().required(),
    slug: Joi.string().required(),
    excerpt: Joi.string().optional(),
    content: Joi.string().required(),
    featuredImage: Joi.string().uri().optional(),
    category: Joi.string().optional(),
    tags: Joi.string().optional(),
    status: Joi.string().valid('draft', 'published', 'archived').optional(),
    publishedAt: Joi.date().optional()
  }),

  createService: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    icon: Joi.string().optional(),
    price: Joi.number().required(),
    priceType: Joi.string().optional(),
    category: Joi.string().optional(),
    features: Joi.string().optional(),
    isActive: Joi.boolean().optional(),
    sortOrder: Joi.number().integer().optional()
  }),

  createTeamMember: Joi.object({
    name: Joi.string().required(),
    role: Joi.string().required(),
    bio: Joi.string().optional(),
    avatar: Joi.string().uri().optional(),
    email: Joi.string().email().optional(),
    social: Joi.string().optional(),
    isActive: Joi.boolean().optional(),
    sortOrder: Joi.number().integer().optional()
  }),

  createTestimonial: Joi.object({
    clientName: Joi.string().required(),
    clientRole: Joi.string().optional(),
    clientCompany: Joi.string().optional(),
    clientAvatar: Joi.string().uri().optional(),
    content: Joi.string().required(),
    rating: Joi.number().integer().min(1).max(5).optional(),
    projectId: Joi.string().uuid().optional(),
    isFeatured: Joi.boolean().optional(),
    isActive: Joi.boolean().optional(),
    sortOrder: Joi.number().integer().optional()
  })
};

// Export validators
export const validateBlogPost = validate(schemas.createBlogPost);
export const validateService = validate(schemas.createService);
export const validateTeamMember = validate(schemas.createTeamMember);
export const validateTestimonial = validate(schemas.createTestimonial);
