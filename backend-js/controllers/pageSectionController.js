const { PageSection, Page } = require('../models');

const getPageSections = async (req, res, next) => {
  try {
    const { pageId } = req.params;

    const sections = await PageSection.findAll({
      where: { pageId },
      order: [['order', 'ASC']]
    });

    res.status(200).json({
      success: true,
      count: sections.length,
      sections
    });
  } catch (error) {
    next(error);
  }
};

const getPageSection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const section = await PageSection.findByPk(id);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: 'Page section not found'
      });
    }

    res.status(200).json({
      success: true,
      section
    });
  } catch (error) {
    next(error);
  }
};

const createPageSection = async (req, res, next) => {
  try {
    const { pageId, type, title, content, order, isActive, config } = req.body;

    // Verify page exists
    const page = await Page.findByPk(pageId);
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }

    const section = await PageSection.create({
      pageId,
      type,
      title,
      content,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
      config
    });

    res.status(201).json({
      success: true,
      section
    });
  } catch (error) {
    next(error);
  }
};

const updatePageSection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const section = await PageSection.findByPk(id);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: 'Page section not found'
      });
    }

    await section.update(req.body);

    res.status(200).json({
      success: true,
      section
    });
  } catch (error) {
    next(error);
  }
};

const deletePageSection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const section = await PageSection.findByPk(id);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: 'Page section not found'
      });
    }

    await section.destroy();

    res.status(200).json({
      success: true,
      message: 'Page section deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

const reorderSections = async (req, res, next) => {
  try {
    const { sections } = req.body; // Array of { id, order }

    for (const item of sections) {
      await PageSection.update(
        { order: item.order },
        { where: { id: item.id } }
      );
    }

    res.status(200).json({
      success: true,
      message: 'Sections reordered successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPageSections,
  getPageSection,
  createPageSection,
  updatePageSection,
  deletePageSection,
  reorderSections
};