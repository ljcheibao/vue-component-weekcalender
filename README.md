### vue 日历(以周为单位)组件

typescript+vue开发的日历组件，使用swiper库来支持日历滑动功能，简单易用

[![npm](https://img.shields.io/npm/l/vue-component-weekcalender.svg)](LICENSE)
[![NPM Version](https://img.shields.io/npm/v/vue-component-weekcalender.svg)](https://www.npmjs.com/package/vue-component-weekcalender)
[![npm](https://img.shields.io/npm/dt/vue-component-weekcalender.svg)](https://www.npmjs.com/package/vue-component-weekcalender)

#### 代码示例

![image](https://raw.githubusercontent.com/ljcheibao/vue-component-weekcalender/master/images/one.png)
![image](https://raw.githubusercontent.com/ljcheibao/vue-component-weekcalender/master/images/two.png)

- 安装组件包
  ```
    npm install vue-component-weekcalender --save-dev
  ```

- js代码(**没有自定义(reset=false的情况)日期状态的实例**)

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

  ​

- 自定义日期每天状态的实例(**reset=true的情况**)

  ```js
  import "./index.less";
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
          beginDate: "2018-07-01",
          endDate: "2018-09-16",
          currentDate: "2018-08-04"
        },
        reset: true,
        dayStatus: [{
          currentDate: "2018-08-13",
          dayClass: "day enabled",
          enabled: true,
          default: true
        }, {
          currentDate: "2018-08-14",
          dayClass: "day enabled",
          enabled: true,
          default: false
        }]
      }
    },
    methods: {

      changeStatus:function() {
        this.dayStatus= [{
          currentDate: "2018-08-04",
          dayClass: "day enabled",
          enabled: true,
          default: true
        }, {
          currentDate: "2018-08-14",
          dayClass: "day enabled",
          enabled: true,
          default: false
        }]
      },
      
      chooseDayItemHandle: function (dayItem) {
        console.log(dayItem)
      },

      slideChangeHandle: function (item) {
        console.log(item);
      }
    }
  });
  ```

- html模板

  ```html
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>

  <body style="margin:0;">
    <div id="app">
      <button @click="changeStatus">修改状态</button>
      <vue-weekcalender 
       @on-slide="slideChangeHandle"
       @on-click="chooseDayItemHandle"
       :option="options"
       :reset="reset"
       :status= "dayStatus">
      </vue-weekcalender>
    </div>
    <script src="https://cdn.bootcss.com/vue/2.5.16/vue.min.js"></script>
    <script src="./dist/index.js"></script>
  </body>

  </html>
  ```

  ​

### 组件API

- calender props

| 属性     | 说明                                       | 类型            | 默认值   |
| ------ | ---------------------------------------- | ------------- | ----- |
| option | option对象提供4个属性值：<br><br>showHeader(是否显示标题)，<br>beginDate(开始时间：yyyy-MM-dd格式)，<br>endDate(结束时间：yyyy-MM-dd格式)，<br>currentDate(当前时间：yyyy-MM-dd格式) | object        | 空对象   |
| reset  | 是否需要重置初始化生成的日历的每天日期，默认值为false，<br>该值设置为true以后，使用者可设置status属性，来自定义修改生成的日历每天日期状态，原来日历中每一项均不可点，即每一项的<br>enabled属性会被重置为false | boolean       | false |
| status | 需要自定义的日期状态数组(reset属性为true有效)，<br>数组的每一项是个object对象，对象提供一下几个属性：<br>currentDate：当前日期格式yyyy-MM-dd<br>dayClass：当前日期显示的样式名称<br>enabled：boolean类型，是否可用(可以点击)<br>default：boolean类型，是否是默认选中的一天，true为默认选中的一天，<br>需要注意的是，status的数组对象中，仅有一项default的值为true(有多个日期为选中状态，不符合实际需求吧) | Array<object> | []    |


- calender  events

| 方法名称     | 说明       | 参数                                       |
| -------- | -------- | ---------------------------------------- |
| on-click | 日历上某一天触发 | 当前日期对象，对象有以下属性：<br><br>currentDate：选中的日期，格式：yyyy-MM-dd，<br>dayClass：类名称，<br>dayDesc/day：几号，如：2，<br>enabled：是否可以点击，true表示可以点击 |
| on-slide | 左右滑动日历触发 | 返回滑动到的下一个日历的第一天日期，格式：yyyy-MM-dd格式        |



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

 ### 备注
 **相互学习共同提高，欢迎使用并且issue**
