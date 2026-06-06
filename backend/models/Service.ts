import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ServiceAttributes {
  id: string;
  professionId: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  icon?: string;
  featuredImage?: string;
  price?: number;
  priceType?: string;
  isActive: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id' | 'description' | 'content' | 'icon' | 'featuredImage' | 'price' | 'priceType' | 'isActive' | 'order'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: string;
  public professionId!: string;
  public title!: string;
  public slug!: string;
  public description?: string;
  public content?: string;
  public icon?: string;
  public featuredImage?: string;
  public price?: number;
  public priceType?: string;
  public isActive!: boolean;
  public order!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Service.init(
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
      type: DataTypes.STRING(255),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    featuredImage: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    priceType: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    tableName: 'services'
  }
);

export default Service;
