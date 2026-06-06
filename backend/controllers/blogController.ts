import { Request, Response, NextFunction } from 'express';
import { BlogPost, User } from '../models';
import { AuthRequest } from '../middleware/auth';
import { Op } from 'sequelize';

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, tag, search, status = 'published', page = 1, limit = 10 } = req.query;

    const where: any = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    if (category) {
      where.category = category;
    }

    if (tag) {
      where.tags = {
        [Op.like]: `%${tag}%`
      };
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { excerpt: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } }
      ];
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows: posts } = await BlogPost.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'email', 'avatar']
        }
      ],
      order: [['publishedAt', 'DESC']],
      limit: Number(limit),
      offset
    });

    res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(count / Number(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const post = await BlogPost.findByPk(id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'email', 'avatar']
        }
      ]
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment views
    post.views = (post.views || 0) + 1;
    await post.save();

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
};

export const getPostBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    const post = await BlogPost.findOne({
      where: { slug },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'email', 'avatar']
        }
      ]
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment views
    post.views = (post.views || 0) + 1;
    await post.save();

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      tags,
      status,
      publishedAt
    } = req.body;

    const post = await BlogPost.create({
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      tags,
      status: status || 'draft',
      publishedAt: status === 'published' ? publishedAt || new Date() : null,
      authorId: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: post
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      tags,
      status,
      publishedAt
    } = req.body;

    const post = await BlogPost.findByPk(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Update fields
    if (title) post.title = title;
    if (slug) post.slug = slug;
    if (excerpt) post.excerpt = excerpt;
    if (content) post.content = content;
    if (featuredImage) post.featuredImage = featuredImage;
    if (category) post.category = category;
    if (tags) post.tags = tags;
    if (status) {
      post.status = status;
      if (status === 'published' && !post.publishedAt) {
        post.publishedAt = new Date();
      }
    }
    if (publishedAt) post.publishedAt = new Date(publishedAt);

    await post.save();

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      data: post
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const post = await BlogPost.findByPk(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    await post.destroy();

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await BlogPost.findAll({
      attributes: ['category'],
      where: {
        category: { [Op.ne]: null },
        status: 'published'
      },
      group: ['category']
    });

    const uniqueCategories = [...new Set(categories.map(p => p.category))];

    res.status(200).json({
      success: true,
      data: uniqueCategories
    });
  } catch (error) {
    next(error);
  }
};

export const getTags = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await BlogPost.findAll({
      attributes: ['tags'],
      where: {
        tags: { [Op.ne]: null },
        status: 'published'
      }
    });

    const allTags: string[] = [];
    posts.forEach(post => {
      if (post.tags) {
        const tags = post.tags.split(',').map(t => t.trim());
        allTags.push(...tags);
      }
    });

    const uniqueTags = [...new Set(allTags)];

    res.status(200).json({
      success: true,
      data: uniqueTags
    });
  } catch (error) {
    next(error);
  }
};
