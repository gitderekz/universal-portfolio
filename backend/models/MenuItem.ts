import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface MenuItemAttributes {
  id: string;
  menuId: string;
  parentId?: string;
  label: string;
  url: string;
  icon?: string;
  order: number;
  isActive: boolean;
  target?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MenuItemCreationAttributes extends Optional<MenuItemAttributes, 'id' | 'parentId' | 'icon' | 'order' | 'isActive' | 'target'> {}

class MenuItem extends Model<MenuItemAttributes, MenuItemCreationAttributes> implements MenuItemAttributes {
  public id!: string;
  public menuId!: string;
  public parentId?: string;
  public label!: string;
  public url!: string;
  public icon?: string;
  public order!: number;
  public isActive!: boolean;
  public target?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MenuItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    menuId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    parentId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    label: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    target: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: '_self'
    }
  },
  {
    sequelize,
    tableName: 'menu_items'
  }
);

export default MenuItem;
