<template>
  <div>
    <p v-show="msg" class="text-center">{{ msg }}</p>
    <textarea
      name="paper"
      id="paper"
      cols="30"
      rows="10"
      v-model="conent"
      @change="autoSave"
      class="wd"
    ></textarea>
    <p><button @click="reset">还原</button></p>
  </div>
</template>

<script>
import { getTemp, updateTemp } from '../apis';
export default {
  data: function() {
    return {
      conent: '',
      backConent: '',
      paper: null,
      msg: null,
    };
  },
  mounted() {
    this.getContent();
    this.paper = this.paperEnhance();
  },
  methods: {
    getContent() {
      getTemp().then(res => {
        this.conent = res;
        this.backConent = res;
        this.$nextTick().then(() => {
          this.paper.resize();
        });
      });
    },
    paperEnhance() {
      //@TODO:处理复制粘贴等事件
      let paper = document.querySelector('#paper');

      let paperSize = document.createElement('div');

      let minHeight = paper['clientHeight'];

      let style = getComputedStyle(paper, null);

      paperSize.style['font'] = style['font'];
      paperSize.style['font-size'] = style['font-size'];
      paperSize.style['lineHeight'] = style['lineHeight'];
      paperSize.style['width'] = style['width'];
      paperSize.style['position'] = 'absolute';
      paperSize.style['top'] = '0';
      paperSize.style['visibility'] = 'hidden';
      paper.parentElement.append(paperSize);

      function autoSize() {
        paperSize.innerText = paper.value;
        let paperSizeHeight = paperSize['clientHeight'];

        paperSizeHeight =
          paperSizeHeight > minHeight ? paperSizeHeight : minHeight;
        let paperHeight = paper['clientHeight'];

        console.log(paperSizeHeight, paperHeight);
        //待优化 判断有问题
        if (paperSizeHeight !== paperHeight) {
          paper.style.height = paperSizeHeight + 15 + 'px';
        }
      }

      paper.addEventListener('keydown', autoSize);

      var timer = null;
      const resize = () => {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          paperSize.style['width'] = style['width'];
          autoSize();
          console.log(paperSize.style['width']);
          timer = null;
        }, 100);
      };

      window.addEventListener('resize', resize);

      return {
        off: function off() {
          window.removeEventListener(resize, resize);
          paper.removeEventListener('keydown', autoSize);
          paperSize.parentElement.removeChild(paperSize);
          paperSize = null;
        },
        resize: function() {
          paper.dispatchEvent(new Event('keydown'));
        },
      };
    },
    autoSave() {
      updateTemp({ temp: this.conent }).then(() => {
        this.msg = '自动保存成功';
        setTimeout(() => {
          this.msg = null;
        }, 2000);
      });
    },
    reset() {
      this.conent = this.backConent;
      this.autoSave();
    },
  },
  destroyed() {
    this.paper.off();
  },
};
</script>

<style></style>
