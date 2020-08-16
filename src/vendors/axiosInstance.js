import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error),
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // 请求拦截器中的source.cancel会将内容发送到error中
    // 通过axios.isCancel(error)来判断是否返回有数据 有的话直接返回给用户
    if (axios.isCancel(error)) {
      return Promise.resolve(error.message);
    }

    if (error.message === 'Network Error') {
      window.confirm(
        '当前未连接后端服务\n请克隆项目，并且启动库中的server服务 \n <npm i && npm run server>',
      );
    }

    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          console.log(`错误请求`);
          break;
        case 401:
          console.log(`未授权请重新登陆`);
          break;
        case 403:
          console.log(`拒绝访问`);
          break;
        case 404:
          console.log(`请求错误`);
          break;
        case 405:
          console.log(`请求方法未允许`);
          break;
        case 408:
          console.log(`请求超时`);
          break;
        case 501:
          console.log(`网络未实现`);
          break;
        case 502:
          console.log(`网络错误`);
          break;
        case 503:
          console.log(`服务器不可用`);
          break;
        case 504:
          console.log(`网络超时`);
          break;
        case 505:
          console.log(`版本不支持该请求`);
          break;
        default:
          console.log(`default`);
          break;
      }
    } else {
      console.log(`连接错误${error.response.status}`);
    }

    return Promise.reject('');
  },
);

export default {
  post: (path, data = {}, config = {}) => {
    if (config.__normal) {
      config.headers = {
        'content-type': 'application/x-www-form-urlencoded',
      };
      delete config.__normal;
    }

    return axiosInstance.post(path, data, config);
  },
  get: (path, params = {}, config = {}) => {
    // config.onDownloadProgress = progressEvent => {
    //   var complete =
    //     (((progressEvent.loaded / progressEvent.total) * 100) | 0) + '%';

    //   console.log(complete);
    // };

    return axiosInstance.get(path, { params, ...config });
  },
  uploadFiles: (path, data = {}, config = {}) => {
    let formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];

        if (element instanceof FileList) {
          [...element].forEach(item => {
            formData.append(key, item, item.name);
          });
        } else {
          formData.append(key, element);
        }

        formData.append(key, element);
      }
    }
    config.headers = {
      'content-type': 'multipart/form-data',
    };
    if (!config.onUploadProgress) {
      config.onUploadProgress = progressEvent => {
        var complete =
          (((progressEvent.loaded / progressEvent.total) * 100) | 0) + '%';

        console.log(complete);
      };
    }

    return axiosInstance.post(path, formData, config);
  },
};
