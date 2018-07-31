### vue 日历(以周为单位)组件

typescript+vue开发的日历组件，使用swiper库来支持日历滑动功能，简单易用

[![npm](https://img.shields.io/npm/l/vue-component-weekcalender.svg)](LICENSE)
[![NPM Version](https://img.shields.io/npm/v/vue-component-weekcalender.svg)](https://www.npmjs.com/package/vue-component-weekcalender)
[![npm](https://img.shields.io/npm/dt/vue-component-weekcalender.svg)](https://www.npmjs.com/package/vue-component-weekcalender)

#### 代码示例

![image](https://github.com/ljcheibao/vue-component-weekcalender/blob/master/images/one.png)
![image](https://github.com/ljcheibao/vue-component-weekcalender/blob/master/images/two.png)

- 安装组件包
  ```
    npm install vue-component-weekcalender --save-dev
  ```

- js代码

  ```js
  import Vue from 'vue';
  import VueWeekcalender from "vue-component-weekcalender";

  new Vue({
  el: '#app',
  components: {
    VueWeekcalender
  },
  data() {
    return {
      options: {
        showHeader: true,
        beginDate: "2018-07-30",
        endDate: "2018-08-12",
        currentDate: "2018-08-03"
      }
    }
  },
  methods: {
    chooseDayItemHandle: function (dayItem) {
      console.log(dayItem)
    },

    slideChangeHandle:function(item) {
      console.log(item);
    }
  }
  });
  ```

- html模板

  ```html
  <div id="app">
    <vue-weekcalender 
     @on-slide="slideChangeHandle"
     @on-click="chooseDayItemHandle"
     :option="options">
    </vue-weekcalender>
  </div>
  <script src="https://cdn.bootcss.com/vue/2.5.16/vue.min.js"></script>
  <script src="./dist/index.js"></script>
  ```

### 组件API

- calender props

| 属性     | 说明                                       | 类型     | 默认值  |
| ------ | ---------------------------------------- | ------ | ---- |
| option | option对象提供4个属性值：<br><br>showHeader(是否显示标题)，<br>beginDate(开始时间：yyyy-MM-dd格式)，<br>endDate(结束时间：yyyy-MM-dd格式)，<br>currentDate(当前时间：yyyy-MM-dd格式) | object | 空对象  |


- calender  events

| 方法名称     | 说明       | 参数                                |
| -------- | -------- | --------------------------------- |
| on-click | 日历上某一天触发 | 当前日期对象，对象有以下属性：<br><br>currentDate：选中的日期，格式：yyyy-MM-dd，<br>dayClass：类名称，<br>dayDesc/day：几号，如：2，<br>enabled：是否可以点击，true表示可以点击                            |
| on-slide | 左右滑动日历触发 | 返回滑动到的下一个日历的第一天日期，格式：yyyy-MM-dd格式 |



### 组件开发说明

- 安装依赖

  ```
  npm/cnpm install
  ```

- 编译

  ```
  npm run build
  ```

- demo运行

  ```
  # cd test
  # npm/cnpm install
  # npm run build

  #把test目录的index.html在浏览器打开，切换到移动的端模拟器，可以预览在手机端的展示结果
  ```

 ###备注
 **相互学习共同提高，欢迎使用并且issue**
