import "./index.less";
import Vue from 'vue';
import "../src/base.js";
import VueWeekcalender from "../src/index.ts";

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