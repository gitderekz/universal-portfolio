import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ProfessionAttributes {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  menuConfig?: any;
  layoutConfig?: any;
  themeConfig?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProfessionCreationAttributes extends Optional<ProfessionAttributes, 'id' | 'description' | 'icon' | 'isActive' | 'menuConfig' | 'layoutConfig' | 'themeConfig'> {}

class Profession extends Model<ProfessionAttributes, ProfessionCreationAttributes> implements ProfessionAttributes {
  public id!: string;
  public name!: string;
  public slug!: string;
  public description?: string;
  public icon?: string;
  public isActive!: boolean;
  public menuConfig?: any;
  public layoutConfig?: any;
  public themeConfig?: any;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
    tableName: 'professions'
  }
);

export default Profession;
