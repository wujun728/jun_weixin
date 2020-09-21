//calendar
var calendar = require('./calendar.js');
// components/picker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowN:true,//默认是是否显示农历
    minYear:null,//最大最小年月设置
    minMonth: null,
    maxYear: null,
    maxMonth: null,
    isPNList: false,//是否显示日历前后数据

    prevkongList: [],//列表日历前数据
    nextkongList: [],//列表日历后数据
    dateList: [//列表日历数据
    ],
    now_date: {//今日日期 对象
    }, 
    set_date: {//指定日期 对象
    }, 
    first_set_date: {//指定日期所在月1日 对象
    },
    prev_set_date: {//指定日期上一月所在月1日 对象
    },
    next_set_date: {//指定日期下一月所在月1日 对象
    },
    detail:{//点击日期详情
    },
    date: '2016-09-01'//供下拉框用的日期格式 2016-09-01
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /*
     1900-2100区间内的公历、农历互转
     初始化日历
     arg:year 1900 年后的某一年份，代表年份的整数值。为了避免2000年问题最好指定4位数的年份; 使用 1998, 而不要用 98.
     arg:month 0 到 11 之间的一个整数，表示月份（1月）到11（12月）。
     arg:day 1 到 31 之间的一个整数，表示某月当中的第几天。
    */
    init(year, month, day){
      //可用时间检测
      if (!this.testDate(year)){
        return false;
      };
      //设置日期对象
      this.createDate(year, month, day);     
      //生成列表数据
      this.createList();   
      //详情设置
      this.setDetail(this.data.set_date); 
    },
    /*
    获取dateList isFocus的日
    */
    getDateListisFocusDay(){
      var day=null;
      for (var i = 0; i < this.data.dateList.length;i++){
        if (this.data.dateList[i].isFocus){
          day = this.data.dateList[i].cDay;
          break;
        };
      };
      return day;
    },
    /*
    上一年
    */
    prevYear(){
      var year = this.data.set_date.year;
      var month = this.data.set_date.month;
      // 获取dateList isFocus的日
      var day = this.getDateListisFocusDay();

      var monthDays = this.getMonthDays({
        year: year-1,
        month: month,
        day: day
      });
      this.init(year - 1, month, day > monthDays ? monthDays : day);
    },
    /*
    下一年
    */
    nextYear(){
      var year = this.data.set_date.year;
      var month = this.data.set_date.month;
      // 获取dateList isFocus的日
      var day = this.getDateListisFocusDay();

      var monthDays = this.getMonthDays({
        year: year + 1,
        month: month,
        day: day
      });
      this.init(year + 1, month, day > monthDays ? monthDays : day);
    },
    /*
    上一月
    */
    prevMonth(){
      var year = this.data.set_date.year;
      var month = this.data.set_date.month;
      // 获取dateList isFocus的日
      var day = this.getDateListisFocusDay();

      if (month==1){
        var monthDays = this.getMonthDays({
          year: year - 1,
          month: 12,
          day: day
        });
        this.init(year - 1, 12, day > monthDays ? monthDays : day);
      }else{
        var monthDays = this.getMonthDays({
          year: year,
          month: month-1,
          day: day
        });
        this.init(year, month - 1, day > monthDays ? monthDays : day);
      };
    },
    /*
    下一月
    */
    nextMonth(){
      var year = this.data.set_date.year;
      var month = this.data.set_date.month;
      // 获取dateList isFocus的日
      var day = this.getDateListisFocusDay();

      if (month == 12) {
        var monthDays = this.getMonthDays({
          year: year + 1,
          month: 1,
          day: day
        });
        this.init(year + 1, 1, day > monthDays ? monthDays : day);
      } else {
        var monthDays = this.getMonthDays({
          year: year,
          month: month + 1,
          day: day
        });
        this.init(year, month + 1, day > monthDays ? monthDays : day);
      };
    },
    /*
    返回今天
    */
    toNow(){
      this.init();
    },
    /*
    显示农历
    */
    ShowN(){
      var dateList = this.data.dateList;
      for (var i = 0; i < dateList.length; i++) {
        dateList[i].isShowN = true;
      };
      this.setData({
        dateList: dateList,
        isShowN:true
      });

      var prevkongList = this.data.prevkongList;
      for (var i = 0; i < prevkongList.length; i++) {
        prevkongList[i].isShowN = true;
      };
      this.setData({
        prevkongList: prevkongList,
        isShowN: true
      });

      var nextkongList = this.data.nextkongList;
      for (var i = 0; i < nextkongList.length; i++) {
        nextkongList[i].isShowN = true;
      };
      this.setData({
        nextkongList: nextkongList,
        isShowN: true
      });
    },
    /*
    隐藏农历
    */
    hideN(){
      var dateList = this.data.dateList;
      for (var i = 0; i < dateList.length; i++) {
        dateList[i].isShowN = false;
      };
      this.setData({
        dateList: dateList,
        isShowN: false
      });

      var prevkongList = this.data.prevkongList;
      for (var i = 0; i < prevkongList.length; i++) {
        prevkongList[i].isShowN = false;
      };
      this.setData({
        prevkongList: prevkongList,
        isShowN: false
      });

      var nextkongList = this.data.nextkongList;
      for (var i = 0; i < nextkongList.length; i++) {
        nextkongList[i].isShowN = false;
      };
      this.setData({
        nextkongList: nextkongList,
        isShowN: false
      });
    },
    /*
    补全前后空留日期
    */
    ShowPNList(){
      this.setData({
        isPNList: true
      });
    },
    /*
    移除前后空留日期
    */
    hidePNList(){
      this.setData({
        isPNList: false
      });
    },
    /*
    点击快速选择
    */
    bindDateChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        date: e.detail.value
      });
      this.init(Number(e.detail.value.split("-")[0]), Number(e.detail.value.split("-")[1]), Number(e.detail.value.split("-")[2]));
    },
    /*
    1900-2100区间内的公历、农历互转
    可用时间检测
    */
    testDate(year){
      if (!year){
        year = new Date().getFullYear();
      };
      if (year >= 1900 || year <= 2100){
        console.log("在1900-2100区间内")
        return true;
      }else{
        console.log("不在1900-2100区间内")
        return false;
      };
    },
    /*
    事件 点击获取详情
    */
    getFocusDetail(e){
      //e.currentTarget.dataset.cYear
      //e.currentTarget.dataset.cMonth
      //e.currentTarget.dataset.cDay
      //console.log(e.currentTarget.dataset)
      //选中样式设置
      var dateList = this.data.dateList;
      for (var i = 0; i < dateList.length;i++){
        if (i == e.currentTarget.dataset.index){
          dateList[i].isFocus=true;
        }else{
          dateList[i].isFocus = false;
        };
      };
      this.setData({
        dateList: dateList
      });
      //详情设置
      this.setDetail({
        year: e.currentTarget.dataset.year,
        month: e.currentTarget.dataset.month,
        day: e.currentTarget.dataset.day,
      }); 
    },
    /*
    详情设置
    arg:date.year
    arg:date.month
    arg:date.day
    */
    setDetail(date){
      //console.log(date)
      this.setData({
        detail: calendar.solar2lunar(date.year, date.month, date.day)
      });
      //console.log(this.data.detail)
    },
    /*
    显示日历前后数据 点击处理
    */
    prevFocusDetail(e){
      if (this.data.isPNList){
        this.init(e.currentTarget.dataset.year, e.currentTarget.dataset.month, e.currentTarget.dataset.day);
      };
    },
    /*
    显示日历前后数据 点击处理
    */
    nextFocusDetail(e) {
      if (this.data.isPNList) {
        this.init(e.currentTarget.dataset.year, e.currentTarget.dataset.month, e.currentTarget.dataset.day);
      };
    },
    /*
    设置日期对象
    arg:year 
    arg:month
    arg:day
    */
    createDate(year, month, day){
      //今日日期 对象
      var now_date = new Date();
      //指定日期 对象
      var set_date = null;
      if (year) {//指定日期
        set_date = new Date(year, month - 1, day);
      } else {//今天
        set_date = new Date();
      };
      //指定日期所在月1日 对象
      var first_set_date = new Date(set_date.getFullYear(), set_date.getMonth(), 1);
      //指定日期上一月所在月1日 对象
      var prev_set_date = null;
      if (set_date.getMonth()==0){
        prev_set_date = new Date(set_date.getFullYear()-1, 11, 1);
      }else{
        prev_set_date = new Date(set_date.getFullYear(), set_date.getMonth()-1, 1);
      };
      //指定日期下一月所在月1日 对象
      var next_set_date = null;
      if (set_date.getMonth() == 11) {
        next_set_date = new Date(set_date.getFullYear()+1, 0, 1);
      } else {
        next_set_date = new Date(set_date.getFullYear(), set_date.getMonth()+1, 1);
      };      
      //设置到data
      this.setData({
        now_date: {
          year: now_date.getFullYear(),
          month: now_date.getMonth() + 1,
          day: now_date.getDate(),
          weekend: now_date.getDay()
        },
        set_date: {
          year: set_date.getFullYear(),
          month: set_date.getMonth() + 1,
          day: set_date.getDate(),
          weekend: set_date.getDay()
        },
        first_set_date: {
          year: first_set_date.getFullYear(),
          month: first_set_date.getMonth() + 1,
          day: first_set_date.getDate(),
          weekend: first_set_date.getDay()
        },
        prev_set_date: {
          year: prev_set_date.getFullYear(),
          month: prev_set_date.getMonth() + 1,
          day: prev_set_date.getDate(),
          weekend: prev_set_date.getDay()
        },
        next_set_date: {
          year: next_set_date.getFullYear(),
          month: next_set_date.getMonth() + 1,
          day: next_set_date.getDate(),
          weekend: next_set_date.getDay()
        },
      });
      console.log(this.data.first_set_date, this.data.prev_set_date, this.data.next_set_date);
    },
    /*
    生成列表数据
    */
    createList() {     
      //当前月数据
      //console.log(this.data.first_set_date)
      var monthDays = this.getMonthDays(this.data.first_set_date);
       //console.log(monthDays);
      var dateList = [];//实际数据
      for (var i = 1; i <= monthDays; i++) {
        var obj = calendar.solar2lunar(this.data.first_set_date.year, this.data.first_set_date.month, i);
        obj.isShowN = this.data.isShowN;//是否显示农历
        //是否选中
        if (this.data.set_date.day == obj.cDay) {//指定日期 对象
          obj.isFocus = true;
        } else {
          obj.isFocus = false;
        };
        obj.isNow = (this.data.now_date.year == obj.cYear && this.data.now_date.month == obj.cMonth && this.data.now_date.day == obj.cDay) ? true : false;//是否是今日日期
        dateList.push(obj);
      };
      //周几
      //this.data.first_set_date.weekend
      //上一月数据
      var prevkongList = [];//列表日历前数据      
      var monthDaysPrev = this.getMonthDays(this.data.prev_set_date);
      for (var i = monthDaysPrev - this.data.first_set_date.weekend+1; i <= monthDaysPrev; i++) {
        var obj = calendar.solar2lunar(this.data.prev_set_date.year, this.data.prev_set_date.month, i);
        obj.isShowN = this.data.isShowN;//是否显示农历
        prevkongList.push(obj);
      };
      //console.log(prevkongList)
      //下一月数据
      var nextkongList = [];//列表日历后数据  
      var monthDaysNext = this.getMonthDays(this.data.next_set_date);
      for (var i = 1; i <= 7-(dateList.length + prevkongList.length)%7; i++) {
        //console.log(this.data.next_set_date.year, this.data.next_set_date.month, i)
        var obj = calendar.solar2lunar(this.data.next_set_date.year, this.data.next_set_date.month, i);
        obj.isShowN = this.data.isShowN;//是否显示农历
        nextkongList.push(obj);
      };
      //console.log(nextkongList)
      this.setData({        
        dateList: dateList,
        prevkongList: prevkongList,
        nextkongList: nextkongList
      });
    },
    /*
    返回月份对应天数
    一三五七八十腊 31天 二月闰年29 平年28
    arg:date.year
    arg:date.month
    */
    getMonthDays(date){
      if (this.isLeapYear(date.year)) {//闰年
        switch (date.month) {
          case 1: return "31"; break;
          case 2: return "29"; break;   //2月
          case 3: return "31"; break;
          case 4: return "30"; break;
          case 5: return "31"; break;
          case 6: return "30"; break;
          case 7: return "31"; break;
          case 8: return "31"; break;
          case 9: return "30"; break;
          case 10: return "31"; break;
          case 11: return "30"; break;
          case 12: return "31"; break;
          default:
        };
      } else {//平年
        switch (date.month) {
          case 1: return "31"; break;
          case 2: return "28"; break;  //2月
          case 3: return "31"; break;
          case 4: return "30"; break;
          case 5: return "31"; break;
          case 6: return "30"; break;
          case 7: return "31"; break;
          case 8: return "31"; break;
          case 9: return "30"; break;
          case 10: return "31"; break;
          case 11: return "30"; break;
          case 12: return "31"; break;
          default:
        };
      };
    },
    /*
    闰年判断函数
    arg:year
    */
    isLeapYear(year) {
      if ((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)) {
        return true;
      } else {
        return false;
      };
    }

  },
  created: function () {
    
  },
  attached: function () {
    
  },
  ready:function(){
    //初始化日历
    this.init();
  },
  moved: function () {
    
  },
  detached: function () {
   
  }
})
