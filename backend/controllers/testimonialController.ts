import { Request, Response, NextFunction } from 'express';
import { Testimonial } from '../models';
import { Op } from 'sequelize';

export const getAllTestimonials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { isActive, isFeatured, search } = req.query;

    const where: any = {};

    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    if (isFeatured !== undefined) {
      where.isFeatured = isFeatured === 'true';
    }

    if (search) {
      where[Op.or] = [
        { clientName: { [Op.like]: `%${search}%` } },
        { clientRole: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } }
      ];
    }

    const testimonials = await Testimonial.findAll({
      where,
      order: [['sortOrder', 'ASC'], ['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    next(error);
  }
};

export const getTestimonialById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findByPk(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    res.status(200).json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      clientName,
      clientRole,
      clientCompany,
      clientAvatar,
      content,
      rating,
      projectId,
      isFeatured,
      isActive,
      sortOrder
    } = req.body;

    const testimonial = await Testimonial.create({
      clientName,
      clientRole,
      clientCompany,
      clientAvatar,
      content,
      rating: rating || 5,
      projectId,
      isFeatured: isFeatured || false,
      isActive: isActive !== undefined ? isActive : true,
      sortOrder: sortOrder || 0
    });

    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      data: testimonial
    });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const {
      clientName,
      clientRole,
      clientCompany,
      clientAvatar,
      content,
      rating,
      projectId,
      isFeatured,
      isActive,
      sortOrder
    } = req.body;

    const testimonial = await Testimonial.findByPk(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    // Update fields
    if (clientName) testimonial.clientName = clientName;
    if (clientRole) testimonial.clientRole = clientRole;
    if (clientCompany) testimonial.clientCompany = clientCompany;
    if (clientAvatar) testimonial.clientAvatar = clientAvatar;
    if (content) testimonial.content = content;
    if (rating !== undefined) testimonial.rating = rating;
    if (projectId !== undefined) testimonial.projectId = projectId;
    if (isFeatured !== undefined) testimonial.isFeatured = isFeatured;
    if (isActive !== undefined) testimonial.isActive = isActive;
    if (sortOrder !== undefined) testimonial.sortOrder = sortOrder;

    await testimonial.save();

    res.status(200).json({
      success: true,
      message: 'Testimonial updated successfully',
      data: testimonial
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findByPk(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    await testimonial.destroy();

    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
