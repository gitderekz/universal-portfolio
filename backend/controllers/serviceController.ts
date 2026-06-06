import { Request, Response, NextFunction } from 'express';
import { Service } from '../models';
import { Op } from 'sequelize';

export const getAllServices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { isActive, category, search } = req.query;

    const where: any = {};

    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    if (category) {
      where.category = category;
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    const services = await Service.findAll({
      where,
      order: [['sortOrder', 'ASC'], ['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: services
    });
  } catch (error) {
    next(error);
  }
};

export const getServiceById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      description,
      icon,
      price,
      priceType,
      category,
      features,
      isActive,
      sortOrder
    } = req.body;

    const service = await Service.create({
      title,
      description,
      icon,
      price,
      priceType: priceType || 'starting at',
      category,
      features,
      isActive: isActive !== undefined ? isActive : true,
      sortOrder: sortOrder || 0
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      icon,
      price,
      priceType,
      category,
      features,
      isActive,
      sortOrder
    } = req.body;

    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Update fields
    if (title) service.title = title;
    if (description) service.description = description;
    if (icon) service.icon = icon;
    if (price !== undefined) service.price = price;
    if (priceType) service.priceType = priceType;
    if (category) service.category = category;
    if (features) service.features = features;
    if (isActive !== undefined) service.isActive = isActive;
    if (sortOrder !== undefined) service.sortOrder = sortOrder;

    await service.save();

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    await service.destroy();

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
