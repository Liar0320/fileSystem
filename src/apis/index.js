import axiosInstance from '@/vendors/axiosInstance';
// import { saveAs } from 'file-saver';
// import moment from 'moment';

let baseUrl = process.env.VUE_APP_BASE_API;

let joinPath = (path, __baseUrl = baseUrl) => {
  return `${__baseUrl}${path}`;
};

export const uploadFiles = (data, config) => {
  return axiosInstance.uploadFiles(joinPath('upload'), data, config);
};

export const getFileList = dir => {
  return axiosInstance.get(joinPath(`list`), { dir });
};

export const downloadFile = (dirFile, fileName) => {
  // saveAs(
  //   joinPath(`download`) + '?dirFile=' + encodeURIComponent(dirFile),
  //   fileName,
  // );
  // window.open(joinPath(`download`) + '?dirFile=' + encodeURIComponent(dirFile));
  console.log(fileName);
  window.open(
    joinPath(`download`) + '?dirFile=' + encodeURIComponent(dirFile),
    '__black',
  );
  // return axiosInstance.get(joinPath(`download`), { dirFile }).then(res => {
  //   saveAs(res, fileName);
  // });
};
export const deleteFile = dirFile => {
  return axiosInstance.get(joinPath(`delete`), { dirFile });
};
export const moveFile = (dirFile, toDirFile) => {
  return axiosInstance.get(joinPath(`move`), { dirFile, toDirFile });
};

export const getTemp = () => {
  return axiosInstance.get(joinPath(`temp/get`));
};

export const updateTemp = params => {
  return axiosInstance.post(joinPath(`temp/update`), params);
};

export const login = pwd => {
  return new Promise(resolve => {
    let bol = pwd === process.env.VUE_APP_LOGIN_PWD;

    if (bol) {
      localStorage.setItem('pwd', pwd);
    }
    resolve(bol);
  });
};
