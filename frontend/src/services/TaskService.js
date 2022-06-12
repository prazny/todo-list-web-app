/* eslint-disable */
import http from "../http-common"

class TaskService {
  get(task_id) {
    return http.get('/account/tasks/'+task_id);
  }

  delete(task_id) {
    return http.delete('/account/tasks/'+task_id);
  }

  create(name, color, project_id) {
    return http.post('/account/tasks?project_id='+project_id, {
      name, color
    })
  }
}
export default new TaskService();
