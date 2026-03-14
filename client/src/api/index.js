import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout to prevent hanging requests
});

// ── Response Interceptor ──────────────────────────────────────────
// Normalise error messages from the server so useFetch always gets
// a plain string rather than a raw Axios error object.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const serverMessage = error?.response?.data?.message;
    const timeoutMessage = error.code === 'ECONNABORTED' ? 'Request timed out. Please try again.' : null;
    const message = serverMessage || timeoutMessage || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export const api = {
  menus: {
    getAll: () => apiClient.get('/api/menus'),
    getById: (id) => apiClient.get(`/api/menus/${id}`),
    create: (data) => apiClient.post('/api/menus', data),
    update: (id, data) => apiClient.put(`/api/menus/${id}`, data),
    delete: (id) => apiClient.delete(`/api/menus/${id}`),
  },
  contents: {
    getAll: () => apiClient.get('/api/contents'),
    getById: (id) => apiClient.get(`/api/contents/${id}`),
    create: (data) => apiClient.post('/api/contents', data),
    update: (id, data) => apiClient.put(`/api/contents/${id}`, data),
    delete: (id) => apiClient.delete(`/api/contents/${id}`),
  },
  collections: {
    getAll: () => apiClient.get('/api/collections'),
    getById: (id) => apiClient.get(`/api/collections/${id}`),
    create: (data) => apiClient.post('/api/collections', data),
    update: (id, data) => apiClient.put(`/api/collections/${id}`, data),
    delete: (id) => apiClient.delete(`/api/collections/${id}`),
  }
};

export default apiClient;
