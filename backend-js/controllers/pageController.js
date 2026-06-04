const { Page, PageSection, Profession } = require('../models');

const getPages = async (req, res, next) => {
  try {
    const { professionId, isActive } = req.query;

    const where = {};
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

const getPage = async (req, res, next) => {
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

const getPageBySlug = async (req, res, next) => {
  try {
    const { slug, professionSlug } = req.params;
    
    let where = { slug };
    
    // If professionSlug is provided, find the page for that profession
    if (professionSlug) {
      const profession = await Profession.findOne({ where: { slug: professionSlug } });
      if (profession) {
        where.professionId = profession.id;
      }
    }

    const page = await Page.findOne({
      where,
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

const createPage = async (req, res, next) => {
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

const updatePage = async (req, res, next) => {
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

const deletePage = async (req, res, next) => {
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

module.exports = {
  getPages,
  getPage,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage
};