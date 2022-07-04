import axios from 'axios';

let BASE_URL = '';

let requestCustom;
let data;

const isCobol = axios.create({
  withCredentials: true
});

isCobol.interceptors.request.use(async (request) => {

  // request.baseURL = `http://172.16.1.34:8081/servicecomercial/servlet/isCobol`;
  // BASE_URL = `http://172.16.1.34:8081/servicecomercial/servlet/isCobol`;
  request.baseURL = `http://172.16.1.43:9090/servicecomercial/servlet/isCobol`;
  BASE_URL = `http://172.16.1.43:9090/servicecomercial/servlet/isCobol`;

  requestCustom = request;
  data = request.data;

  return request;
});

isCobol.interceptors.response.use(
  response => response,
  async _error => {
    console.log('Abrindo sessão com o servidor novamente');

    const axiosNew = axios.create({
      baseURL: BASE_URL,
      withCredentials: true
    });

    let session = await axiosNew
      .get('(serviceci)')
      .then(resp => resp)
      .catch(_err => {
        return {
          status: 404,
          success: false,
          message: 'Não foi possível conectar ao servidor',
          withCredentials: true
        };
      });

    if (session.status !== 200) {
      session = {
        status: 404,
        success: false,
        message: 'Não foi possível conectar ao servidor',
        withCredentials: true
      };

      return session;
    }

    console.log('Refazendo a chamada original...');
    let originalResponse;
    if (requestCustom.method === 'POST' || requestCustom.method === 'post') {
      originalResponse = await isCobol.post(`${requestCustom.url}`, data);
    } else {
      originalResponse = await isCobol.get(`${requestCustom.url}`);
    }
    if (originalResponse.status !== 200) {
      session = {
        status: 404,
        success: false,
        message: 'Não foi possível conectar ao servidor',
        withCredentials: true
      };
      return session;
    }
    return originalResponse;
  },
);

export default isCobol;
