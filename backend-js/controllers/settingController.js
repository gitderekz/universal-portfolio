const { Setting } = require('../models');

const getSettings = async (req, res, next) => {
  try {
    const { category } = req.query;

    const where = {};
    if (category) where.category = category;

    const settings = await Setting.findAll({
      where,
      order: [['category', 'ASC'], ['key', 'ASC']]
    });

    // Transform to key-value object
    const settingsMap = {};
    settings.forEach(setting => {
      settingsMap[setting.key] = setting.value;
    });

    res.status(200).json({
      success: true,
      settings: settingsMap,
      raw: settings
    });
  } catch (error) {
    next(error);
  }
};

const getSetting = async (req, res, next) => {
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
      setting: setting.value
    });
  } catch (error) {
    next(error);
  }
};

const createSetting = async (req, res, next) => {
  try {
    const { key, value, type, category, description } = req.body;

    // Check if setting already exists
    const existing = await Setting.findOne({ where: { key } });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Setting already exists'
      });
    }

    const setting = await Setting.create({
      key,
      value,
      type: type || 'string',
      category: category || 'general',
      description
    });

    res.status(201).json({
      success: true,
      setting
    });
  } catch (error) {
    next(error);
  }
};

const updateSetting = async (req, res, next) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    const setting = await Setting.findOne({ where: { key } });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Setting not found'
      });
    }

    setting.value = value;
    await setting.save();

    res.status(200).json({
      success: true,
      setting
    });
  } catch (error) {
    next(error);
  }
};

const deleteSetting = async (req, res, next) => {
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

module.exports = {
  getSettings,
  getSetting,
  createSetting,
  updateSetting,
  deleteSetting
};