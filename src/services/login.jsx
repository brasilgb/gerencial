import axios from 'axios';

let BASE_URL = '';

let requestCustom;
let data;

const login = axios.create({
  withCredentials: true
});

login.interceptors.request.use(async (request) => {

  request.baseURL = `http://172.16.1.43:9090/servicemobile/servlet/isCobol`;
  BASE_URL = `http://172.16.1.43:9090/servicemobile/servlet/isCobol`;

  requestCustom = request;
  data = request.data;

  return request;
});

login.interceptors.response.use(
  response => response,
  async _error => {
    console.log('Abrindo sessão com o servidor novamente');

    const axiosNew = axios.create({
      baseURL: BASE_URL,
      withCredentials: true
    });

    let session = await axiosNew
      .get('(servicemobile)')
      .then(resp => resp)
      .catch(_err => {
        return {
          status: 404,
          success: false,
          message: 'Não foi possível conectar ao servidor',
        };
      });

    if (session.status !== 200) {
      session = {
        status: 404,
        success: false,
        message: 'Não foi possível conectar ao servidor',
      };

      return session;
    }

    console.log('Refazendo a chamada original...');
    let originalResponse;
    if (requestCustom.method === 'POST' || requestCustom.method === 'post') {
      originalResponse = await login.post(`${requestCustom.url}`, data);
    } else {
      originalResponse = await login.get(`${requestCustom.url}`);
    }

    return originalResponse;
  },
);

export default login;
