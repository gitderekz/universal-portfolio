import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface PageSectionAttributes {
  id: string;
  pageId: string;
  type: string;
  title?: string;
  content?: any;
  order: number;
  isActive: boolean;
  config?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PageSectionCreationAttributes extends Optional<PageSectionAttributes, 'id' | 'title' | 'content' | 'order' | 'isActive' | 'config'> {}

class PageSection extends Model<PageSectionAttributes, PageSectionCreationAttributes> implements PageSectionAttributes {
  public id!: string;
  public pageId!: string;
  public type!: string;
  public title?: string;
  public content?: any;
  public order!: number;
  public isActive!: boolean;
  public config?: any;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PageSection.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    pageId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    content: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    config: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null
    }
  },
  {
    sequelize,
    tableName: 'page_sections'
  }
);

export default PageSection;
