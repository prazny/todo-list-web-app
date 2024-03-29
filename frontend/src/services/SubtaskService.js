/* eslint-disable */
import http from "../http-common"

class SubtaskService {
  create(name, task_id) {
    return http.post('/account/subtasks?task_id=' + task_id, {
      name, task_id, status: 1,
    })
  }

  changeStatus(subtask_id, status) {
    return http.post('/account/subtasks/' + subtask_id + "/change-status", {
      status
    })
  }

  delete(subtask_id) {
    return http.delete('/account/subtasks/' + subtask_id)
  }
}

export default new SubtaskService();
