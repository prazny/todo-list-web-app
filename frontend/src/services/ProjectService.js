/* eslint-disable */
import http from "../http-common"

class ProjectService {
  getAll() {
    return http.get('/account/projects');
  }

  get(id) {
    return http.get('/account/projects/'+id);
  }

  delete(id) {
    return http.delete('/account/projects/'+id);
  }

  create(name, description, color) {
    return http.post('/account/projects', {
      name, description, color
    })
  }
}
export default new ProjectService();
