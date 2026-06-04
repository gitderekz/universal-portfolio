const { Menu, Profession, MenuItem } = require('../models');

const getMenus = async (req, res, next) => {
  try {
    const { professionId, location, isActive } = req.query;

    const where = {};
    if (professionId) where.professionId = professionId;
    if (location) where.location = location;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const menus = await Menu.findAll({
      where,
      include: [
        {
          model: Profession,
          as: 'profession',
          attributes: ['id', 'name', 'slug']
        },
        {
          model: MenuItem,
          as: 'items',
          where: { parentId: null },
          required: false,
          order: [['order', 'ASC']]
        }
      ]
    });

    res.status(200).json({
      success: true,
      count: menus.length,
      menus
    });
  } catch (error) {
    next(error);
  }
};

const getMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id, {
      include: [
        {
          model: Profession,
          as: 'profession',
          attributes: ['id', 'name', 'slug']
        },
        {
          model: MenuItem,
          as: 'items',
          where: { parentId: null },
          required: false,
          order: [['order', 'ASC']],
          include: [
            {
              model: MenuItem,
              as: 'children',
              order: [['order', 'ASC']]
            }
          ]
        }
      ]
    });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Menu not found'
      });
    }

    res.status(200).json({
      success: true,
      menu
    });
  } catch (error) {
    next(error);
  }
};

const createMenu = async (req, res, next) => {
  try {
    const { professionId, name, slug, location, isActive } = req.body;

    // Verify profession exists
    const profession = await Profession.findByPk(professionId);
    if (!profession) {
      return res.status(404).json({
        success: false,
        message: 'Profession not found'
      });
    }

    const menu = await Menu.create({
      professionId,
      name,
      slug,
      location: location || 'header',
      isActive: isActive !== undefined ? isActive : true
    });

    res.status(201).json({
      success: true,
      menu
    });
  } catch (error) {
    next(error);
  }
};

const updateMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Menu not found'
      });
    }

    await menu.update(req.body);

    res.status(200).json({
      success: true,
      menu
    });
  } catch (error) {
    next(error);
  }
};

const deleteMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Menu not found'
      });
    }

    await menu.destroy();

    res.status(200).json({
      success: true,
      message: 'Menu deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMenus,
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu
};