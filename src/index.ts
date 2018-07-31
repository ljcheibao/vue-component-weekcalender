import "./index.less";
import "./base.js";
const Utils = require("heibao-utils");
//const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
import {
  Component,
  Emit,
  Prop,
  Vue
} from 'vue-property-decorator';
import { Calender } from "./CalenderModel";
//@ts-ignore
//Vue.use(VueAwesomeSwiper);
import { swiper, swiperSlide } from 'vue-awesome-swiper';

@Component({
  template: require("./index.html"),
  components: {
    swiper,
    swiperSlide
  }
})

/**
 * 周日历组件
 * @class
 * @extends {Vue}
 */
export default class CalendarWeek extends Vue {

  dateDescription: string = "";

  /**
   * 设置每月对应的天数
   */
  private monthDays: object = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  };

  /**
   * 天的swiper对象
   */
  daySwiper: any;

  /**
   * 天 swiper options
   */
  private daySwiperOption: any = {
    notNextTick: true,
    loop: false,
    slidesPerView: 1,
    initialSlide: 1,
    observer: true,
    observeParents: true,
    fade: {
      crossFade: true,
    }
  }

  //swiper的slide切换记录的索引
  daySwiperIndex: number = 1;

  //swiper的slide切换的临时日期
  daySwiperTempDate: string;

  //日历组件可选项
  @Prop()
  private option: Calender.CalenderOptions;

  //配置项的copy副本
  private tempOption: Calender.CalenderOptions = new Calender.CalenderOptions();

  //日历组件配置项数据
  private calenderOption: Calender.CalenderOptions = new Calender.CalenderOptions();

  /**
   * 计算属性，计算option的变化
   * @return {string} 返回空字符串
   */
  get calendarOptionComputed(): string {
    if (this.tempOption.beginDate != this.option.beginDate
      || this.tempOption.endDate != this.option.endDate
      || this.tempOption.currentDate != this.option.currentDate) {
      this.tempOption = Object.assign({}, this.option);

      this.calenderOption = Object.assign({}, this.option);
      this.calenderOption.showHeader = this.option.showHeader;
      this.calenderOption.beginDate = Utils.createCorrectDate(this.option.beginDate);
      this.calenderOption.endDate = Utils.createCorrectDate(this.option.endDate);
      this.calenderOption.currentDate = Utils.createCorrectDate(this.option.currentDate);
      this.initialWeekCalenderOptions(this.calenderOption);
    }

    return "";
  }

  /**
   * 多少个月日历
   */
  private weekCalender: Calender.WeekCalender = new Calender.WeekCalender();


  /**
   * 用于记录日历月份的数据，判断到底是否应该生成新的日历
   */
  private daySwiperIncludes: Array<string> = [];

  /**
   * 初始化周日历组件相关配置数据
   * @param {Calender.CalenderOptions} initCalenderData 初始化周日历组件的数据
   * @return {void} 无返回值
   */
  initialWeekCalenderOptions(initCalenderData: Calender.CalenderOptions): void {
    //重置原来渲染的所有数据
    this.daySwiperIncludes = new Array<string>();
    //清空原来的日历数据
    this.weekCalender.WeekDayList.length = 0;
    this.daySwiperTempDate = "";
    this.daySwiperIndex = 1;
    //重置daySwiper的索引
    if (this.daySwiper) {
      this.daySwiper.activeIndex = 1;
      this.daySwiper.realIndex = 1;
    }
    this.initCalender(initCalenderData);
  }

  /**
   * 渲染日历视图
   * @param {Date} date 日期对象
   * @param {boolean} isRight 是否往右边增加一个月份的日历，true为往右边增加，false为往左边增加，默认为true
   * @return {void} 无返回值
   */
  private renderCalenderView(date: Date, isRight: boolean = true): void {
    let dayList: Array<Calender.DayModel> = [];
    //当前是周几
    let weekDay = date.getDay();
    //从周日到今天相差几天
    let diffBeginDay: number = weekDay - 0;
    let beginDate: Date = Utils.copyDate(date);
    beginDate.setDate(beginDate.getDate() - diffBeginDay);
    this.daySwiperIncludes.push(Utils.dateFormat("yyyy-MM-dd", beginDate));
    //当前日期
    let today: string = Utils.dateFormat("yyyy-MM-dd", new Date());
    let defaultDay: string = Utils.dateFormat("yyyy-MM-dd", this.calenderOption.currentDate);
    for (let i = 0; i <= 6; i++) {
      let tempDate1: Date = Utils.copyDate(beginDate);
      tempDate1.setDate(tempDate1.getDate() + i);
      //判断是否已经超过最大日期，如果已经超过最大日期，则生成空的元素
      if (tempDate1 <= this.calenderOption.endDate && this.calenderOption.beginDate <= tempDate1) {
        let dayModel: Calender.DayModel = new Calender.DayModel();
        dayModel.currentDate = Utils.dateFormat("yyyy-MM-dd", tempDate1);
        dayModel.day = tempDate1.getDate();
        dayModel.dayDesc = tempDate1.getDate().toString();
        dayModel.oriDayDesc = dayModel.dayDesc;
        if (today == dayModel.currentDate && today == defaultDay) {
          dayModel.dayDesc = "今";
          dayModel.oriDayDesc = dayModel.dayDesc;
          dayModel.dayClass = "day current";
          dayModel.oriDayClass = "day";
          this.chooseDayItemHandle(dayModel, null);
        } else if (defaultDay == dayModel.currentDate) {
          dayModel.dayClass = "day current";
          this.chooseDayItemHandle(dayModel, null);
        }
        dayList.push(dayModel);
      } else {
        let dayModel: Calender.DayModel = new Calender.DayModel();
        dayList.push(dayModel);
      }
    }
    if (isRight)
      this.weekCalender.WeekDayList.push({ dayList: dayList });
    else {
      this.weekCalender.WeekDayList.unshift({ dayList: dayList });
    }
  }

  /**
   * 初始化日历视图数据 初始化渲染三周的日历，当前周，上一个周，下一个周
   * - 1、默认以currentDate为当前周
   * @param  {Calender.CalenderOptions} calenderOption 日历初始化选项
   * @return {void} 无返回值
   */
  initCalender(calendarOption: Calender.CalenderOptions): void {
    //默认时间
    let currentDate: Date = Utils.copyDate(calendarOption.currentDate);
    //渲染上一周
    let tempDate: Date = Utils.copyDate(calendarOption.currentDate);
    tempDate.setDate(tempDate.getDate() - 7);
    if (tempDate >= calendarOption.beginDate) {
      this.renderCalenderView(tempDate);
    } else {
      //重置daySwiper的索引
      if (this.daySwiper) {
        this.daySwiper.activeIndex = 0;
        this.daySwiper.realIndex = 0;
        this.daySwiperIndex = 0;
      }
    }

    //渲染当前周
    this.renderCalenderView(currentDate);

    //渲染下一周
    tempDate = Utils.copyDate(calendarOption.currentDate);
    tempDate.setDate(tempDate.getDate() + 7);
    if (tempDate <= calendarOption.endDate)
      this.renderCalenderView(tempDate);
  }

  /**
   * 初始化视图相关事件
   * @return {void} 无返回值
   */
  mounted(): void {
    let _this = this;
    //@ts-ignore
    this.daySwiper = this.$refs.daySwiper.swiper;
    this.daySwiper.on("slideChangeTransitionEnd", function () {
      let date: string = this.slides.eq(this.activeIndex).find("div").attr("data-date");
      if (_this.daySwiperTempDate == date) {
        return;
      }
      _this.daySwiperTempDate = date;
      //需要判断是否是最后一个slider模块
      if (this.activeIndex >= _this.daySwiperIndex) {
        _this.slideNextTransitionEnd(this);
        _this.daySwiperIndex += 1;
      } else {
        _this.slidePrevTransitionEnd(this);
        _this.daySwiperIndex -= 1;
      }
    });

    //默认时间
    let currentDate: Date = Utils.copyDate(this.calenderOption.currentDate);
    //渲染上一周
    let tempDate: Date = Utils.copyDate(this.calenderOption.currentDate);
    tempDate.setDate(tempDate.getDate() - 7);
    if (tempDate < this.calenderOption.beginDate) {
      this.daySwiper.activeIndex = 0;
      this.daySwiper.realIndex = 0;
      this.daySwiperIndex = 0;
    }
  }

  /**
   * 向左边滑动
   * @param {swiper} daySwiper 
   * @return {void} 无返回值
   */
  slidePrevTransitionEnd(daySwiper): void {
    const _this = this;
    let currentMonthDateStr: string = daySwiper.slides.eq(daySwiper.activeIndex).find("div").attr("data-date");
    let chooseDate: Date = null;
    for (let item of _this.weekCalender.WeekDayList) {
      for (let item1 of item.dayList) {
        if (!item1.dayDesc) continue;
        if (item1.dayClass.indexOf("current") > -1) {//取出选中的一天
          chooseDate = Utils.createCorrectDate(item1.currentDate);
        }
        item1.dayDesc = item1.oriDayDesc;
        item1.dayClass = item1.oriDayClass;
      }
    }
    /*******************提前渲染上一周的日历 begin*****************/
    let currentDate: Date = Utils.createCorrectDate(currentMonthDateStr);
    let beginDate: Date = <Date>_this.calenderOption.beginDate;
    if (currentDate > beginDate) {
      currentDate.setDate(currentDate.getDate() - 7);
      let dateStr = Utils.dateFormat("yyyy-MM-dd", currentDate);
      if (!_this.daySwiperIncludes.includes(dateStr)) {
        _this.renderCalenderView(currentDate, false);
        _this.daySwiperIncludes.push(dateStr);

        daySwiper.activeIndex = daySwiper.activeIndex + 1;
        daySwiper.realIndex = daySwiper.realIndex + 1;
        _this.daySwiperIndex += 1;
      }
    }
    _this.swipeWeekCalenderSlideHandle(currentMonthDateStr, true);
    /*******************提前渲染上一周的日历 end*****************/

    //如果是最前一周，则显示最前一周第一天
    //否则，原来选的是周几，则显示周几
    chooseDate.setDate(chooseDate.getDate() - 7);
    let chooseDay: string = null;
    for (let item of _this.weekCalender.WeekDayList) {
      for (let item1 of item.dayList) {
        if (!item1.dayDesc) continue;
        if (chooseDate >= beginDate) {
          chooseDay = Utils.dateFormat("yyyy-MM-dd", chooseDate);
        } else {
          chooseDay = Utils.dateFormat("yyyy-MM-dd", beginDate);
        }
        if (item1.currentDate != chooseDay) continue;

        item1.dayClass = "day current";
        _this.chooseDayItemHandle(item1, null);
        break;
      }
    }
  }

  /**
   * 向右边滑动
   * @param {swiper} daySwiper 
   * @return {void} 无返回值
   */
  slideNextTransitionEnd(daySwiper): void {
    const _this = this;
    let currentMonthDateStr: string = daySwiper.slides.eq(daySwiper.activeIndex).find("div").attr("data-date");
    let chooseDate: Date = null;
    for (let item of _this.weekCalender.WeekDayList) {
      for (let item1 of item.dayList) {
        if (!item1.dayDesc) continue;
        if (item1.dayClass.indexOf("current") > -1) {//取出选中的一天
          chooseDate = Utils.createCorrectDate(item1.currentDate);
        }
        item1.dayDesc = item1.oriDayDesc;
        item1.dayClass = item1.oriDayClass;
      }
    }
    /*******************提前渲染下一周的日历 begin*****************/
    let currentDate: Date = Utils.createCorrectDate(currentMonthDateStr);
    let endDate: Date = <Date>_this.calenderOption.endDate;
    currentDate.setDate(currentDate.getDate() + 7);
    if (currentDate < endDate) {
      let dateStr = Utils.dateFormat("yyyy-MM-dd", currentDate);
      if (!_this.daySwiperIncludes.includes(dateStr)) {
        _this.renderCalenderView(currentDate);
        _this.daySwiperIncludes.push(dateStr);
      }
    }

    _this.swipeWeekCalenderSlideHandle(currentMonthDateStr, true);
    /*******************提前渲染下一周的日历 end*****************/

    //默认显示的日期，如果是最后一周，则显示最后一周的最后一天，
    //否则，原来选的是周几，则显示周几
    chooseDate.setDate(chooseDate.getDate() + 7);
    let chooseDay: string = null;
    for (let item of _this.weekCalender.WeekDayList) {
      for (let item1 of item.dayList) {
        if (!item1.dayDesc) continue;
        if (chooseDate <= endDate) {
          chooseDay = Utils.dateFormat("yyyy-MM-dd", chooseDate);
        } else {
          chooseDay = Utils.dateFormat("yyyy-MM-dd", endDate);
        }
        if (item1.currentDate != chooseDay) continue;

        item1.dayClass = "day current";
        _this.chooseDayItemHandle(item1, null);
        break;
      }
    }
  }

  /**
   * 日历组件滑动的时候通知事件，让组件调用者重置日历状态
   * @param {string} date 日期
   * @param {boolean} isNext 是否渲染下下周日期，默认为true，false为渲染上上周日期
   * @return {void} 无返回值
   */
  @Emit("on-slide")
  swipeWeekCalenderSlideHandle(date: string, isNext: boolean = true): void {

  }

  /**
   * 选择具体的日期
   * @param {object} dayItem 当前月份，精确到天：2018-01-01
   * @param {event} event 点击事件
   * @return {void} 无返回值
   */
  @Emit("on-click")
  private chooseDayItemHandle(dayItem: any, event: Event = null): void {
    this.dateDescription = dayItem.currentDate;
    if (!dayItem.currentDate || !dayItem.enabled) return;
    let _this = this;
    //把选中的时间日期赋值给calenderChoosedModel，发送给外部调用者
    for (let item of this.weekCalender.WeekDayList) {
      for (let item1 of item.dayList) {
        if (!item1.dayDesc || !item1.enabled) continue;
        if (item1.currentDate == dayItem.currentDate) {//当前日期，则变更状态
          item1.dayClass = "day current";
          if (item1.oriDayClass) item1.dayClass = `day current ${item1.oriDayClass}`;
        } else {//不是当前日期，则重置状态
          item1.dayDesc = item1.oriDayDesc;
          item1.dayClass = item1.oriDayClass;
        }
      }
    }
  }
}