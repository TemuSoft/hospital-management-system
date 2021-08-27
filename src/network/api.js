import http from "./main";

class api {
  getAll(path) {
    return http.get(`${path}`);
  }

  get(path, id) {
    return http.get(`${path}/${id}`);
  }

  create(path, data) {
    return http.post(`${path}`, data);
  }

  update(path, id, data) {
    return http.patch(`${path}/${id}/`, data);
  }

  delete(path, id) {
    return http.delete(`${path}/${id}`);
  }

  deleteAll(path) {
    return http.delete(`${path}`);
  }

  findByTitle(path, title) {
    return http.get(`${path}?title=${title}`);
  }

  login(email, password, path) {
    return Request.post(`${path}`, {
      email,
      password,
    });
  }

  logout(path) {
    return Request.post(`${path}`);
  }
}

export default new api();
