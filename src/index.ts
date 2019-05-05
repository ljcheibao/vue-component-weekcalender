import "./index.less";
import "./base.js";
const Utils = require("heibao-utils");
//const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
import {
  Component,
  Emit,
  Prop,
  Vue,
  Watch
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
 * 日历的生成标准是以默认选中的currentDate为基准
 * 生成当前currentDate所在的一周数据、上一周数组、下一周数据
 * @class
 * @extends {Vue}
 */
export default class CalendarWeek extends Vue {

  private slideToFlag: boolean = false;

  //滑动的时候记录原来选中的日期
  private swiperChooseDate: Date;

  //日期描述
  private dateDescription: string = "";

  /**
   * 设置每月对应的天数
   
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
  };*/

  /**
   * swiper对象
   */
  private daySwiper: any;

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
  private daySwiperIndex: number = 1;

  //swiper的slide切换的临时日期
  private daySwiperTempDate: string;

  //临时存放每天的记录标识
  private tempDayStatus: any = {};

  //配置项的copy副本
  private tempOption: Calender.CalenderOptions = new Calender.CalenderOptions();

  //日历组件配置项数据
  private calenderOption: Calender.CalenderOptions = new Calender.CalenderOptions();

  //每天的状态数据记录
  private dayStatus: Array<Calender.DayStatus> = [];

  /**
   * 多少周
   */
  private weekCalender: Calender.WeekCalender = new Calender.WeekCalender();

  /**
   * 用于记录每周数据，判断到底是否应该生成新的日历
   */
  private daySwiperIncludes: Array<string> = [];

  //日历组件可选项
  @Prop()
  option: Calender.CalenderOptions;

  //修改每天日期的状态，
  @Prop()
  status: Array<Calender.DayStatus>;

  //记录watch的每天日期的reset情况
  watchDayStatusData: any = {
    items: null
  };

  //重置每天日期的相关状态，比如：enabled状态
  @Prop()
  reset: boolean;

  /**
   * 计算属性，计算option的变化
   * @return {string} 返回空字符串
   */
  get calendarOptionComputed(): string {
    if ((this.tempOption.currentDate || this.tempOption.beginDate
      || this.tempOption.endDate) && this.reset) return "";

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
   * 计算属性，监听status的变化
   * @return {string} 返回空字符串
   */
  get calenderDayStatusComputed(): string {
    if (!this.reset) return "";
    this.watchDayStatusData.items = [];
    for (let item of this.status) {
      this.watchDayStatusData.items.push(Object.assign({}, item));
    }
    return "";
  }


  /**
   * 监听每天日期的状态数据变动
   * @param {any} newVal 新值
   * @param {any} oldVal 旧值
   * @return {void} 无返回值
   */
  @Watch("watchDayStatusData", { deep: true })
  watchDayStatusChange(newVal, oldVal): void {
    if (!this.reset) return;
    //重置每天日期状态
    let dayStatus = [];
    for (let item of newVal.items) {
      dayStatus.push(Object.assign({}, item));
    }
    this.dayStatus = dayStatus;
    this.resetDayStatusDataHandle(dayStatus);
  }

  /**
   * 重置每天的日期状态
   * @param {Array<Calender.DayStatus>} status 需要重置状态的日期数组
   * @param {boolean} swiper 是否是swiper滑动触发，swiper滑动触发不需要重新计算slide的索引activeIndex 
   */
  resetDayStatus(status: Array<Calender.DayStatus>, swiper: boolean = false): void {
    //@ts-ignore
    let dayStatus: Array<Calender.DayStatus> = status;
    //重置每天状态
    let today = Utils.dateFormat("yyyy-MM-dd", new Date());
    let breakCycleFlag: boolean = false;
    //假如要重置的reset没有，则要把原来的currentDate的状态重置
    //比如：原来默认当前日期是 “今”，是默认选中的，当reset没有的时候
    //需要把当前日期状态重置
    if (!dayStatus || dayStatus.length <= 0) {
      for (let item of this.weekCalender.WeekDayList) {
        for (let item1 of item.dayList) {
          if (item1.currentDate == today) {
            item1.dayDesc = Utils.dateFormat("d", new Date());
            item1.dayClass = "day";
            breakCycleFlag = true;
            break;
          }
        }
        if (breakCycleFlag) break;
      }
      return;
    }

    //获取重置的日期默认选中的那一天，重新更新currentDate
    let isDayExistSlide: boolean = false;
    let currentDate: string = "";
    for (let item of dayStatus) {
      if (item.default) {
        currentDate = item.currentDate;
        this.calenderOption.currentDate = Utils.createCorrectDate(item.currentDate);
        this.tempOption.currentDate = item.currentDate;
        break;
      }
    }

    //重置每天的状态
    for (let item1 of this.weekCalender.WeekDayList) {
      for (let item2 of item1.dayList) {
        if (!item2.dayDesc) continue;
        item2.dayClass = "day";
        item2.dayDesc = item2.oriDayDesc;
        item2.enabled = false;
      }
    }

    for (let item of dayStatus) {
      for (let item1 of this.weekCalender.WeekDayList) {
        for (let item2 of item1.dayList) {
          if (!item2.dayDesc) continue;

          if (item.default) {//存在默认的天数，则reset每天的状态
            if (item2.dayClass == "day current") {
              item2.dayClass = "day";
              if (item2.currentDate == today) {
                item2.dayDesc = Utils.dateFormat("d", new Date());
                item2.oriDayDesc = item2.dayDesc;
              }
            }
          }

          if (item2.currentDate != item.currentDate) continue;

          item2.dayDesc = item.dayDesc || item2.dayDesc;
          item2.oriDayDesc = item.dayDesc || item2.dayDesc;
          item2.dayClass = item.dayClass;
          item2.oriDayClass = item.dayClass;
          item2.enabled = item.enabled;
          if (item.default) { //如果当天是默认选中的话
            if (item.currentDate == today) {
              item2.dayDesc = "今";
              item2.oriDayDesc = item2.dayDesc;
              item2.dayClass = "day current";
            } else {
              item2.dayClass = "day current";
            }
            this.chooseDayItemHandle(item2, null);
          }
        }
      }
    }
    //假如是滑动日历的话，则不需要重新计算slide的索引activeIndex
    //todo:计算slide的索引需要重新计算
    if (currentDate && !swiper) {
      let index = 0;
      let breakCycleFlag: boolean = false;
      for (let item of this.weekCalender.WeekDayList) {
        index++;
        for (let item1 of item.dayList) {
          if (item1.currentDate == currentDate) {
            breakCycleFlag = true;
            break;
          }
        }
        if (breakCycleFlag) break;
      }
      console.log(this.daySwiper.activeIndex + " this  activeIndex ==== " + index);
      if (this.daySwiper.activeIndex == index - 1) {
        console.log(" this is no auto swiper =============");
        return;
      }
      if (this.daySwiper.activeIndex == 0) {
        this.daySwiper.slideTo(index - 1, 300);
        this.daySwiper.activeIndex = index - 1;
        this.daySwiper.realIndex = index - 1;
      } else {
        this.daySwiper.slideTo(index - 1, 300);
      }

      this.slideToFlag = true;
    }
  }

  /**
   * 处理需要重置日期状态的数据，假如需要重置的日期不在已经生成的slide里面，重新
   * 以默认选中的那一天为基准，重新生成日历
   * @param {Array<Calender.DayStatus>} dayStatus 要重置的状态
   * @return {void} 无返回值
   */
  resetDayStatusDataHandle(status: Array<Calender.DayStatus>): void {
    //@ts-ignore
    let dayStatus: Array<Calender.DayStatus> = status;

    //判断要重置的数据是否在生成的日历当中，假如要重置的状态不在已经生成的日期当中，
    //则以当前重置的默认选中日期为当前日期，重新渲染日历组件
    let currentDate: string = "";
    for (let item of dayStatus) {
      if (item.default) {
        currentDate = item.currentDate;
        this.calenderOption.currentDate = Utils.createCorrectDate(item.currentDate);
        this.tempOption.currentDate = item.currentDate;
        break;
      }
    }
    //要重置的日期最大的一天不在生成的slide块里面，则按照
    //当前的重置的currentDate为基准，重新生成日历的slide块
    if (!this.tempDayStatus[currentDate]) {
      //重新生成日历
      this.initialWeekCalenderOptions(Object.assign({}, this.calenderOption));
    }
    //this.initialWeekCalenderOptions(Object.assign({}, this.calenderOption));
    this.resetDayStatus(dayStatus);
  }

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
    this.tempDayStatus = {};
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
        //临时存放每天的记录标识
        this.tempDayStatus[dayModel.currentDate] = 1;
        dayModel.day = tempDate1.getDate();
        dayModel.dayDesc = tempDate1.getDate().toString();
        dayModel.oriDayDesc = dayModel.dayDesc;
        //若设置了reset重置每天状态，则禁止enabled，让调用者通过设置status状态来设定可点击的日期
        dayModel.enabled = this.reset ? false : true;
        dayModel.oriEnabled = dayModel.enabled;
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
      this.weekCalender.WeekDayList.push({
        currentMonthDate: Utils.dateFormat("yyyy-MM-dd", beginDate),
        dayList: dayList
      });
    else {
      this.weekCalender.WeekDayList.unshift({
        currentMonthDate: Utils.dateFormat("yyyy-MM-dd", beginDate),
        dayList: dayList
      });
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
      let date: string = this.slides.eq(this.activeIndex).attr("data-date");
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
    let currentMonthDateStr: string = daySwiper.slides.eq(daySwiper.activeIndex).attr("data-date");
    let chooseDate: Date = null;
    let chooseDayItem: Calender.DayModel = null;
    let breakCycleFlag: boolean = false;
    if (!_this.reset) {
      for (let item of _this.weekCalender.WeekDayList) {
        for (let item1 of item.dayList) {
          if (!item1.dayDesc) continue;
          if (item1.dayClass.indexOf("current") > -1) {//取出选中的一天
            chooseDate = Utils.createCorrectDate(item1.currentDate);
            chooseDayItem = Object.assign({}, item1);
            breakCycleFlag = true;
            break;
          }
          // if (!_this.reset) {
          //   item1.dayDesc = item1.oriDayDesc;
          //   item1.dayClass = item1.oriDayClass;
          // }
        }
        if (breakCycleFlag) break;
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
    if (Utils.createCorrectDate(currentMonthDateStr) >= beginDate) {
      _this.dateDescription = currentMonthDateStr;
    } else {
      _this.dateDescription = Utils.dateFormat("yyyy-MM-dd", beginDate);
    }
    _this.swipeWeekCalenderSlideHandle(currentMonthDateStr, true);
    /*******************提前渲染上一周的日历 end*****************/

    if (!_this.reset) {//没有定义每天日期的状态的话，按照组件默认操作走
      //如果是最前一周，则显示最前一周第一天
      //否则，原来选的是周几，则显示周几
      chooseDate.setDate(chooseDate.getDate() - 7);
      let chooseDay: string = null;
      let breakCycleFlag: boolean = false;
      for (let item of _this.weekCalender.WeekDayList) {
        for (let item1 of item.dayList) {
          if (!item1.dayDesc) continue;
          if (chooseDate >= beginDate) {
            chooseDay = Utils.dateFormat("yyyy-MM-dd", chooseDate);
          } else {
            chooseDay = Utils.dateFormat("yyyy-MM-dd", beginDate);
          }
          if (item1.currentDate != chooseDay) continue;
          breakCycleFlag = true;
          item1.dayClass = "day current";
          _this.chooseDayItemHandle(item1, null);
          break;
        }
        if (breakCycleFlag) break;
      }
    } else {//判断原来选中的日期是否处于当前slide块内，如果处于的话，触发click操作
      let includes: any = {};
      let tempBegin: Date = Utils.createCorrectDate(currentMonthDateStr);
      includes[Utils.dateFormat("yyyy-MM-dd", tempBegin)] = 1;
      for (let i = 1; i <= 6; i++) {
        tempBegin.setDate(tempBegin.getDate() + 1);
        includes[Utils.dateFormat("yyyy-MM-dd", tempBegin)] = 1;
      }
      let isExistDay: boolean = false;
      //todo:reset状态的滑动，需要根据dayStatus自行处理currentDate
      for (let item of _this.dayStatus) {
        if (includes.hasOwnProperty(item.currentDate) && !isExistDay) {
          item.default = true;
          isExistDay = true;
          //break;
        } else {
          //if (!_this.slideToFlag) {
          //_this.slideToFlag = false;
          item.default = false;
          //}
        }
      }
      if (isExistDay) {
        if (!_this.slideToFlag) {//没有自动滑动
          _this.resetDayStatus(_this.dayStatus, true);
        } else {//自动滑动
          _this.slideToFlag = false;
        }
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
    let chooseDayItem: Calender.DayModel = null;
    let breakCycleFlag: boolean = false;
    if (!_this.reset) {
      for (let item of _this.weekCalender.WeekDayList) {
        for (let item1 of item.dayList) {
          if (!item1.dayDesc) continue;
          if (item1.dayClass.indexOf("current") > -1) {//取出选中的一天
            chooseDate = Utils.createCorrectDate(item1.currentDate);
            chooseDayItem = Object.assign({}, item1);
            breakCycleFlag = true;
            break;
          }
          // if (!_this.reset) {
          //   item1.dayDesc = item1.oriDayDesc;
          //   item1.dayClass = item1.oriDayClass;
          // }
        }
        if (breakCycleFlag) break;
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
    if (Utils.createCorrectDate(currentMonthDateStr) <= endDate) {
      _this.dateDescription = currentMonthDateStr;
    } else {
      _this.dateDescription = Utils.dateFormat("yyyy-MM-dd", endDate);
    }
    _this.swipeWeekCalenderSlideHandle(currentMonthDateStr, true);
    /*******************提前渲染下一周的日历 end*****************/

    if (!_this.reset) {//没有定义每天日期的状态的话，按照组件默认操作走
      //默认显示的日期，如果是最后一周，则显示最后一周的最后一天，
      //否则，原来选的是周几，则显示周几
      chooseDate.setDate(chooseDate.getDate() + 7);
      let chooseDay: string = null;
      let breakCycleFlag: boolean = false;
      for (let item of _this.weekCalender.WeekDayList) {
        for (let item1 of item.dayList) {
          if (!item1.dayDesc) continue;
          if (chooseDate <= endDate) {
            chooseDay = Utils.dateFormat("yyyy-MM-dd", chooseDate);
          } else {
            chooseDay = Utils.dateFormat("yyyy-MM-dd", endDate);
          }
          if (item1.currentDate != chooseDay) continue;
          breakCycleFlag = true;
          item1.dayClass = "day current";
          _this.chooseDayItemHandle(item1, null);
          break;
        }
        if (breakCycleFlag) break;
      }
    } else {//判断原来选中的日期是否处于当前slide块内，如果处于的话，触发click操作

      let includes: any = {};

      let tempBegin: Date = Utils.createCorrectDate(currentMonthDateStr);
      includes[Utils.dateFormat("yyyy-MM-dd", tempBegin)] = 1;
      for (let i = 1; i <= 6; i++) {
        tempBegin.setDate(tempBegin.getDate() + 1);
        includes[Utils.dateFormat("yyyy-MM-dd", tempBegin)] = 1;
      }
      let isExistDay: boolean = false;
      //todo:reset状态的滑动，需要根据dayStatus自行处理currentDate
      for (let item of _this.dayStatus) {
        if (includes.hasOwnProperty(item.currentDate) && !isExistDay) {
          item.default = true;
          isExistDay = true;
          //break;
        } else {
          //if (!_this.slideToFlag) {
          //_this.slideToFlag = false;
          item.default = false;
          //}
        }
      }
      if (isExistDay){
        if (!_this.slideToFlag) {//没有自动滑动
          _this.resetDayStatus(_this.dayStatus, true);
        } else {//自动滑动
          _this.slideToFlag = false;
        }
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
  private chooseDayItemHandle(dayItem: any, event: Event = null): void {
    if (!dayItem.currentDate || !dayItem.enabled) return;
    let _this = this;
    this.dateDescription = dayItem.currentDate;
    this.$emit("on-click", dayItem);

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
