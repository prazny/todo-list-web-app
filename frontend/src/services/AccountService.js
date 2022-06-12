/* eslint-disable */
import http from "../http-common"

class AccountService {
  get() {
    return http.get('/account');
  }

  update(firstname, lastname, password) {
    return http.put('/account', {
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
       firstname, lastname, password
    });
  }

}

export default new AccountService();
