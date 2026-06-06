import { Request, Response, NextFunction } from 'express';
import { Profession } from '../models';
import { AuthRequest } from '../middleware/auth';

export const getProfessions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { isActive } = req.query;

    const where: any = {};
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const professions = await Profession.findAll({
      where,
      order: [['name', 'ASC']]
    });

    res.status(200).json({
      success: true,
      count: professions.length,
      professions
    });
  } catch (error) {
    next(error);
  }
};

export const getProfession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const profession = await Profession.findByPk(id);

    if (!profession) {
      return res.status(404).json({
        success: false,
        message: 'Profession not found'
      });
    }

    res.status(200).json({
      success: true,
      profession
    });
  } catch (error) {
    next(error);
  }
};

export const getProfessionBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    const profession = await Profession.findOne({
      where: { slug }
    });

    if (!profession) {
      return res.status(404).json({
        success: false,
        message: 'Profession not found'
      });
    }

    res.status(200).json({
      success: true,
      profession
    });
  } catch (error) {
    next(error);
  }
};

export const createProfession = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const profession = await Profession.create(req.body);

    res.status(201).json({
      success: true,
      profession
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfession = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const profession = await Profession.findByPk(id);

    if (!profession) {
      return res.status(404).json({
        success: false,
        message: 'Profession not found'
      });
    }

    await profession.update(req.body);

    res.status(200).json({
      success: true,
      profession
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProfession = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const profession = await Profession.findByPk(id);

    if (!profession) {
      return res.status(404).json({
        success: false,
        message: 'Profession not found'
      });
    }

    await profession.destroy();

    res.status(200).json({
      success: true,
      message: 'Profession deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
