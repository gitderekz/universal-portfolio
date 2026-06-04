import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Services with fallback support
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
  changePassword: (data: any) => api.put('/auth/password', data)
};

export const professionsAPI = {
  getAll: () => api.get('/professions'),
  getById: (id: string) => api.get(`/professions/${id}`),
  getBySlug: (slug: string) => api.get(`/professions/slug/${slug}`),
  create: (data: any) => api.post('/professions', data),
  update: (id: string, data: any) => api.put(`/professions/${id}`, data),
  delete: (id: string) => api.delete(`/professions/${id}`)
};

export const pagesAPI = {
  getAll: (params?: any) => api.get('/pages', { params }),
  getById: (id: string) => api.get(`/pages/${id}`),
  getBySlug: (slug: string) => api.get(`/pages/slug/${slug}`),
  create: (data: any) => api.post('/pages', data),
  update: (id: string, data: any) => api.put(`/pages/${id}`, data),
  delete: (id: string) => api.delete(`/pages/${id}`)
};

export const projectsAPI = {
  getAll: (params?: any) => api.get('/projects', { params }),
  getById: (id: string) => api.get(`/projects/${id}`),
  create: (data: any) => api.post('/projects', data),
  update: (id: string, data: any) => api.put(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`)
};

export const blogAPI = {
  getAll: (params?: any) => api.get('/blog', { params }),
  getById: (id: string) => api.get(`/blog/${id}`),
  getBySlug: (slug: string) => api.get(`/blog/slug/${slug}`),
  create: (data: any) => api.post('/blog', data),
  update: (id: string, data: any) => api.put(`/blog/${id}`, data),
  delete: (id: string) => api.delete(`/blog/${id}`)
};

export const testimonialAPI = {
  getAll: (params?: any) => api.get('/testimonials', { params }),
  create: (data: any) => api.post('/testimonials', data),
  update: (id: string, data: any) => api.put(`/testimonials/${id}`, data),
  delete: (id: string) => api.delete(`/testimonials/${id}`)
};

export const servicesAPI = {
  getAll: (params?: any) => api.get('/services', { params }),
  getById: (id: string) => api.get(`/services/${id}`),
  create: (data: any) => api.post('/services', data),
  update: (id: string, data: any) => api.put(`/services/${id}`, data),
  delete: (id: string) => api.delete(`/services/${id}`)
};

export const teamAPI = {
  getAll: (params?: any) => api.get('/team', { params }),
  getById: (id: string) => api.get(`/team/${id}`),
  create: (data: any) => api.post('/team', data),
  update: (id: string, data: any) => api.put(`/team/${id}`, data),
  delete: (id: string) => api.delete(`/team/${id}`)
};

export const contactAPI = {
  submit: (data: any) => api.post('/contact', data),
  getAll: (params?: any) => api.get('/contact', { params }),
  updateStatus: (id: string, status: string) => api.put(`/contact/${id}`, { status }),
  delete: (id: string) => api.delete(`/contact/${id}`)
};

export const mediaAPI = {
  upload: (formData: FormData) => api.post('/media', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAll: (params?: any) => api.get('/media', { params }),
  getById: (id: string) => api.get(`/media/${id}`),
  delete: (id: string) => api.delete(`/media/${id}`)
};

export default api;
