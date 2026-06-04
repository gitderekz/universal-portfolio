const { Testimonial, Profession } = require('../models');

const getTestimonials = async (req, res, next) => {
  try {
    const { professionId, isActive, rating } = req.query;

    const where = {};
    if (professionId) where.professionId = professionId;
    if (isActive !== undefined) where.isActive = isActive === 'true';
    if (rating) where.rating = rating;

    const testimonials = await Testimonial.findAll({
      where,
      include: [
        {
          model: Profession,
          as: 'profession',
          attributes: ['id', 'name', 'slug']
        }
      ],
      order: [['order', 'ASC'], ['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: testimonials.length,
      testimonials
    });
  } catch (error) {
    next(error);
  }
};

const getTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id, {
      include: [
        {
          model: Profession,
          as: 'profession',
          attributes: ['id', 'name', 'slug']
        }
      ]
    });

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    res.status(200).json({
      success: true,
      testimonial
    });
  } catch (error) {
    next(error);
  }
};

const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);

    res.status(201).json({
      success: true,
      testimonial
    });
  } catch (error) {
    next(error);
  }
};

const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    await testimonial.update(req.body);

    res.status(200).json({
      success: true,
      testimonial
    });
  } catch (error) {
    next(error);
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    await testimonial.destroy();

    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};