const { Profession } = require('../models');

const getProfessions = async (req, res, next) => {
  try {
    const { isActive } = req.query;

    const where = {};
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

const getProfession = async (req, res, next) => {
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

const getProfessionBySlug = async (req, res, next) => {
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

const createProfession = async (req, res, next) => {
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

const updateProfession = async (req, res, next) => {
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

const deleteProfession = async (req, res, next) => {
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

module.exports = {
  getProfessions,
  getProfession,
  getProfessionBySlug,
  createProfession,
  updateProfession,
  deleteProfession
};