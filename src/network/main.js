import http from "./api";
import { API_ROOT } from "./root";

class api {
  getAll(path) {
    return http.get(API_ROOT + "/" + path);
  }

  get(id) {
    return http.get(`${API_ROOT}/${path}/${id}`);
  }

  create(data) {
    return http.post(API_ROOT + "/" + path, data);
  }

  update(id, data) {
    return http.put(`${API_ROOT}/${path}/${id}`, data);
  }

  delete(id) {
    return http.delete(`${API_ROOT}/${path}/${id}`);
  }

  deleteAll() {
    return http.delete(`${API_ROOT}/${path}`);
  }

  findByTitle(title) {
    return http.get(`${API_ROOT}/${path}?title=${title}`);
  }
}

export default new api();
