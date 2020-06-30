// import Vue from "Vue";
// // 注册一个全局自定义指令 `v-focus`
// Vue.directive("focus", {
// 	// 当被绑定的元素插入到 DOM 中时……
// 	inserted: function (el) {
// 		// 聚焦元素
// 		el.focus();
// 	}
// });
// https://www.jianshu.com/p/89a05706917a       关于vue.use的理解
// import loading from '@/components/common/loading';
import lchTimeline from './components/timeItem/main';

export const utilsComponent = {
  /**
   *
   * @param { Vue } Vue
   * @param {*} options
   */
  install(Vue, options) {
    Vue.component('lchTimeline', lchTimeline);
  },
};
