import { Request, Response, NextFunction } from 'express';
import { Page, PageSection, Profession } from '../models';
import { AuthRequest } from '../middleware/auth';

export const getPages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { professionId, isActive } = req.query;

    const where: any = {};
    if (professionId) where.professionId = professionId;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const pages = await Page.findAll({
      where,
      include: [
        {
          model: Profession,
          as: 'profession',
          attributes: ['id', 'name', 'slug']
        }
      ],
      order: [['order', 'ASC']]
    });

    res.status(200).json({
      success: true,
      count: pages.length,
      pages
    });
  } catch (error) {
    next(error);
  }
};

export const getPage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const page = await Page.findByPk(id, {
      include: [
        {
          model: Profession,
          as: 'profession',
          attributes: ['id', 'name', 'slug']
        },
        {
          model: PageSection,
          as: 'sections',
          where: { isActive: true },
          required: false,
          order: [['order', 'ASC']]
        }
      ]
    });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    res.status(200).json({
      success: true,
      page
    });
  } catch (error) {
    next(error);
  }
};

export const getPageBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    const page = await Page.findOne({
      where: { slug },
      include: [
        {
          model: Profession,
          as: 'profession',
          attributes: ['id', 'name', 'slug']
        },
        {
          model: PageSection,
          as: 'sections',
          where: { isActive: true },
          required: false,
          order: [['order', 'ASC']]
        }
      ]
    });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    res.status(200).json({
      success: true,
      page
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = await Page.create(req.body);

    res.status(201).json({
      success: true,
      page
    });
  } catch (error) {
    next(error);
  }
};

export const updatePage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const page = await Page.findByPk(id);

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    await page.update(req.body);

    res.status(200).json({
      success: true,
      page
    });
  } catch (error) {
    next(error);
  }
};

export const deletePage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const page = await Page.findByPk(id);

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    await page.destroy();

    res.status(200).json({
      success: true,
      message: 'Page deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
