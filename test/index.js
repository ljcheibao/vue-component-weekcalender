import Vue from 'vue';
import VueWeekcalender from "../dist/index.js";

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