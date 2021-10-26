/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  let err = null, xhr = new XMLHttpRequest();
  let formData = new FormData();
  for (let key in options.data) formData.append(key, options.data[key]);

  xhr.open(options.method, options.url);
  xhr.withCredentials = true;
  xhr.responseType = options.responseType;
  xhr.send(formData);

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.response.hasOwnProperty('error')) err = xhr.response.error;
      options.callback(err, xhr.response);
    }
  })
};
