import { Request, Response, NextFunction } from 'express';
import { Setting } from '../models';

export const getAllSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, group } = req.query;

    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (group) {
      where.group = group;
    }

    const settings = await Setting.findAll({
      where,
      order: [['category', 'ASC'], ['group', 'ASC'], ['sortOrder', 'ASC']]
    });

    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

export const getSettingByKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key } = req.params;

    const setting = await Setting.findOne({ where: { key } });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Setting not found'
      });
    }

    res.status(200).json({
      success: true,
      data: setting
    });
  } catch (error) {
    next(error);
  }
};

export const createSetting = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      key,
      value,
      type,
      category,
      group,
      description,
      sortOrder
    } = req.body;

    // Check if setting already exists
    const existingSetting = await Setting.findOne({ where: { key } });
    if (existingSetting) {
      return res.status(400).json({
        success: false,
        message: 'Setting with this key already exists'
      });
    }

    const setting = await Setting.create({
      key,
      value,
      type: type || 'string',
      category: category || 'general',
      group,
      description,
      sortOrder: sortOrder || 0
    });

    res.status(201).json({
      success: true,
      message: 'Setting created successfully',
      data: setting
    });
  } catch (error) {
    next(error);
  }
};

export const updateSetting = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key } = req.params;
    const {
      value,
      type,
      category,
      group,
      description,
      sortOrder
    } = req.body;

    const setting = await Setting.findOne({ where: { key } });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Setting not found'
      });
    }

    // Update fields
    if (value !== undefined) setting.value = value;
    if (type) setting.type = type;
    if (category) setting.category = category;
    if (group !== undefined) setting.group = group;
    if (description !== undefined) setting.description = description;
    if (sortOrder !== undefined) setting.sortOrder = sortOrder;

    await setting.save();

    res.status(200).json({
      success: true,
      message: 'Setting updated successfully',
      data: setting
    });
  } catch (error) {
    next(error);
  }
};

export const updateMultipleSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { settings } = req.body;

    if (!Array.isArray(settings)) {
      return res.status(400).json({
        success: false,
        message: 'Settings must be an array'
      });
    }

    const updated = [];

    for (const item of settings) {
      const { key, value } = item;

      const setting = await Setting.findOne({ where: { key } });

      if (setting) {
        setting.value = value;
        await setting.save();
        updated.push(setting);
      }
    }

    res.status(200).json({
      success: true,
      message: `${updated.length} settings updated successfully`,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSetting = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key } = req.params;

    const setting = await Setting.findOne({ where: { key } });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Setting not found'
      });
    }

    await setting.destroy();

    res.status(200).json({
      success: true,
      message: 'Setting deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
