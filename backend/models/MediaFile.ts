import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface MediaFileAttributes {
  id: string;
  userId: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  thumbnailPath?: string;
  url: string;
  thumbnailUrl?: string;
  category?: string;
  alt?: string;
  title?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MediaFileCreationAttributes extends Optional<MediaFileAttributes, 'id' | 'thumbnailPath' | 'thumbnailUrl' | 'category' | 'alt' | 'title' | 'description'> {}

class MediaFile extends Model<MediaFileAttributes, MediaFileCreationAttributes> implements MediaFileAttributes {
  public id!: string;
  public userId!: string;
  public fileName!: string;
  public originalName!: string;
  public mimeType!: string;
  public size!: number;
  public path!: string;
  public thumbnailPath?: string;
  public url!: string;
  public thumbnailUrl?: string;
  public category?: string;
  public alt?: string;
  public title?: string;
  public description?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MediaFile.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    fileName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    originalName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    mimeType: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    path: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    thumbnailPath: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    thumbnailUrl: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    alt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'media_files'
  }
);

export default MediaFile;
