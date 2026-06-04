const { MenuItem, Menu } = require('../models');

const getMenuItems = async (req, res, next) => {
  try {
    const { menuId } = req.params;

    const items = await MenuItem.findAll({
      where: { menuId, parentId: null },
      order: [['order', 'ASC']],
      include: [
        {
          model: MenuItem,
          as: 'children',
          order: [['order', 'ASC']]
        }
      ]
    });

    res.status(200).json({
      success: true,
      count: items.length,
      items
    });
  } catch (error) {
    next(error);
  }
};

const getMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findByPk(id, {
      include: [
        {
          model: MenuItem,
          as: 'parent'
        },
        {
          model: MenuItem,
          as: 'children'
        }
      ]
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.status(200).json({
      success: true,
      item
    });
  } catch (error) {
    next(error);
  }
};

const createMenuItem = async (req, res, next) => {
  try {
    const { menuId, parentId, label, url, icon, order, isActive, target } = req.body;

    // Verify menu exists
    const menu = await Menu.findByPk(menuId);
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Menu not found'
      });
    }

    // Verify parent exists if provided
    if (parentId) {
      const parent = await MenuItem.findByPk(parentId);
      if (!parent) {
        return res.status(404).json({
          success: false,
          message: 'Parent menu item not found'
        });
      }
    }

    const item = await MenuItem.create({
      menuId,
      parentId: parentId || null,
      label,
      url,
      icon,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
      target: target || '_self'
    });

    res.status(201).json({
      success: true,
      item
    });
  } catch (error) {
    next(error);
  }
};

const updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findByPk(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    await item.update(req.body);

    res.status(200).json({
      success: true,
      item
    });
  } catch (error) {
    next(error);
  }
};

const deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findByPk(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    await item.destroy();

    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};