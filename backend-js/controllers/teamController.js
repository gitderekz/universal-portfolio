const { Team, Profession } = require('../models');

const getTeamMembers = async (req, res, next) => {
  try {
    const { professionId, isActive } = req.query;

    const where = {};
    if (professionId) where.professionId = professionId;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const teamMembers = await Team.findAll({
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
      count: teamMembers.length,
      teamMembers
    });
  } catch (error) {
    next(error);
  }
};

const getTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const teamMember = await Team.findByPk(id, {
      include: [
        {
          model: Profession,
          as: 'profession',
          attributes: ['id', 'name', 'slug']
        }
      ]
    });

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.status(200).json({
      success: true,
      teamMember
    });
  } catch (error) {
    next(error);
  }
};

const createTeamMember = async (req, res, next) => {
  try {
    const teamMember = await Team.create(req.body);

    res.status(201).json({
      success: true,
      teamMember
    });
  } catch (error) {
    next(error);
  }
};

const updateTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const teamMember = await Team.findByPk(id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    await teamMember.update(req.body);

    res.status(200).json({
      success: true,
      teamMember
    });
  } catch (error) {
    next(error);
  }
};

const deleteTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const teamMember = await Team.findByPk(id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    await teamMember.destroy();

    res.status(200).json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
};