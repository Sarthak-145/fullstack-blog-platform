import API from './axios';

export const createPost = (data) => API.post('/posts', data);
export const getPosts = () => API.get('/posts');
export const getPostsMe = () => API.get('/posts/me');
export const getPostById = (id) => API.get(`/posts/${id}`);
export const editPost = (id, data) => API.put(`/posts/${id}`, data);
export const deletePost = (id) => API.delete(`/posts/${id}`);
