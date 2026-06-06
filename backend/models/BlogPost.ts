import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface BlogPostAttributes {
  id: string;
  professionId: string;
  authorId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  category?: string;
  tags?: string[];
  status: string;
  isActive: boolean;
  viewCount: number;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BlogPostCreationAttributes extends Optional<BlogPostAttributes, 'id' | 'excerpt' | 'featuredImage' | 'category' | 'tags' | 'status' | 'isActive' | 'viewCount' | 'publishedAt'> {}

class BlogPost extends Model<BlogPostAttributes, BlogPostCreationAttributes> implements BlogPostAttributes {
  public id!: string;
  public professionId!: string;
  public authorId!: string;
  public title!: string;
  public slug!: string;
  public excerpt?: string;
  public content!: string;
  public featuredImage?: string;
  public category?: string;
  public tags?: string[];
  public status!: string;
  public isActive!: boolean;
  public viewCount!: number;
  public publishedAt?: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BlogPost.init(
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
    authorId: {
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
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    featuredImage: {
      type: DataTypes.STRING(500),
      allowNull: true
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
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'draft'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'blog_posts'
  }
);

export default BlogPost;
