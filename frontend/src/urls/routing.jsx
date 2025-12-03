import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

export const usersAPI = {
    getAll: () => instance.get('users/'),
    getById: (id) => instance.get(`users/${id}/`),
    create: (data) => instance.post('users/', data),
    update: (id, data) => instance.put(`users/${id}/`, data),
    delete: (id) => instance.delete(`users/${id}/`),
};

export const groupsAPI = {
    getAll: () => instance.get('groups/'),
    getById: (id) => instance.get(`groups/${id}/`),
    create: (data) => instance.post('groups/', data),
    update: (id, data) => instance.put(`groups/${id}/`, data),
    delete: (id) => instance.delete(`groups/${id}/`),
};

export default instance;