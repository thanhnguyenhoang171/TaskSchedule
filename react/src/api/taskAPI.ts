import axiosClient from './axiosClient';

const taskApi = {
    create: (task) => axiosClient.post('/tasks', task),
    delete: (id) => axiosClient.delete(`/tasks/${id}`),
    getAll: () => axiosClient.get('/tasks'),
    update: (id, data) => axiosClient.put(`/tasks/${id}`, data)
};

export default taskApi;
