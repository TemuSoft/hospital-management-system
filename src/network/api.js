import http from "./main";

class api {
  getAll(path) {
    return http.get(`${path}`);
  }

  get(id) {
    return http.get(`${path}/${id}`);
  }

  create(data) {
    return http.post(`${path}`, data);
  }

  update(id, data) {
    return http.put(`${path}/${id}`, data);
  }

  delete(id) {
    return http.delete(`${path}/${id}`);
  }

  deleteAll() {
    return http.delete(`${path}`);
  }

  findByTitle(title) {
    return http.get(`${path}?title=${title}`);
  }
}

export default new api();
