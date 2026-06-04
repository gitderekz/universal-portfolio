const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class Profession extends Model {}

Profession.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    menuConfig: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },
    layoutConfig: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },
    themeConfig: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    }
  },
  {
    sequelize,
    tableName: 'professions',
    timestamps: true
  }
);

module.exports = Profession;