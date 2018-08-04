/**
 * 日历组件相关的数据模块
 * @namespace
 */
export namespace Calender {

  /**
   * 每周的日历列表
   * @class
   */
  export class WeekCalender {

    /**
     * 总共有多少周的日期集合
     */
    WeekDayList: Array<{
      
      /**
       * 当前日期，格式为：yyyy-MM-dd，主要记录每一个slide块的第一个日期
       */
      currentMonthDate: string;

      /**
       * 每一天的日历数据列表
       */
      dayList: Array<DayModel>;

    }> = [];
  }

  /**
   * 每天显示的状态设置
   * @class
   */
  export class DayStatus {

    /**
     * 当前日期,格式yyyy-MM-dd
     */
    currentDate: string;

    /**
     * 每天日期的描述
     */
    dayDesc: string;

    /**
     * 类名称
     */
    dayClass: string;

    /**
     * 是否可以点击，true表示可以点击
     */
    enabled: boolean;

    /**
     * 是否日历上默认显示，true表示默认显示
     */
    default: boolean;
  }


  /**
   * 日历可选项配置实体
   * @class
   */
  export class CalenderOptions {

    /**
     * 日历标题
     */
    showHeader: boolean = false;

    /**
     * 日历开始时间
     */
    beginDate: string | Date;

    /**
     * 日历结束时间
     */
    endDate: string | Date;

    /**
     * 当前默认显示的日期，默认显示的那天
     */
    currentDate: string | Date;

    [key: string]: any;
  }

  /**
   * 天 数据实体
   * @class
   */
  export class DayModel {

    /**
     * 当前日期,格式yyyy-MM-dd
     */
    currentDate: string;

    /**
     * 每天日期，比如：1,2,3
     */
    day: number;

    /**
     * 每天的描述，默认跟day相同
     */
    dayDesc: string;

    /**
     * 记录原始描述，用于重置状态
     */
    oriDayDesc: string;

    /**
     * 默认css样式
     */
    dayClass: string = "day";

    /**
     * 默认css样式
     */
    oriDayClass: string = "day";

    /**
     * 每天日历是否可用(点击)
     */
    enabled: boolean = true;
  }
}