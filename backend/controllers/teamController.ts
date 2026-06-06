import { Request, Response, NextFunction } from 'express';
import { Team } from '../models';
import { Op } from 'sequelize';

export const getAllMembers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { isActive, role, search } = req.query;

    const where: any = {};

    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    if (role) {
      where.role = role;
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { role: { [Op.like]: `%${search}%` } },
        { bio: { [Op.like]: `%${search}%` } }
      ];
    }

    const members = await Team.findAll({
      where,
      order: [['sortOrder', 'ASC'], ['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: members
    });
  } catch (error) {
    next(error);
  }
};

export const getMemberById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const member = await Team.findByPk(id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.status(200).json({
      success: true,
      data: member
    });
  } catch (error) {
    next(error);
  }
};

export const createMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name,
      role,
      bio,
      avatar,
      email,
      social,
      isActive,
      sortOrder
    } = req.body;

    const member = await Team.create({
      name,
      role,
      bio,
      avatar,
      email,
      social,
      isActive: isActive !== undefined ? isActive : true,
      sortOrder: sortOrder || 0
    });

    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      data: member
    });
  } catch (error) {
    next(error);
  }
};

export const updateMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const {
      name,
      role,
      bio,
      avatar,
      email,
      social,
      isActive,
      sortOrder
    } = req.body;

    const member = await Team.findByPk(id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    // Update fields
    if (name) member.name = name;
    if (role) member.role = role;
    if (bio) member.bio = bio;
    if (avatar) member.avatar = avatar;
    if (email) member.email = email;
    if (social) member.social = social;
    if (isActive !== undefined) member.isActive = isActive;
    if (sortOrder !== undefined) member.sortOrder = sortOrder;

    await member.save();

    res.status(200).json({
      success: true,
      message: 'Team member updated successfully',
      data: member
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const member = await Team.findByPk(id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    await member.destroy();

    res.status(200).json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
