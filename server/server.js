/* eslint-disable no-sync */
/*
 * @Author: lich
 * @Date: 2020-04-14 14:30:41
 * @Last Modified by: lich
 * @Last Modified time: 2020-06-30 10:16:33
 */
// interface IFileServe{

// import { existsSync, mkdirSync, rename } from "fs";
// import { join } from "path";
const fs = require('fs');
const pathLib = require('path');

class FileServer {
  add(file, path) {
    path = path || 'temp';
    if (!file || !file.size) {
      return '新增文件错误，文件为空。';
    }
    let dir = this.getWholePath(path);

    if (fs.existsSync(dir) === false) {
      fs.mkdirSync(dir, { recursive: true });
    }
    //@TODO:如果存在同名的文件

    return this.move(file.path, pathLib.join(dir, file.name));
  }
  delete(path) {
    let wholePath = this.getWholePath(path);

    return new Promise((resolve, reject) => {
      fs.unlink(wholePath, e => {
        if (e) {
          reject(e);
        } else {
          resolve(true);
        }
      });
    });
  }
  rename(oldPath, newPath) {
    return this.move(oldPath, newPath);
  }
  move(from, to) {
    return new Promise((resolve, reject) => {
      //   if (existsSync(to) === false) mkdirSync(to, { recursive: true });
      fs.rename(from, to, e => {
        if (e) {
          reject(e);
        } else {
          resolve(true);
        }
      });
    });
  }
  list(path) {
    let wholePath = this.getWholePath(path);

    let { getWholePath } = this;

    return new Promise((resolve, reject) => {
      if (fs.existsSync(wholePath)) {
        fs.readdir(wholePath, (e, files) => {
          if (e) {
            reject(e);
          } else {
            let fileStatList = files.map(fileName => {
              let fileWholePath = getWholePath(path, fileName);

              let fileStat = fs.statSync(fileWholePath);

              // eslint-disable-next-line no-use-before-define
              let file = new FileInfo({ name: fileName });

              file.path = `${path}/${fileName}`;
              file.size = file.formatBytes(fileStat.size);
              file.wholePath = fileWholePath;
              file.ctime = fileStat.ctime;

              return file;
            });

            resolve(fileStatList);
          }
        });
      } else {
        reject('不存在当前目录');
      }
    });
  }

  write(filePath, fileContent) {
    if (typeof fileContent === 'object') {
      fileContent = JSON.stringify(fileContent);
    }

    return new Promise((resolve, reject) => {
      console.info(`fileServe.write   ${filePath}  ${fileContent}`);
      fs.writeFile(filePath, fileContent, e => {
        if (e) {
          reject(e);
        } else {
          resolve(true);
        }
      });
    });
  }

  getWholePath() {
    return pathLib.join(__dirname, ...arguments);
  }
}

const fileServer = new FileServer();

class FileInfo {
  // ctime = "";
  // name = "";
  // size = "";
  // path = "";
  // wholePath = "";
  constructor({ name }) {
    this.name = name;
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}

module.exports = fileServer;
