import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ProjectAttributes {
  id: string;
  professionId: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  featuredImage?: string;
  gallery?: string[];
  category?: string;
  tags?: string[];
  technologies?: string[];
  client?: string;
  projectUrl?: string;
  githubUrl?: string;
  startDate?: Date;
  endDate?: Date;
  status: string;
  isActive: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id' | 'description' | 'content' | 'featuredImage' | 'gallery' | 'category' | 'tags' | 'technologies' | 'client' | 'projectUrl' | 'githubUrl' | 'startDate' | 'endDate' | 'status' | 'isActive' | 'order'> {}

class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: string;
  public professionId!: string;
  public title!: string;
  public slug!: string;
  public description?: string;
  public content?: string;
  public featuredImage?: string;
  public gallery?: string[];
  public category?: string;
  public tags?: string[];
  public technologies?: string[];
  public client?: string;
  public projectUrl?: string;
  public githubUrl?: string;
  public startDate?: Date;
  public endDate?: Date;
  public status!: string;
  public isActive!: boolean;
  public order!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
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
    featuredImage: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    gallery: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    technologies: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    client: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    projectUrl: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    githubUrl: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'completed'
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
    tableName: 'projects'
  }
);

export default Project;
