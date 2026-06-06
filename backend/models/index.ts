import { sequelize } from '../config/database';
import User from './User';
import Role from './Role';
import Profession from './Profession';
import Page from './Page';
import PageSection from './PageSection';
import Menu from './Menu';
import MenuItem from './MenuItem';
import MediaFile from './MediaFile';
import Contact from './Contact';
import Setting from './Setting';
import Project from './Project';
import BlogPost from './BlogPost';
import Testimonial from './Testimonial';
import Service from './Service';
import Team from './Team';

// Define Relationships

// User - Role (Many-to-One)
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
Role.hasMany(User, { foreignKey: 'roleId', as: 'users' });

// User - Profession (Many-to-One)
User.belongsTo(Profession, { foreignKey: 'professionId', as: 'profession' });
Profession.hasMany(User, { foreignKey: 'professionId', as: 'users' });

// Page - Profession (Many-to-One)
Page.belongsTo(Profession, { foreignKey: 'professionId', as: 'profession' });
Profession.hasMany(Page, { foreignKey: 'professionId', as: 'pages' });

// PageSection - Page (Many-to-One)
PageSection.belongsTo(Page, { foreignKey: 'pageId', as: 'page' });
Page.hasMany(PageSection, { foreignKey: 'pageId', as: 'sections' });

// Menu - Profession (Many-to-One)
Menu.belongsTo(Profession, { foreignKey: 'professionId', as: 'profession' });
Profession.hasMany(Menu, { foreignKey: 'professionId', as: 'menus' });

// MenuItem - Menu (Many-to-One)
MenuItem.belongsTo(Menu, { foreignKey: 'menuId', as: 'menu' });
Menu.hasMany(MenuItem, { foreignKey: 'menuId', as: 'items' });

// MenuItem - MenuItem (Self-referencing for nested menus)
MenuItem.belongsTo(MenuItem, { foreignKey: 'parentId', as: 'parent' });
MenuItem.hasMany(MenuItem, { foreignKey: 'parentId', as: 'children' });

// MediaFile - User (Many-to-One)
MediaFile.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(MediaFile, { foreignKey: 'userId', as: 'mediaFiles' });

// Project - Profession (Many-to-One)
Project.belongsTo(Profession, { foreignKey: 'professionId', as: 'profession' });
Profession.hasMany(Project, { foreignKey: 'professionId', as: 'projects' });

// BlogPost - Profession (Many-to-One)
BlogPost.belongsTo(Profession, { foreignKey: 'professionId', as: 'profession' });
Profession.hasMany(BlogPost, { foreignKey: 'professionId', as: 'blogPosts' });

// BlogPost - User (Many-to-One)
BlogPost.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
User.hasMany(BlogPost, { foreignKey: 'authorId', as: 'blogPosts' });

// Testimonial - Profession (Many-to-One)
Testimonial.belongsTo(Profession, { foreignKey: 'professionId', as: 'profession' });
Profession.hasMany(Testimonial, { foreignKey: 'professionId', as: 'testimonials' });

// Service - Profession (Many-to-One)
Service.belongsTo(Profession, { foreignKey: 'professionId', as: 'profession' });
Profession.hasMany(Service, { foreignKey: 'professionId', as: 'services' });

// Team - Profession (Many-to-One)
Team.belongsTo(Profession, { foreignKey: 'professionId', as: 'profession' });
Profession.hasMany(Team, { foreignKey: 'professionId', as: 'teamMembers' });

export {
  sequelize,
  User,
  Role,
  Profession,
  Page,
  PageSection,
  Menu,
  MenuItem,
  MediaFile,
  Contact,
  Setting,
  Project,
  BlogPost,
  Testimonial,
  Service,
  Team
};
