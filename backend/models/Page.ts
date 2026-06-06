import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface PageAttributes {
  id: string;
  professionId: string;
  title: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  isActive: boolean;
  order: number;
  layoutType?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PageCreationAttributes extends Optional<PageAttributes, 'id' | 'description' | 'metaTitle' | 'metaDescription' | 'metaKeywords' | 'isActive' | 'order' | 'layoutType'> {}

class Page extends Model<PageAttributes, PageCreationAttributes> implements PageAttributes {
  public id!: string;
  public professionId!: string;
  public title!: string;
  public slug!: string;
  public description?: string;
  public metaTitle?: string;
  public metaDescription?: string;
  public metaKeywords?: string;
  public isActive!: boolean;
  public order!: number;
  public layoutType?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Page.init(
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
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    metaTitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    metaKeywords: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    layoutType: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: 'default'
    }
  },
  {
    sequelize,
    tableName: 'pages'
  }
);

export default Page;
