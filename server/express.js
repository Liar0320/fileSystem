/* eslint-disable no-unused-vars */
const express = require('express');
const formidable = require('formidable');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const fileServer = require('./server');

//设置允许跨域访问该服务.
app.all('*', function(req, res, next) {
  console.log(req.url, req.path);
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/list', (req, res) => {
  let dir = req.query.dir;

  fileServer
    .list(dir)
    .then(list => {
      res.json(list);
    })
    .catch(e => {
      res.json(e);
    });
});

app.get('/delete', (req, res) => {
  let dirFile = req.query.dirFile;

  fileServer
    .delete(dirFile)
    .then(list => {
      res.json(true);
    })
    .catch(e => {
      res.json(e);
    });
});

app.get('/download', (req, res) => {
  // let dir = req.query.dir;
  let dirFile = req.query.dirFile;

  res.download(fileServer.getWholePath(dirFile));
});

app.get('/move', (req, res) => {
  let dirFile = req.query.dirFile;

  let toDirFile = req.query.toDirFile;

  fileServer
    .move(dirFile, toDirFile)
    .then(list => {
      res.json(true);
    })
    .catch(e => {
      res.json(e);
    });
});

app.get('/temp/get', (req, res) => {
  const options = {
    root: fileServer.getWholePath(),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };

  const fileName = 'note.md';

  res.sendFile(fileName, options, function(err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

app.post('/temp/update', (req, res) => {
  let temp = req.body.temp;

  fileServer
    .write(fileServer.getWholePath('note.md'), temp)
    .then(e => {
      res.json(e);
    })
    .catch(e => {
      res.json(e);
    });
});

app.post('/upload', (req, res, next) => {
  const form = formidable({
    // encoding: "utf-8",
    multiples: true,
    uploadDir: __dirname,
    //最大为2g
    maxFileSize: 2 * 1024 * 1024 * 1024,
  });

  try {
    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
      }
      if (files.fileList instanceof Array) {
        files.fileList.forEach(file => {
          fileServer.add(file, fields.path);
        });
      } else {
        fileServer.add(files.fileList, fields.path);
      }

      res.json(true);
    });
  } catch (error) {
    res.json(error);
  }

  // .catch((e) => {
  //   res.json(e);
  // });
});

app.listen(8181, e => {
  console.log('fileServer 项目启动成功 端口8181');
});
