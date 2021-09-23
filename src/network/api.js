import http from "./main";
import authHeader from "./authHeader";

class api {
  getAll(path) {
    return http.get(`${path}`, { headers: authHeader() });
  }

  get(path, id) {
    return http.get(`${path}/${id}/`, { headers: authHeader() });
  }

  getPatientStatus(path, id, status) {
    return http.get(`${path}/${id}/${status}/`, { headers: authHeader() });
  }

  create(path, data) {
    return http.post(`${path}`, data, { headers: authHeader() });
  }

  update(path, id, data) {
    return http.patch(`${path}/${id}/`, data, { headers: authHeader() });
  }

  delete(path, id) {
    return http.delete(`${path}/${id}`, { headers: authHeader() });
  }

  deleteAll(path) {
    return http.delete(`${path}`, { headers: authHeader() });
  }

  findByTitle(path, title) {
    return http.get(`${path}?title=${title}`, { headers: authHeader() });
  }

  login(email, password, path) {
    return http.post(`${path}`, {
      email,
      password,
    });
  }

  logout(path) {
    return http.post(`${path}`);
  }
}

export default new api();
