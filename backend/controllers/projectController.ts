import { Request, Response, NextFunction } from 'express';
import { Project, Profession } from '../models';
import { AuthRequest } from '../middleware/auth';

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { professionId, category, status, isActive } = req.query;

    const where: any = {};
    if (professionId) where.professionId = professionId;
    if (category) where.category = category;
    if (status) where.status = status;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const projects = await Project.findAll({
      where,
      include: [
        {
          model: Profession,
          as: 'profession',
          attributes: ['id', 'name', 'slug']
        }
      ],
      order: [['order', 'ASC'], ['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id, {
      include: [
        {
          model: Profession,
          as: 'profession',
          attributes: ['id', 'name', 'slug']
        }
      ]
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      project
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await project.update(req.body);

    res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await project.destroy();

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
