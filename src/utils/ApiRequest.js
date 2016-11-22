import LoginStore from '../stores/LoginStore';
import FormData from 'form-data';

class ApiRequest {

  request(path, method, callback, params) {
    let opts = {
      method: method
    };
    if (method === 'POST') {
      let form = new FormData();
      for (let i in params) {
        if (params.hasOwnProperty(i)) {
          form.append(i, params[i]);
        }
      }
      opts.body = form;
    }
    if (path !== 'login' && path !== 'register') {
      if (!LoginStore.token) {
        throw new Error('Token is not stored for ' + method + ' ' + path);
      }
      opts.headers = {
        'Authorization': 'Bearer ' + LoginStore.token
      }
    }
    fetch('http://localhost:1337/606ep.ru:8080/' + path, opts).then(function(response) {
      return response.json();
    }).then(function(data) {
      callback(data);
    });
  }

}

export default new ApiRequest();