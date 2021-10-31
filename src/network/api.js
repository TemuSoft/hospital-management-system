import http from "./main";
import authHeader from "./authHeader";

class api {
  getAll(path) {
    return http.get(`${path}`);
  }

  get(path, id) {
    return http.get(`${path}/${id}/`);
  }

  getPatientStatus(path, id, status) {
    return http.get(`${path}/${id}/${status}/`);
  }

  create(path, data) {
    return http.post(`${path}`, data);
  }

  createById(path, id, data) {
    return http.post(`${path}/${id}/`, data);
  }

  update(path, id, data) {
    return http.patch(`${path}/${id}/`, data);
  }

  updateWithoutId(path, data) {
    return http.patch(`${path}`, data);
  }

  delete(path, id) {
    return http.delete(`${path}/${id}/`);
  }

  deleteAll(path) {
    return http.delete(`${path}`, { headers: authHeader() });
  }

  findByTitle(path, title) {
    return http.get(`${path}?title=${title}`, { headers: authHeader() });
  }

  login(email, password, path) {
    return http.post(`${path}`, { email, password });
  }

  logout(path) {
    return http.post(`${path}`);
  }

  checkFile(path, container, name) {
    return Request.get(`${path}/${container}/files${name}`);
  }

  removeFile(container, name, path) {
    return Request.delete(`${path}/${container}/files/${name}`);
  }

  createWithFile(path, data) {
    return http.post(`${path}`, data, {});
  }
}

export default new api();
