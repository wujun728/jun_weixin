$(function(){
  // 单例对象
  var $jqScope = {};
  /**
 * 初始数据
 */
  $jqScope.isShowN=true;//默认是是否显示农历
  $jqScope.minYear=null;//最大最小年月设置
  $jqScope.minMonth=null;
  $jqScope.maxYear=null;
  $jqScope.maxMonth=null;
  $jqScope.isPNList=false;//是否显示日历前后数据

  $jqScope.prevkongList=[];//列表日历前数据
  $jqScope.nextkongList=[];//列表日历后数据
  $jqScope.dateList=[//列表日历数据
  ];
  $jqScope.now_date={//今日日期 对象
  };
  $jqScope.set_date={//指定日期 对象
  }; 
  $jqScope.first_set_date={//指定日期所在月1日 对象
  };
  $jqScope.prev_set_date={//指定日期上一月所在月1日 对象
  };
  $jqScope.next_set_date={//指定日期下一月所在月1日 对象
  };
  $jqScope.detail={//点击日期详情
  };

  //供下拉框用的日期格式
  $jqScope.selected_year='2019';
  $jqScope.selected_year_options=['2016','2017','2018','2019','2020'];
  $jqScope.selected_month='10';
  $jqScope.selected_month_options=['0','1','2','3','4','5','6','7','8','9','10','11'];
  $jqScope.selected_day='5';
  $jqScope.selected_day_options=['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'];

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
  $jqScope.init=function(year, month, day){
    //可用时间检测
    if (!$jqScope.testDate(year)){
      return false;
    };
    //设置日期对象
    $jqScope.createDate(year, month, day);     
    //生成列表数据
    $jqScope.createList();   
    //详情设置
    $jqScope.setDetail($jqScope.set_date); 
  };
  /*
  获取dateList isFocus的日
  */
  $jqScope.getDateListisFocusDay=function(){
    var day=null;
    for (var i = 0; i < $jqScope.dateList.length;i++){
      if ($jqScope.dateList[i].isFocus){
        day = $jqScope.dateList[i].cDay;
        break;
      };
    };
    return day;
  };
  /*
  上一年
  */
  $jqScope.prevYear=function(){
    var year = $jqScope.set_date.year;
    var month = $jqScope.set_date.month;
    // 获取dateList isFocus的日
    var day = $jqScope.getDateListisFocusDay();

    var monthDays = $jqScope.getMonthDays({
      year: year-1,
      month: month,
      day: day
    });
    $jqScope.init(year - 1, month, day > monthDays ? monthDays : day);
  };
  /*
  下一年
  */
  $jqScope.nextYear=function(){
    var year = $jqScope.set_date.year;
    var month = $jqScope.set_date.month;
    // 获取dateList isFocus的日
    var day = $jqScope.getDateListisFocusDay();

    var monthDays = $jqScope.getMonthDays({
      year: year + 1,
      month: month,
      day: day
    });
    $jqScope.init(year + 1, month, day > monthDays ? monthDays : day);
  };
  /*
  上一月
  */
  $jqScope.prevMonth=function(){
    var year = $jqScope.set_date.year;
    var month = $jqScope.set_date.month;
    // 获取dateList isFocus的日
    var day = $jqScope.getDateListisFocusDay();

    if (month==1){
      var monthDays = $jqScope.getMonthDays({
        year: year - 1,
        month: 12,
        day: day
      });
      $jqScope.init(year - 1, 12, day > monthDays ? monthDays : day);
    }else{
      var monthDays = $jqScope.getMonthDays({
        year: year,
        month: month-1,
        day: day
      });
      $jqScope.init(year, month - 1, day > monthDays ? monthDays : day);
    };
  };
  /*
  下一月
  */
  $jqScope.nextMonth=function(){
    var year = $jqScope.set_date.year;
    var month = $jqScope.set_date.month;
    // 获取dateList isFocus的日
    var day = $jqScope.getDateListisFocusDay();

    if (month == 12) {
      var monthDays = $jqScope.getMonthDays({
        year: year + 1,
        month: 1,
        day: day
      });
      $jqScope.init(year + 1, 1, day > monthDays ? monthDays : day);
    } else {
      var monthDays = $jqScope.getMonthDays({
        year: year,
        month: month + 1,
        day: day
      });
      $jqScope.init(year, month + 1, day > monthDays ? monthDays : day);
    };
  };
  /*
  返回今天
  */
  $jqScope.toNow=function(){
    $jqScope.init();
  };
  /*
  显示农历
  */
  $jqScope.ShowN=function(){
    var dateList = $jqScope.dateList;
    for (var i = 0; i < dateList.length; i++) {
      dateList[i].isShowN = true;
    };
    $jqScope.dateList=dateList;
    $jqScope.isShowN=true;

    var prevkongList = $jqScope.prevkongList;
    for (var i = 0; i < prevkongList.length; i++) {
      prevkongList[i].isShowN = true;
    };
    $jqScope.prevkongList=prevkongList;
    $jqScope.isShowN=true;

    var nextkongList = $jqScope.nextkongList;
    for (var i = 0; i < nextkongList.length; i++) {
      nextkongList[i].isShowN = true;
    };
    $jqScope.nextkongList=nextkongList;
    $jqScope.isShowN=true;
    //生成列表数据
    $jqScope.createList();  
    //详情设置
    $jqScope.setDetail($jqScope.set_date); 
  };
  /*
  隐藏农历
  */
  $jqScope.hideN=function(){
    var dateList = $jqScope.dateList;
    for (var i = 0; i < dateList.length; i++) {
      dateList[i].isShowN = false;
    };
    $jqScope.dateList=dateList;
    $jqScope.sShowN=false;

    var prevkongList = $jqScope.prevkongList;
    for (var i = 0; i < prevkongList.length; i++) {
      prevkongList[i].isShowN = false;
    };
    $jqScope.prevkongList=prevkongList;
    $jqScope.isShowN=false;

    var nextkongList = $jqScope.nextkongList;
    for (var i = 0; i < nextkongList.length; i++) {
      nextkongList[i].isShowN = false;
    };
    $jqScope.nextkongList=nextkongList;
    $jqScope.isShowN=false;
    //生成列表数据
    $jqScope.createList();  
    //详情设置
    $jqScope.setDetail($jqScope.set_date); 

  };
  /*
  补全前后空留日期
  */
  $jqScope.ShowPNList=function(){
    $jqScope.isPNList=true;
    //生成列表数据
    $jqScope.createList(); 
  };
  /*
  移除前后空留日期
  */
  $jqScope.hidePNList=function(){
    $jqScope.isPNList=false;
    //生成列表数据
    $jqScope.createList(); 
  };
  /*
  点击快速选择
  */
  $jqScope.bindDateChange=function (selected_year,selected_month,selected_day) {
    $jqScope.init(Number(selected_year), Number(selected_month), Number(selected_day));
  };
  /*
  1900-2100区间内的公历、农历互转
  可用时间检测
  */
  $jqScope.testDate=function(year){
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
  $jqScope.getFocusDetail=function(year,month,day,index){
    //选中样式设置
    var dateList = $jqScope.dateList;
    for (var i = 0; i < dateList.length;i++){
      if (i == index){
        dateList[i].isFocus=true;
      }else{
        dateList[i].isFocus = false;
      };
    };
    $jqScope.dateList=dateList;

    $("#l_box").empty();
    for(var i=0;i<$jqScope.prevkongList.length;i++){
      var index=i;
      var item=$jqScope.prevkongList[i];
      $("#l_box").append('<div ind='+index+' typ="p" class="picker-list-item picker-list-prev '+(!$jqScope.isPNList?'hide':'')+'"><div class="picker-list-item-y">'+item.cDay+'</div><div class="picker-list-item-n '+(!item.isShowN?'hide':'')+'">'+(item.Term?item.Term:item.IDayCn)+'</div></div>');
    };
    for(var i=0;i<$jqScope.dateList.length;i++){
      var index=i;
      var item=$jqScope.dateList[i];
      $("#l_box").append('<div ind='+index+' typ="c" class="picker-list-item '+(item.isNow?'now':'')+' '+(item.isFocus?'focus':'')+'"><div class="picker-list-item-y">'+item.cDay+'</div><div class="picker-list-item-n '+(!item.isShowN?'hide':'')+'">'+(item.Term?item.Term:item.IDayCn)+'</div></div>')
    };
    for(var i=0;i<$jqScope.nextkongList.length;i++){
      var index=i;
      var item=$jqScope.nextkongList[i];
      $("#l_box").append('<div ind='+index+' typ="n" class="picker-list-item picker-list-next '+(!$jqScope.isPNList?'hide':'')+'"><div class="picker-list-item-y">'+item.cDay+'</div><div class="picker-list-item-n '+(!item.isShowN?'hide':'')+'">'+(item.Term?item.Term:item.IDayCn)+'</div></div>');
    };
    //详情设置
    $jqScope.setDetail({
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
  $jqScope.setDetail=function(date){
    //console.log(date)
    $jqScope.detail=calendar.solar2lunar(date.year, date.month, date.day);
    //console.log($jqScope.detail)
    var detail=$jqScope.detail;
    $("#p_date").html(detail.cYear+'-'+detail.cMonth+'-'+detail.cDay+' '+detail.ncWeek);
    $("#p_day").html(detail.cDay);
    $("#p_nl").html(detail.IMonthCn+detail.IDayCn);
    $("#p_sx").html(detail.Animal+'年');
    $("#p_nymdr").html(detail.gzYear+'年 '+detail.gzMonth+'月 '+detail.gzDay+'日');
    $("#p_jq").html(detail.Term?detail.Term:'');
    $("#p_xz").html(detail.astro);
    if(!$jqScope.isShowN){
      $("#p_nl").addClass('hide');
      $("#p_sx").addClass('hide');
      $("#p_nymdr").addClass('hide');
      $("#p_jq").addClass('hide');
    }else{
      $("#p_nl").removeClass('hide');
      $("#p_sx").removeClass('hide');
      $("#p_nymdr").removeClass('hide');
      $("#p_jq").removeClass('hide');
    };
    $("#t_s_month").html(detail.cMonth+'月');
    $("#t_s_year").html(detail.cYear+'年');
  };
  /*
  显示日历前后数据 点击处理
  */
  $jqScope.prevFocusDetail=function(year,month,day,index){
    if ($jqScope.isPNList){
      $jqScope.init(year, month, day);
    };
  };
  /*
  显示日历前后数据 点击处理
  */
  $jqScope.nextFocusDetail=function(year,month,day,index) {
    if ($jqScope.isPNList) {
      $jqScope.init(year, month, day);
    };
  };
  /*
  设置日期对象
  arg:year 
  arg:month
  arg:day
  */
  $jqScope.createDate=function(year, month, day){
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
    $jqScope.now_date={
      year: now_date.getFullYear(),
      month: now_date.getMonth() + 1,
      day: now_date.getDate(),
      weekend: now_date.getDay()
    };
    $jqScope.set_date={
      year: set_date.getFullYear(),
      month: set_date.getMonth() + 1,
      day: set_date.getDate(),
      weekend: set_date.getDay()
    };
    $jqScope.first_set_date={
      year: first_set_date.getFullYear(),
      month: first_set_date.getMonth() + 1,
      day: first_set_date.getDate(),
      weekend: first_set_date.getDay()
    };
    $jqScope.prev_set_date={
      year: prev_set_date.getFullYear(),
      month: prev_set_date.getMonth() + 1,
      day: prev_set_date.getDate(),
      weekend: prev_set_date.getDay()
    };
    $jqScope.next_set_date={
      year: next_set_date.getFullYear(),
      month: next_set_date.getMonth() + 1,
      day: next_set_date.getDate(),
      weekend: next_set_date.getDay()
    };
    console.log($jqScope.first_set_date, $jqScope.prev_set_date, $jqScope.next_set_date);
  };
  /*
  生成列表数据
  */
  $jqScope.createList=function() {     
    //当前月数据
    //console.log($jqScope.first_set_date)
    var monthDays = $jqScope.getMonthDays($jqScope.first_set_date);
     //console.log(monthDays);
    var dateList = [];//实际数据
    for (var i = 1; i <= monthDays; i++) {
      var obj = calendar.solar2lunar($jqScope.first_set_date.year, $jqScope.first_set_date.month, i);
      obj.isShowN = $jqScope.isShowN;//是否显示农历
      //是否选中
      if ($jqScope.set_date.day == obj.cDay) {//指定日期 对象
        obj.isFocus = true;
      } else {
        obj.isFocus = false;
      };
      obj.isNow = ($jqScope.now_date.year == obj.cYear && $jqScope.now_date.month == obj.cMonth && $jqScope.now_date.day == obj.cDay) ? true : false;//是否是今日日期
      dateList.push(obj);
    };
    //周几
    //$jqScope.first_set_date.weekend
    //上一月数据
    var prevkongList = [];//列表日历前数据      
    var monthDaysPrev = $jqScope.getMonthDays($jqScope.prev_set_date);
    for (var i = monthDaysPrev - $jqScope.first_set_date.weekend+1; i <= monthDaysPrev; i++) {
      var obj = calendar.solar2lunar($jqScope.prev_set_date.year, $jqScope.prev_set_date.month, i);
      obj.isShowN = $jqScope.isShowN;//是否显示农历
      prevkongList.push(obj);
    };
    //console.log(prevkongList)
    //下一月数据
    var nextkongList = [];//列表日历后数据  
    var monthDaysNext = $jqScope.getMonthDays($jqScope.next_set_date);
    for (var i = 1; i <= 7-(dateList.length + prevkongList.length)%7; i++) {
      //console.log($jqScope.next_set_date.year, $jqScope.next_set_date.month, i)
      var obj = calendar.solar2lunar($jqScope.next_set_date.year, $jqScope.next_set_date.month, i);
      obj.isShowN = $jqScope.isShowN;//是否显示农历
      nextkongList.push(obj);
    };
    //console.log(nextkongList)
    $jqScope.dateList=dateList;
    $jqScope.prevkongList=prevkongList;
    $jqScope.nextkongList=nextkongList;

    $("#l_box").empty();
    for(var i=0;i<$jqScope.prevkongList.length;i++){
      var index=i;
      var item=$jqScope.prevkongList[i];
      $("#l_box").append('<div ind='+index+' typ="p" class="picker-list-item picker-list-prev '+(!$jqScope.isPNList?'hide':'')+'"><div class="picker-list-item-y">'+item.cDay+'</div><div class="picker-list-item-n '+(!item.isShowN?'hide':'')+'">'+(item.Term?item.Term:item.IDayCn)+'</div></div>');
    };
    for(var i=0;i<$jqScope.dateList.length;i++){
      var index=i;
      var item=$jqScope.dateList[i];
      $("#l_box").append('<div ind='+index+' typ="c" class="picker-list-item '+(item.isNow?'now':'')+' '+(item.isFocus?'focus':'')+'"><div class="picker-list-item-y">'+item.cDay+'</div><div class="picker-list-item-n '+(!item.isShowN?'hide':'')+'">'+(item.Term?item.Term:item.IDayCn)+'</div></div>')
    };
    for(var i=0;i<$jqScope.nextkongList.length;i++){
      var index=i;
      var item=$jqScope.nextkongList[i];
      $("#l_box").append('<div ind='+index+' typ="n" class="picker-list-item picker-list-next '+(!$jqScope.isPNList?'hide':'')+'"><div class="picker-list-item-y">'+item.cDay+'</div><div class="picker-list-item-n '+(!item.isShowN?'hide':'')+'">'+(item.Term?item.Term:item.IDayCn)+'</div></div>');
    };
  };
  /*
  返回月份对应天数
  一三五七八十腊 31天 二月闰年29 平年28
  arg:date.year
  arg:date.month
  */
  $jqScope.getMonthDays=function(date){
    if ($jqScope.isLeapYear(date.year)) {//闰年
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
  $jqScope.isLeapYear=function(year) {
    if ((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)) {
      return true;
    } else {
      return false;
    };
  };

  // 生命周期
  //初始化日历
  $jqScope.init();

  //快速选择
  for(var i=0;i<$jqScope.selected_year_options.length;i++){
    var index=i;
    var option=$jqScope.selected_year_options[i];
    if($jqScope.selected_year==option){
      $("#s_y").append('<option selected="selected" value="'+option+'">'+option+'</option>');
    }else{
      $("#s_y").append('<option value="'+option+'">'+option+'</option>');
    };
  };
  for(var i=0;i<$jqScope.selected_month_options.length;i++){
    var index=i;
    var option=$jqScope.selected_month_options[i];
    if($jqScope.selected_month==option){
      $("#s_m").append('<option selected="selected" value="'+option+'">'+option+'</option>');
    }else{
      $("#s_m").append('<option value="'+option+'">'+option+'</option>');
    };
  };
  for(var i=0;i<$jqScope.selected_day_options.length;i++){
    var index=i;
    var option=$jqScope.selected_day_options[i];
    if($jqScope.selected_day==option){
      $("#s_d").append('<option selected="selected" value="'+option+'">'+option+'</option>');
    }else{
      $("#s_d").append('<option value="'+option+'">'+option+'</option>');
    };
  };

  //事件
  $("#t_p_year").click(function(){
    $jqScope.prevYear();
  });
  $("#t_p_month").click(function(){
    $jqScope.prevMonth();
  });
  $("#t_n_month").click(function(){
    $jqScope.nextMonth();
  });
  $("#t_n_year").click(function(){
    $jqScope.nextYear();
  });
  $("#t2_s").click(function(){
    $jqScope.ShowN();
  });
  $("#t2_h").click(function(){
    $jqScope.hideN();
  });
  $("#t2_d").click(function(){
    $jqScope.toNow();
  });
  $("#p_s").click(function(){
    $jqScope.ShowPNList();
  });
  $("#p_h").click(function(){
    $jqScope.hidePNList();
  });
  $("#l_box").on('click','.picker-list-item',function(){
    //console.log($(this).attr('ind'))
    //console.log($(this).attr('typ'))
    var index=Number($(this).attr('ind'));
    if($(this).attr('typ')=='p'){
      var item=$jqScope.prevkongList[index];
      $jqScope.prevFocusDetail(item.cYear,item.cMonth,item.cDay,index);
    };
    if($(this).attr('typ')=='c'){
      var item=$jqScope.dateList[index];
      $jqScope.getFocusDetail(item.cYear,item.cMonth,item.cDay,index);
    };
    if($(this).attr('typ')=='n'){
      var item=$jqScope.nextkongList[index];
      $jqScope.nextFocusDetail(item.cYear,item.cMonth,item.cDay,index);
    };
  })
  $("#s_y").change(function(){
    //console.log($("#s_y").val(),$("#s_m").val(),$("#s_d").val())
    $jqScope.bindDateChange($("#s_y").val(),$("#s_m").val(),$("#s_d").val());
  });
  $("#s_m").change(function(){
    //console.log($("#s_y").val(),$("#s_m").val(),$("#s_d").val())
    $jqScope.bindDateChange($("#s_y").val(),$("#s_m").val(),$("#s_d").val());
  });
  $("#s_d").change(function(){
    //console.log($("#s_y").val(),$("#s_m").val(),$("#s_d").val())
    $jqScope.bindDateChange($("#s_y").val(),$("#s_m").val(),$("#s_d").val());
  });

});