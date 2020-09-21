window.onload=function(){

 // 单例对象
  var jsScope = {};
  /**
 * 初始数据
 */
  jsScope.isShowN=true;//默认是是否显示农历
  jsScope.minYear=null;//最大最小年月设置
  jsScope.minMonth=null;
  jsScope.maxYear=null;
  jsScope.maxMonth=null;
  jsScope.isPNList=false;//是否显示日历前后数据

  jsScope.prevkongList=[];//列表日历前数据
  jsScope.nextkongList=[];//列表日历后数据
  jsScope.dateList=[//列表日历数据
  ];
  jsScope.now_date={//今日日期 对象
  };
  jsScope.set_date={//指定日期 对象
  }; 
  jsScope.first_set_date={//指定日期所在月1日 对象
  };
  jsScope.prev_set_date={//指定日期上一月所在月1日 对象
  };
  jsScope.next_set_date={//指定日期下一月所在月1日 对象
  };
  jsScope.detail={//点击日期详情
  };

  //供下拉框用的日期格式
  jsScope.selected_year='2019';
  jsScope.selected_year_options=['2016','2017','2018','2019','2020'];
  jsScope.selected_month='10';
  jsScope.selected_month_options=['0','1','2','3','4','5','6','7','8','9','10','11'];
  jsScope.selected_day='5';
  jsScope.selected_day_options=['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'];

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
  jsScope.init=function(year, month, day){
    //可用时间检测
    if (!jsScope.testDate(year)){
      return false;
    };
    //设置日期对象
    jsScope.createDate(year, month, day);     
    //生成列表数据
    jsScope.createList();   
    //详情设置
    jsScope.setDetail(jsScope.set_date); 
  };
  /*
  获取dateList isFocus的日
  */
  jsScope.getDateListisFocusDay=function(){
    var day=null;
    for (var i = 0; i < jsScope.dateList.length;i++){
      if (jsScope.dateList[i].isFocus){
        day = jsScope.dateList[i].cDay;
        break;
      };
    };
    return day;
  };
  /*
  上一年
  */
  jsScope.prevYear=function(){
    var year = jsScope.set_date.year;
    var month = jsScope.set_date.month;
    // 获取dateList isFocus的日
    var day = jsScope.getDateListisFocusDay();

    var monthDays = jsScope.getMonthDays({
      year: year-1,
      month: month,
      day: day
    });
    jsScope.init(year - 1, month, day > monthDays ? monthDays : day);
  };
  /*
  下一年
  */
  jsScope.nextYear=function(){
    var year = jsScope.set_date.year;
    var month = jsScope.set_date.month;
    // 获取dateList isFocus的日
    var day = jsScope.getDateListisFocusDay();

    var monthDays = jsScope.getMonthDays({
      year: year + 1,
      month: month,
      day: day
    });
    jsScope.init(year + 1, month, day > monthDays ? monthDays : day);
  };
  /*
  上一月
  */
  jsScope.prevMonth=function(){
    var year = jsScope.set_date.year;
    var month = jsScope.set_date.month;
    // 获取dateList isFocus的日
    var day = jsScope.getDateListisFocusDay();

    if (month==1){
      var monthDays = jsScope.getMonthDays({
        year: year - 1,
        month: 12,
        day: day
      });
      jsScope.init(year - 1, 12, day > monthDays ? monthDays : day);
    }else{
      var monthDays = jsScope.getMonthDays({
        year: year,
        month: month-1,
        day: day
      });
      jsScope.init(year, month - 1, day > monthDays ? monthDays : day);
    };
  };
  /*
  下一月
  */
  jsScope.nextMonth=function(){
    var year = jsScope.set_date.year;
    var month = jsScope.set_date.month;
    // 获取dateList isFocus的日
    var day = jsScope.getDateListisFocusDay();

    if (month == 12) {
      var monthDays = jsScope.getMonthDays({
        year: year + 1,
        month: 1,
        day: day
      });
      jsScope.init(year + 1, 1, day > monthDays ? monthDays : day);
    } else {
      var monthDays = jsScope.getMonthDays({
        year: year,
        month: month + 1,
        day: day
      });
      jsScope.init(year, month + 1, day > monthDays ? monthDays : day);
    };
  };
  /*
  返回今天
  */
  jsScope.toNow=function(){
    jsScope.init();
  };
  /*
  显示农历
  */
  jsScope.ShowN=function(){
    var dateList = jsScope.dateList;
    for (var i = 0; i < dateList.length; i++) {
      dateList[i].isShowN = true;
    };
    jsScope.dateList=dateList;
    jsScope.isShowN=true;

    var prevkongList = jsScope.prevkongList;
    for (var i = 0; i < prevkongList.length; i++) {
      prevkongList[i].isShowN = true;
    };
    jsScope.prevkongList=prevkongList;
    jsScope.isShowN=true;

    var nextkongList = jsScope.nextkongList;
    for (var i = 0; i < nextkongList.length; i++) {
      nextkongList[i].isShowN = true;
    };
    jsScope.nextkongList=nextkongList;
    jsScope.isShowN=true;
    //生成列表数据
    jsScope.createList();  
    //详情设置
    jsScope.setDetail(jsScope.set_date); 
  };
  /*
  隐藏农历
  */
  jsScope.hideN=function(){
    var dateList = jsScope.dateList;
    for (var i = 0; i < dateList.length; i++) {
      dateList[i].isShowN = false;
    };
    jsScope.dateList=dateList;
    jsScope.sShowN=false;

    var prevkongList = jsScope.prevkongList;
    for (var i = 0; i < prevkongList.length; i++) {
      prevkongList[i].isShowN = false;
    };
    jsScope.prevkongList=prevkongList;
    jsScope.isShowN=false;

    var nextkongList = jsScope.nextkongList;
    for (var i = 0; i < nextkongList.length; i++) {
      nextkongList[i].isShowN = false;
    };
    jsScope.nextkongList=nextkongList;
    jsScope.isShowN=false;
    //生成列表数据
    jsScope.createList();  
    //详情设置
    jsScope.setDetail(jsScope.set_date); 

  };
  /*
  补全前后空留日期
  */
  jsScope.ShowPNList=function(){
    jsScope.isPNList=true;
    //生成列表数据
    jsScope.createList(); 
  };
  /*
  移除前后空留日期
  */
  jsScope.hidePNList=function(){
    jsScope.isPNList=false;
    //生成列表数据
    jsScope.createList(); 
  };
  /*
  点击快速选择
  */
  jsScope.bindDateChange=function (selected_year,selected_month,selected_day) {
    jsScope.init(Number(selected_year), Number(selected_month), Number(selected_day));
  };
  /*
  1900-2100区间内的公历、农历互转
  可用时间检测
  */
  jsScope.testDate=function(year){
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
  jsScope.getFocusDetail=function(year,month,day,index){
    //选中样式设置
    var dateList = jsScope.dateList;
    for (var i = 0; i < dateList.length;i++){
      if (i == index){
        dateList[i].isFocus=true;
      }else{
        dateList[i].isFocus = false;
      };
    };
    jsScope.dateList=dateList;

    var l_box=document.getElementById("l_box");
    l_box.innerHTML='';
    var t0="";
    for(var i=0;i<jsScope.prevkongList.length;i++){
      var index=i;
      var item=jsScope.prevkongList[i];
      t0=t0+'<div ind='+index+' typ="p" class="picker-list-item picker-list-prev '+(!jsScope.isPNList?'hide':'')+'"><div class="picker-list-item-y">'+item.cDay+'</div><div class="picker-list-item-n '+(!item.isShowN?'hide':'')+'">'+(item.Term?item.Term:item.IDayCn)+'</div></div>';
    };
    var t1="";
    for(var i=0;i<jsScope.dateList.length;i++){
      var index=i;
      var item=jsScope.dateList[i];
      t1=t1+'<div ind='+index+' typ="c" class="picker-list-item '+(item.isNow?'now':'')+' '+(item.isFocus?'focus':'')+'"><div class="picker-list-item-y">'+item.cDay+'</div><div class="picker-list-item-n '+(!item.isShowN?'hide':'')+'">'+(item.Term?item.Term:item.IDayCn)+'</div></div>'
    };
    var t2="";
    for(var i=0;i<jsScope.nextkongList.length;i++){
      var index=i;
      var item=jsScope.nextkongList[i];
      t2=t2+'<div ind='+index+' typ="n" class="picker-list-item picker-list-next '+(!jsScope.isPNList?'hide':'')+'"><div class="picker-list-item-y">'+item.cDay+'</div><div class="picker-list-item-n '+(!item.isShowN?'hide':'')+'">'+(item.Term?item.Term:item.IDayCn)+'</div></div>';
    };
    l_box.innerHTML=t0+t1+t2;
    //详情设置
    jsScope.setDetail({
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
  jsScope.setDetail=function(date){
    //console.log(date)
    jsScope.detail=calendar.solar2lunar(date.year, date.month, date.day);
    //console.log(jsScope.detail)
    var detail=jsScope.detail;
    document.getElementById("p_date").innerHTML=detail.cYear+'-'+detail.cMonth+'-'+detail.cDay+' '+detail.ncWeek;
    document.getElementById("p_day").innerHTML=detail.cDay;
    document.getElementById("p_nl").innerHTML=detail.IMonthCn+detail.IDayCn;
    document.getElementById("p_sx").innerHTML=detail.Animal+'年';
    document.getElementById("p_nymdr").innerHTML=detail.gzYear+'年 '+detail.gzMonth+'月 '+detail.gzDay+'日';
    document.getElementById("p_jq").innerHTML=detail.Term?detail.Term:'';
    document.getElementById("p_xz").innerHTML=detail.astro;
    if(!jsScope.isShowN){
      document.getElementById("p_nl").className='picker-detail-nl hide';
      document.getElementById("p_sx").className='picker-detail-sx hide';
      document.getElementById("p_nymdr").className='picker-detail-nymdr hide';
      document.getElementById("p_jq").className='picker-detail-jq hide';
    }else{
      document.getElementById("p_nl").className='picker-detail-nl';
      document.getElementById("p_sx").className='picker-detail-sx';
      document.getElementById("p_nymdr").className='picker-detail-nymdr';
      document.getElementById("p_jq").className='picker-detail-jq';
    };
    document.getElementById("t_s_month").innerHTML=detail.cMonth+'月';
    document.getElementById("t_s_year").innerHTML=detail.cYear+'年';
  };
  /*
  显示日历前后数据 点击处理
  */
  jsScope.prevFocusDetail=function(year,month,day,index){
    if (jsScope.isPNList){
      jsScope.init(year, month, day);
    };
  };
  /*
  显示日历前后数据 点击处理
  */
  jsScope.nextFocusDetail=function(year,month,day,index) {
    if (jsScope.isPNList) {
      jsScope.init(year, month, day);
    };
  };
  /*
  设置日期对象
  arg:year 
  arg:month
  arg:day
  */
  jsScope.createDate=function(year, month, day){
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
    jsScope.now_date={
      year: now_date.getFullYear(),
      month: now_date.getMonth() + 1,
      day: now_date.getDate(),
      weekend: now_date.getDay()
    };
    jsScope.set_date={
      year: set_date.getFullYear(),
      month: set_date.getMonth() + 1,
      day: set_date.getDate(),
      weekend: set_date.getDay()
    };
    jsScope.first_set_date={
      year: first_set_date.getFullYear(),
      month: first_set_date.getMonth() + 1,
      day: first_set_date.getDate(),
      weekend: first_set_date.getDay()
    };
    jsScope.prev_set_date={
      year: prev_set_date.getFullYear(),
      month: prev_set_date.getMonth() + 1,
      day: prev_set_date.getDate(),
      weekend: prev_set_date.getDay()
    };
    jsScope.next_set_date={
      year: next_set_date.getFullYear(),
      month: next_set_date.getMonth() + 1,
      day: next_set_date.getDate(),
      weekend: next_set_date.getDay()
    };
    console.log(jsScope.first_set_date, jsScope.prev_set_date, jsScope.next_set_date);
  };
  /*
  生成列表数据
  */
  jsScope.createList=function() {     
    //当前月数据
    //console.log(jsScope.first_set_date)
    var monthDays = jsScope.getMonthDays(jsScope.first_set_date);
     //console.log(monthDays);
    var dateList = [];//实际数据
    for (var i = 1; i <= monthDays; i++) {
      var obj = calendar.solar2lunar(jsScope.first_set_date.year, jsScope.first_set_date.month, i);
      obj.isShowN = jsScope.isShowN;//是否显示农历
      //是否选中
      if (jsScope.set_date.day == obj.cDay) {//指定日期 对象
        obj.isFocus = true;
      } else {
        obj.isFocus = false;
      };
      obj.isNow = (jsScope.now_date.year == obj.cYear && jsScope.now_date.month == obj.cMonth && jsScope.now_date.day == obj.cDay) ? true : false;//是否是今日日期
      dateList.push(obj);
    };
    //周几
    //jsScope.first_set_date.weekend
    //上一月数据
    var prevkongList = [];//列表日历前数据      
    var monthDaysPrev = jsScope.getMonthDays(jsScope.prev_set_date);
    for (var i = monthDaysPrev - jsScope.first_set_date.weekend+1; i <= monthDaysPrev; i++) {
      var obj = calendar.solar2lunar(jsScope.prev_set_date.year, jsScope.prev_set_date.month, i);
      obj.isShowN = jsScope.isShowN;//是否显示农历
      prevkongList.push(obj);
    };
    //console.log(prevkongList)
    //下一月数据
    var nextkongList = [];//列表日历后数据  
    var monthDaysNext = jsScope.getMonthDays(jsScope.next_set_date);
    for (var i = 1; i <= 7-(dateList.length + prevkongList.length)%7; i++) {
      //console.log(jsScope.next_set_date.year, jsScope.next_set_date.month, i)
      var obj = calendar.solar2lunar(jsScope.next_set_date.year, jsScope.next_set_date.month, i);
      obj.isShowN = jsScope.isShowN;//是否显示农历
      nextkongList.push(obj);
    };
    //console.log(nextkongList)
    jsScope.dateList=dateList;
    jsScope.prevkongList=prevkongList;
    jsScope.nextkongList=nextkongList;

    var l_box=document.getElementById("l_box");
    l_box.innerHTML='';
    var t0="";
    for(var i=0;i<jsScope.prevkongList.length;i++){
      var index=i;
      var item=jsScope.prevkongList[i];
      t0=t0+'<div ind='+index+' typ="p" class="picker-list-item picker-list-prev '+(!jsScope.isPNList?'hide':'')+'"><div class="picker-list-item-y">'+item.cDay+'</div><div class="picker-list-item-n '+(!item.isShowN?'hide':'')+'">'+(item.Term?item.Term:item.IDayCn)+'</div></div>';
    };
    var t1="";
    for(var i=0;i<jsScope.dateList.length;i++){
      var index=i;
      var item=jsScope.dateList[i];
      t1=t1+'<div ind='+index+' typ="c" class="picker-list-item '+(item.isNow?'now':'')+' '+(item.isFocus?'focus':'')+'"><div class="picker-list-item-y">'+item.cDay+'</div><div class="picker-list-item-n '+(!item.isShowN?'hide':'')+'">'+(item.Term?item.Term:item.IDayCn)+'</div></div>'
    };
    var t2="";
    for(var i=0;i<jsScope.nextkongList.length;i++){
      var index=i;
      var item=jsScope.nextkongList[i];
      t2=t2+'<div ind='+index+' typ="n" class="picker-list-item picker-list-next '+(!jsScope.isPNList?'hide':'')+'"><div class="picker-list-item-y">'+item.cDay+'</div><div class="picker-list-item-n '+(!item.isShowN?'hide':'')+'">'+(item.Term?item.Term:item.IDayCn)+'</div></div>';
    };
    l_box.innerHTML=t0+t1+t2;
  };
  /*
  返回月份对应天数
  一三五七八十腊 31天 二月闰年29 平年28
  arg:date.year
  arg:date.month
  */
  jsScope.getMonthDays=function(date){
    if (jsScope.isLeapYear(date.year)) {//闰年
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
  jsScope.isLeapYear=function(year) {
    if ((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)) {
      return true;
    } else {
      return false;
    };
  };

  // 生命周期
  //初始化日历
  jsScope.init();

  //快速选择
  var s0="";
  for(var i=0;i<jsScope.selected_year_options.length;i++){
    var index=i;
    var option=jsScope.selected_year_options[i];
    if(jsScope.selected_year==option){
      s0=s0+'<option selected="selected" value="'+option+'">'+option+'</option>';
    }else{
      s0=s0+'<option value="'+option+'">'+option+'</option>';
    };
  };
  document.getElementById("s_y").innerHTML=s0;
  var s1="";
  for(var i=0;i<jsScope.selected_month_options.length;i++){
    var index=i;
    var option=jsScope.selected_month_options[i];
    if(jsScope.selected_month==option){
      s1=s1+'<option selected="selected" value="'+option+'">'+option+'</option>';
    }else{
      s1=s1+'<option value="'+option+'">'+option+'</option>';
    };
  };
  document.getElementById("s_m").innerHTML=s1;
  var s2="";
  for(var i=0;i<jsScope.selected_day_options.length;i++){
    var index=i;
    var option=jsScope.selected_day_options[i];
    if(jsScope.selected_day==option){
      s2=s2+'<option selected="selected" value="'+option+'">'+option+'</option>';
    }else{
      s2=s2+'<option value="'+option+'">'+option+'</option>';
    };
  };
  document.getElementById("s_d").innerHTML=s2;

  //事件
  document.getElementById("t_p_year").onclick=function(){
    jsScope.prevYear();
  };
  document.getElementById("t_p_month").onclick=function(){
    jsScope.prevMonth();
  };
  document.getElementById("t_n_month").onclick=function(){
    jsScope.nextMonth();
  };
  document.getElementById("t_n_year").onclick=function(){
    jsScope.nextYear();
  };
  document.getElementById("t2_s").onclick=function(){
    jsScope.ShowN();
  };
  document.getElementById("t2_h").onclick=function(){
    jsScope.hideN();
  };
  document.getElementById("t2_d").onclick=function(){
    jsScope.toNow();
  };
  document.getElementById("p_s").onclick=function(){
    jsScope.ShowPNList();
  };
  document.getElementById("p_h").onclick=function(){
    jsScope.hidePNList();
  };
  document.getElementById("l_box").onclick=function(event){
    //console.log(event.target.parentNode.getAttribute('ind'))
    //console.log(event.target.parentNode.getAttribute('typ'))
    var index=Number(event.target.parentNode.getAttribute('ind'));
    if(event.target.parentNode.getAttribute('typ')=='p'){
      var item=jsScope.prevkongList[index];
      jsScope.prevFocusDetail(item.cYear,item.cMonth,item.cDay,index);
    };
    if(event.target.parentNode.getAttribute('typ')=='c'){
      var item=jsScope.dateList[index];
      jsScope.getFocusDetail(item.cYear,item.cMonth,item.cDay,index);
    };
    if(event.target.parentNode.getAttribute('typ')=='n'){
      var item=jsScope.nextkongList[index];
      jsScope.nextFocusDetail(item.cYear,item.cMonth,item.cDay,index);
    };
  };
  document.getElementById("s_y").onchange=function(){
    jsScope.bindDateChange(document.getElementById("s_y").value,document.getElementById("s_m").value,document.getElementById("s_d").value);
  };
  document.getElementById("s_m").onchange=function(){
    jsScope.bindDateChange(document.getElementById("s_y").value,document.getElementById("s_m").value,document.getElementById("s_d").value);
  };
  document.getElementById("s_d").onchange=function(){
    jsScope.bindDateChange(document.getElementById("s_y").value,document.getElementById("s_m").value,document.getElementById("s_d").value);
  };

};