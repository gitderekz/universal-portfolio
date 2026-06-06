import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface MenuAttributes {
  id: string;
  professionId: string;
  name: string;
  slug: string;
  location: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MenuCreationAttributes extends Optional<MenuAttributes, 'id' | 'isActive'> {}

class Menu extends Model<MenuAttributes, MenuCreationAttributes> implements MenuAttributes {
  public id!: string;
  public professionId!: string;
  public name!: string;
  public slug!: string;
  public location!: string;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Menu.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    professionId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'header'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: 'menus'
  }
);

export default Menu;
