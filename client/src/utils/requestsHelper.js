import axios from 'axios';

export const getPost = async slug => {
  const result = await axios.get(`/api/${slug}`);
  return result;
};

export const createPost = async post => {
  const result = await axios.post(`/api/new`, post);
  return result;
};

export const login = async user => {
  const result = await axios.post('/auth/login', user);
  return result;
};

export const deletePost = async slug => {
  const result = await axios.delete(`/api/${slug}`);
  return result;
};

export const isAuthenticated = async () => {
  const result = await axios.get('/auth/isAuthenticated');
  return result;
};

export const logout = async () => {
  const result = await axios.get('/auth/logout');
  return result;
};

export const getUser = async id => {
  const result = await axios.post('/api/user', id);
  return result;
};

const getData = async posts => {
  return Promise.all(posts.map(post => getUser(post.author)));
};

export const getAuthors = async (posts) => {
  getData(posts).then(data => {
      const auths = data.map(u => u.data);
      return auths.map(u => u.user);
  });
};

// POST LIST COMPONENT HELPERS
export const formatDate = dateString => {
  const year = dateString.slice(0,4);
  const month = dateString.slice(5,7);
  const day = dateString.slice(8,10);

  const d = new Date(`${month}/${day}/${year}`);
  return d.toLocaleDateString();
};

export const updatePage = async pageNum => {
  const result = await axios.get(`/api/posts?page=${pageNum}`);
  return result;
};

export const getPostList = async currentPage => {
  const result = axios.get(`/api/posts?page=${currentPage}`)
  return result;
};

export const getAuth = async id => {
  const result = axios.post('/api/user', id);
  return result;
};