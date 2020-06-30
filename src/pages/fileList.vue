<template>
  <section class="container">
    <progress-bar :value="this.progress.value" :status="this.progress.status" />

    <div class="table-warp">
      <table class="table__lich table-hover">
        <thead>
          <tr>
            <th>文件名</th>
            <th style="min-width: 110px;" class="hidden-xs ">文件大小</th>
            <th style="min-width: 110px;" class="hidden-xs ">上传时间</th>
            <th style="min-width: 4em;">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in fileList" :key="item.path">
            <td>
              <svg class="icon mr-sm" aria-hidden="true">
                <use xlink:href="#icon-zip"></use></svg
              ><span>{{ item.name }}</span>
            </td>
            <td class="hidden-xs ">{{ item.size }}</td>
            <td class="hidden-xs ">{{ item.ctime }}</td>
            <td>
              <button class="btn__init" title="下载" @click="download(item)">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-download"></use>
                </svg>
              </button>
              <button class="btn__init" title="删除" @click="deleteFile(item)">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-trash"></use>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import progressBar from '@/components/progressBar/progressBar';

import {
  uploadFiles,
  getFileList,
  downloadFile,
  moveFile,
  deleteFile,
} from '../apis/index';
export default {
  data: function() {
    return {
      fileList: [],
      path: 'code',
      progress: {
        value: 0,
        status: 'ready',
        show: false,
      },
    };
  },
  components: {
    progressBar,
  },
  mounted() {
    this.path = this.$route.params.path;

    this.getFileList();
    this.initDrag();
  },
  destroyed() {
    document.removeEventListener('dragover', this.dragover);
    document.removeEventListener('drop', this.drop);
  },
  methods: {
    getFileList() {
      getFileList(this.path).then(list => {
        if (list instanceof Array) {
          this.fileList = list;
        }
      });
    },
    download(item) {
      downloadFile(item.path, item.name);
    },
    deleteFile(item) {
      let b = window.confirm('确定要删除吗？');

      if (b) {
        deleteFile(item.path).then(e => {
          console.log(e);
          this.getFileList();
        });
      }
    },
    move(item, toPath) {
      let b = window.confirm('确定要移动该文件吗？');

      if (b) {
        moveFile(item.path, toPath).then(() => {
          this.getFileList();
        });
      }
    },
    dragstart(event) {
      event.preventDefault();
    },
    dragover(event) {
      event.preventDefault();
    },
    drop(event) {
      if (event.dataTransfer.files.length <= 0) {
        return;
      }
      let { path } = this;

      let that = this;
      /* 拖动完成时触发*/

      this.progress.value = 0;
      event.preventDefault();
      uploadFiles(
        {
          fileList: event.dataTransfer.files,
          path: path,
        },
        {
          onUploadProgress: progressEvent => {
            // that.progress.status = 'onloading';
            that.$set(
              that.progress,
              'value',
              ((progressEvent.loaded / progressEvent.total) * 100) | 0,
            );
          },
        },
      )
        .then(() => {
          that.getFileList();
          setTimeout(() => {
            window.alert('上传成功');
          }, 500);
        })
        .catch(() => {
          this.progress.status = 'cancel';
        });
    },

    initDrag() {
      document.addEventListener('dragover', this.dragover);
      document.addEventListener('drop', this.drop);
    },
  },
};
</script>

<style lang="scss">
.hidden-xs {
}
</style>
