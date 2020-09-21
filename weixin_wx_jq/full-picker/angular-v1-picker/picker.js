var app = angular.module('myApp', []);

app.controller('pickerCtrl', function($scope) {
  /**
 * 初始数据
 */
  $scope.isShowN=true;//默认是是否显示农历
  $scope.minYear=null;//最大最小年月设置
  $scope.minMonth=null;
  $scope.maxYear=null;
  $scope.maxMonth=null;
  $scope.isPNList=false;//是否显示日历前后数据

  $scope.prevkongList=[];//列表日历前数据
  $scope.nextkongList=[];//列表日历后数据
  $scope.dateList=[//列表日历数据
  ];
  $scope.now_date={//今日日期 对象
  };
  $scope.set_date={//指定日期 对象
  }; 
  $scope.first_set_date={//指定日期所在月1日 对象
  };
  $scope.prev_set_date={//指定日期上一月所在月1日 对象
  };
  $scope.next_set_date={//指定日期下一月所在月1日 对象
  };
  $scope.detail={//点击日期详情
  };

  //供下拉框用的日期格式
  $scope.selected_year='2019';
  $scope.selected_year_options=['2016','2017','2018','2019','2020'];
  $scope.selected_month='10';
  $scope.selected_month_options=['0','1','2','3','4','5','6','7','8','9','10','11'];
  $scope.selected_day='5';
  $scope.selected_day_options=['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'];

  /**
 * 方法列表
 */
  /*
   1900-2100区间内的公历、农历互转
   初始化日历
   arg:year 1900 年后的某一年份，代表年份的整数值。为了避免2000年问题最好指定4位数的年份; 使用 1998, 而不要用 98.
   arg:month 0 到 11 之间的一个整数，表示月份（1月）到11（12月）。
   arg:day 1 到 31 之间的一个整数，表示某月当中的第几天。
  */
  $scope.init=function(year, month, day){
    //可用时间检测
    if (!$scope.testDate(year)){
      return false;
    };
    //设置日期对象
    $scope.createDate(year, month, day);     
    //生成列表数据
    $scope.createList();   
    //详情设置
    $scope.setDetail($scope.set_date); 
  };
  /*
  获取dateList isFocus的日
  */
  $scope.getDateListisFocusDay=function(){
    var day=null;
    for (var i = 0; i < $scope.dateList.length;i++){
      if ($scope.dateList[i].isFocus){
        day = $scope.dateList[i].cDay;
        break;
      };
    };
    return day;
  };
  /*
  上一年
  */
  $scope.prevYear=function(){
    var year = $scope.set_date.year;
    var month = $scope.set_date.month;
    // 获取dateList isFocus的日
    var day = $scope.getDateListisFocusDay();

    var monthDays = $scope.getMonthDays({
      year: year-1,
      month: month,
      day: day
    });
    $scope.init(year - 1, month, day > monthDays ? monthDays : day);
  };
  /*
  下一年
  */
  $scope.nextYear=function(){
    var year = $scope.set_date.year;
    var month = $scope.set_date.month;
    // 获取dateList isFocus的日
    var day = $scope.getDateListisFocusDay();

    var monthDays = $scope.getMonthDays({
      year: year + 1,
      month: month,
      day: day
    });
    $scope.init(year + 1, month, day > monthDays ? monthDays : day);
  };
  /*
  上一月
  */
  $scope.prevMonth=function(){
    var year = $scope.set_date.year;
    var month = $scope.set_date.month;
    // 获取dateList isFocus的日
    var day = $scope.getDateListisFocusDay();

    if (month==1){
      var monthDays = $scope.getMonthDays({
        year: year - 1,
        month: 12,
        day: day
      });
      $scope.init(year - 1, 12, day > monthDays ? monthDays : day);
    }else{
      var monthDays = $scope.getMonthDays({
        year: year,
        month: month-1,
        day: day
      });
      $scope.init(year, month - 1, day > monthDays ? monthDays : day);
    };
  };
  /*
  下一月
  */
  $scope.nextMonth=function(){
    var year = $scope.set_date.year;
    var month = $scope.set_date.month;
    // 获取dateList isFocus的日
    var day = $scope.getDateListisFocusDay();

    if (month == 12) {
      var monthDays = $scope.getMonthDays({
        year: year + 1,
        month: 1,
        day: day
      });
      $scope.init(year + 1, 1, day > monthDays ? monthDays : day);
    } else {
      var monthDays = $scope.getMonthDays({
        year: year,
        month: month + 1,
        day: day
      });
      $scope.init(year, month + 1, day > monthDays ? monthDays : day);
    };
  };
  /*
  返回今天
  */
  $scope.toNow=function(){
    $scope.init();
  };
  /*
  显示农历
  */
  $scope.ShowN=function(){
    var dateList = $scope.dateList;
    for (var i = 0; i < dateList.length; i++) {
      dateList[i].isShowN = true;
    };
    $scope.dateList=dateList;
    $scope.isShowN=true;

    var prevkongList = $scope.prevkongList;
    for (var i = 0; i < prevkongList.length; i++) {
      prevkongList[i].isShowN = true;
    };
    $scope.prevkongList=prevkongList;
    $scope.isShowN=true;

    var nextkongList = $scope.nextkongList;
    for (var i = 0; i < nextkongList.length; i++) {
      nextkongList[i].isShowN = true;
    };
    $scope.nextkongList=nextkongList;
    $scope.isShowN=true;
  };
  /*
  隐藏农历
  */
  $scope.hideN=function(){
    var dateList = $scope.dateList;
    for (var i = 0; i < dateList.length; i++) {
      dateList[i].isShowN = false;
    };
    $scope.dateList=dateList;
    $scope.sShowN=false;

    var prevkongList = $scope.prevkongList;
    for (var i = 0; i < prevkongList.length; i++) {
      prevkongList[i].isShowN = false;
    };
    $scope.prevkongList=prevkongList;
    $scope.isShowN=false;

    var nextkongList = $scope.nextkongList;
    for (var i = 0; i < nextkongList.length; i++) {
      nextkongList[i].isShowN = false;
    };
    $scope.nextkongList=nextkongList;
    $scope.isShowN=false;
  };
  /*
  补全前后空留日期
  */
  $scope.ShowPNList=function(){
    $scope.isPNList=true;
  };
  /*
  移除前后空留日期
  */
  $scope.hidePNList=function(){
    $scope.isPNList=false;
  };
  /*
  点击快速选择
  */
  $scope.bindDateChange=function () {
    $scope.init(Number($scope.selected_year), Number($scope.selected_month), Number($scope.selected_day));
  };
  /*
  1900-2100区间内的公历、农历互转
  可用时间检测
  */
  $scope.testDate=function(year){
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
  };
  /*
  事件 点击获取详情
  */
  $scope.getFocusDetail=function(year,month,day,index){
    //选中样式设置
    var dateList = $scope.dateList;
    for (var i = 0; i < dateList.length;i++){
      if (i == index){
        dateList[i].isFocus=true;
      }else{
        dateList[i].isFocus = false;
      };
    };
    $scope.dateList=dateList;
    //详情设置
    $scope.setDetail({
      year: year,
      month: month,
      day: day,
    }); 
  };
  /*
  详情设置
  arg:date.year
  arg:date.month
  arg:date.day
  */
  $scope.setDetail=function(date){
    //console.log(date)
    $scope.detail=calendar.solar2lunar(date.year, date.month, date.day);
    //console.log($scope.detail)
  };
  /*
  显示日历前后数据 点击处理
  */
  $scope.prevFocusDetail=function(year,month,day,index){
    if ($scope.isPNList){
      $scope.init(year, month, day);
    };
  };
  /*
  显示日历前后数据 点击处理
  */
  $scope.nextFocusDetail=function(year,month,day,index) {
    if ($scope.isPNList) {
      $scope.init(year, month, day);
    };
  };
  /*
  设置日期对象
  arg:year 
  arg:month
  arg:day
  */
  $scope.createDate=function(year, month, day){
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
    $scope.now_date={
      year: now_date.getFullYear(),
      month: now_date.getMonth() + 1,
      day: now_date.getDate(),
      weekend: now_date.getDay()
    };
    $scope.set_date={
      year: set_date.getFullYear(),
      month: set_date.getMonth() + 1,
      day: set_date.getDate(),
      weekend: set_date.getDay()
    };
    $scope.first_set_date={
      year: first_set_date.getFullYear(),
      month: first_set_date.getMonth() + 1,
      day: first_set_date.getDate(),
      weekend: first_set_date.getDay()
    };
    $scope.prev_set_date={
      year: prev_set_date.getFullYear(),
      month: prev_set_date.getMonth() + 1,
      day: prev_set_date.getDate(),
      weekend: prev_set_date.getDay()
    };
    $scope.next_set_date={
      year: next_set_date.getFullYear(),
      month: next_set_date.getMonth() + 1,
      day: next_set_date.getDate(),
      weekend: next_set_date.getDay()
    };
    console.log($scope.first_set_date, $scope.prev_set_date, $scope.next_set_date);
  };
  /*
  生成列表数据
  */
  $scope.createList=function() {     
    //当前月数据
    //console.log($scope.first_set_date)
    var monthDays = $scope.getMonthDays($scope.first_set_date);
     //console.log(monthDays);
    var dateList = [];//实际数据
    for (var i = 1; i <= monthDays; i++) {
      var obj = calendar.solar2lunar($scope.first_set_date.year, $scope.first_set_date.month, i);
      obj.isShowN = $scope.isShowN;//是否显示农历
      //是否选中
      if ($scope.set_date.day == obj.cDay) {//指定日期 对象
        obj.isFocus = true;
      } else {
        obj.isFocus = false;
      };
      obj.isNow = ($scope.now_date.year == obj.cYear && $scope.now_date.month == obj.cMonth && $scope.now_date.day == obj.cDay) ? true : false;//是否是今日日期
      dateList.push(obj);
    };
    //周几
    //$scope.first_set_date.weekend
    //上一月数据
    var prevkongList = [];//列表日历前数据      
    var monthDaysPrev = $scope.getMonthDays($scope.prev_set_date);
    for (var i = monthDaysPrev - $scope.first_set_date.weekend+1; i <= monthDaysPrev; i++) {
      var obj = calendar.solar2lunar($scope.prev_set_date.year, $scope.prev_set_date.month, i);
      obj.isShowN = $scope.isShowN;//是否显示农历
      prevkongList.push(obj);
    };
    //console.log(prevkongList)
    //下一月数据
    var nextkongList = [];//列表日历后数据  
    var monthDaysNext = $scope.getMonthDays($scope.next_set_date);
    for (var i = 1; i <= 7-(dateList.length + prevkongList.length)%7; i++) {
      //console.log($scope.next_set_date.year, $scope.next_set_date.month, i)
      var obj = calendar.solar2lunar($scope.next_set_date.year, $scope.next_set_date.month, i);
      obj.isShowN = $scope.isShowN;//是否显示农历
      nextkongList.push(obj);
    };
    //console.log(nextkongList)
    $scope.dateList=dateList;
    $scope.prevkongList=prevkongList;
    $scope.nextkongList=nextkongList;
  };
  /*
  返回月份对应天数
  一三五七八十腊 31天 二月闰年29 平年28
  arg:date.year
  arg:date.month
  */
  $scope.getMonthDays=function(date){
    if ($scope.isLeapYear(date.year)) {//闰年
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
  };
  /*
  闰年判断函数
  arg:year
  */
  $scope.isLeapYear=function(year) {
    if ((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)) {
      return true;
    } else {
      return false;
    };
  };

  // 生命周期
  //初始化日历
  $scope.init();
  
});