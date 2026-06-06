import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface TestimonialAttributes {
  id: string;
  professionId: string;
  name: string;
  position?: string;
  company?: string;
  avatar?: string;
  rating?: number;
  content: string;
  isActive: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TestimonialCreationAttributes extends Optional<TestimonialAttributes, 'id' | 'position' | 'company' | 'avatar' | 'rating' | 'isActive' | 'order'> {}

class Testimonial extends Model<TestimonialAttributes, TestimonialCreationAttributes> implements TestimonialAttributes {
  public id!: string;
  public professionId!: string;
  public name!: string;
  public position?: string;
  public company?: string;
  public avatar?: string;
  public rating?: number;
  public content!: string;
  public isActive!: boolean;
  public order!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Testimonial.init(
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
      type: DataTypes.STRING(200),
      allowNull: false
    },
    position: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    company: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
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
    tableName: 'testimonials'
  }
);

export default Testimonial;
