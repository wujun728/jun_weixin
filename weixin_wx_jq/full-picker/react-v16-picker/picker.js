class Picker extends React.Component {
  constructor(props) {
    super(props);
    let initState = {
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
        cYear:'',
        cMonth:'',
        cDay:'',
        ncWeek:'',
        IMonthCn:'',
        IDayCn:'',
        Animal:'',
        gzYear:'',
        gzMonth:'',
        gzDay:'',
        Term:'',
        astro:''
      },

      //供下拉框用的日期格式
      selected_year: '2019',
      selected_year_options: ['2016','2017','2018','2019','2020'],
      selected_month: '10',
      selected_month_options: ['0','1','2','3','4','5','6','7','8','9','10','11'],
      selected_day: '5',
      selected_day_options: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']
    };
    this.state = initState;
    this.stateSync = initState;
  }

  // state同步管理支持
  setStateSync(obj){
    this.setState(obj);
    this.stateSync = {...this.stateSync,...obj};
  }

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
    this.setDetail(this.stateSync.set_date); 
  }
  /*
  获取dateList isFocus的日
  */
  getDateListisFocusDay(){
    var day=null;
    for (var i = 0; i < this.stateSync.dateList.length;i++){
      if (this.stateSync.dateList[i].isFocus){
        day = this.stateSync.dateList[i].cDay;
        break;
      };
    };
    return day;
  }
  /*
  上一年
  */
  prevYear(){
    var year = this.stateSync.set_date.year;
    var month = this.stateSync.set_date.month;
    // 获取dateList isFocus的日
    var day = this.getDateListisFocusDay();

    var monthDays = this.getMonthDays({
      year: year-1,
      month: month,
      day: day
    });
    this.init(year - 1, month, day > monthDays ? monthDays : day);
  }
  /*
  下一年
  */
  nextYear(){
    var year = this.stateSync.set_date.year;
    var month = this.stateSync.set_date.month;
    // 获取dateList isFocus的日
    var day = this.getDateListisFocusDay();

    var monthDays = this.getMonthDays({
      year: year + 1,
      month: month,
      day: day
    });
    this.init(year + 1, month, day > monthDays ? monthDays : day);
  }
  /*
  上一月
  */
  prevMonth(){
    var year = this.stateSync.set_date.year;
    var month = this.stateSync.set_date.month;
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
  }
  /*
  下一月
  */
  nextMonth(){
    var year = this.stateSync.set_date.year;
    var month = this.stateSync.set_date.month;
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
  }
  /*
  返回今天
  */
  toNow(){
    this.init();
  }
  /*
  显示农历
  */
  ShowN(){
    var dateList = this.stateSync.dateList;
    for (var i = 0; i < dateList.length; i++) {
      dateList[i].isShowN = true;
    };
    this.setStateSync({
      dateList: dateList,
      isShowN:true
    });

    var prevkongList = this.stateSync.prevkongList;
    for (var i = 0; i < prevkongList.length; i++) {
      prevkongList[i].isShowN = true;
    };
    this.setStateSync({
      prevkongList: prevkongList,
      isShowN: true
    });

    var nextkongList = this.stateSync.nextkongList;
    for (var i = 0; i < nextkongList.length; i++) {
      nextkongList[i].isShowN = true;
    };
    this.setStateSync({
      nextkongList: nextkongList,
      isShowN: true
    });
  }
  /*
  隐藏农历
  */
  hideN(){
    var dateList = this.stateSync.dateList;
    for (var i = 0; i < dateList.length; i++) {
      dateList[i].isShowN = false;
    };
    this.setStateSync({
      dateList: dateList,
      isShowN: false
    });

    var prevkongList = this.stateSync.prevkongList;
    for (var i = 0; i < prevkongList.length; i++) {
      prevkongList[i].isShowN = false;
    };
    this.setStateSync({
      prevkongList: prevkongList,
      isShowN: false
    });

    var nextkongList = this.stateSync.nextkongList;
    for (var i = 0; i < nextkongList.length; i++) {
      nextkongList[i].isShowN = false;
    };
    this.setStateSync({
      nextkongList: nextkongList,
      isShowN: false
    });
  }
  /*
  补全前后空留日期
  */
  ShowPNList(){
    this.setStateSync({
      isPNList: true
    });
  }
  /*
  移除前后空留日期
  */
  hidePNList(){
    this.setStateSync({
      isPNList: false
    });
  }
  /*
  点击快速选择
  */
  bindDateChange() {
    //console.log(this.refs.selected_year.value)
    //console.log(this.refs.selected_month.value)
    //console.log(this.refs.selected_day.value)
    this.setStateSync({
      selected_year:this.refs.selected_year.value,
      selected_month:this.refs.selected_month.value,
      selected_day:this.refs.selected_day.value
    })
    this.init(Number(this.stateSync.selected_year), Number(this.stateSync.selected_month), Number(this.stateSync.selected_day));

    
  }
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
  }
  /*
  事件 点击获取详情
  */
  getFocusDetail(year,month,day,index){
    //选中样式设置
    var dateList = this.stateSync.dateList;
    for (var i = 0; i < dateList.length;i++){
      if (i == index){
        dateList[i].isFocus=true;
      }else{
        dateList[i].isFocus = false;
      };
    };
    this.setStateSync({
      dateList: dateList
    });
    //详情设置
    this.setDetail({
      year: year,
      month: month,
      day: day,
    }); 
  }
  /*
  详情设置
  arg:date.year
  arg:date.month
  arg:date.day
  */
  setDetail(date){
    //console.log(date)
    this.setStateSync({
      detail: calendar.solar2lunar(date.year, date.month, date.day)
    });
    //console.log(this.stateSync.detail)
  }
  /*
  显示日历前后数据 点击处理
  */
  prevFocusDetail(year,month,day,index){
    if (this.stateSync.isPNList){
      this.init(year, month, day);
    };
  }
  /*
  显示日历前后数据 点击处理
  */
  nextFocusDetail(year,month,day,index) {
    if (this.stateSync.isPNList) {
      this.init(year, month, day);
    };
  }
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
    this.setStateSync({
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
    console.log(this.stateSync.first_set_date, this.stateSync.prev_set_date, this.stateSync.next_set_date);
  }
  /*
  生成列表数据
  */
  createList() {     
    //当前月数据
    //console.log(this.stateSync.first_set_date)
    var monthDays = this.getMonthDays(this.stateSync.first_set_date);
    //console.log(monthDays);
    var dateList = [];//实际数据
    for (var i = 1; i <= monthDays; i++) {
      var obj = calendar.solar2lunar(this.stateSync.first_set_date.year, this.stateSync.first_set_date.month, i);
      obj.isShowN = this.stateSync.isShowN;//是否显示农历
      //是否选中
      if (this.stateSync.set_date.day == obj.cDay) {//指定日期 对象
        obj.isFocus = true;
      } else {
        obj.isFocus = false;
      };
      obj.isNow = (this.stateSync.now_date.year == obj.cYear && this.stateSync.now_date.month == obj.cMonth && this.stateSync.now_date.day == obj.cDay) ? true : false;//是否是今日日期
      dateList.push(obj);
    };
    //周几
    //this.stateSync.first_set_date.weekend
    //上一月数据
    var prevkongList = [];//列表日历前数据      
    var monthDaysPrev = this.getMonthDays(this.stateSync.prev_set_date);
    for (var i = monthDaysPrev - this.stateSync.first_set_date.weekend+1; i <= monthDaysPrev; i++) {
      var obj = calendar.solar2lunar(this.stateSync.prev_set_date.year, this.stateSync.prev_set_date.month, i);
      obj.isShowN = this.stateSync.isShowN;//是否显示农历
      prevkongList.push(obj);
    };
    //console.log(prevkongList)
    //下一月数据
    var nextkongList = [];//列表日历后数据  
    var monthDaysNext = this.getMonthDays(this.stateSync.next_set_date);
    for (var i = 1; i <= 7-(dateList.length + prevkongList.length)%7; i++) {
      //console.log(this.stateSync.next_set_date.year, this.stateSync.next_set_date.month, i)
      var obj = calendar.solar2lunar(this.stateSync.next_set_date.year, this.stateSync.next_set_date.month, i);
      obj.isShowN = this.stateSync.isShowN;//是否显示农历
      nextkongList.push(obj);
    };
    //console.log(nextkongList)
    this.setStateSync({        
      dateList: dateList,
      prevkongList: prevkongList,
      nextkongList: nextkongList
    });
  }
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
  }
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

  // 生命周期
  componentDidMount(){
    //初始化日历
    this.init();
  }

  render() {

    let {
      isShowN,
      minYear,
      minMonth,
      maxYear,
      maxMonth,
      isPNList,
      prevkongList,
      nextkongList,
      dateList,
      now_date,
      set_date,
      first_set_date,
      prev_set_date,
      next_set_date,
      detail,
      selected_year,
      selected_year_options,
      selected_month,
      selected_month_options,
      selected_day,
      selected_day_options
    } = this.state;

    for(let i=0;i<dateList.length;i++){
      let addCname = 'picker-list-item ';
      if(dateList[i].isNow){
        addCname = addCname + 'now ';
      };
      if(dateList[i].isFocus){
        addCname = addCname + 'focus ';
      };
      dateList[i].addCname = addCname;
    };

    return (
      <div className='picker'>
        <div className='picker-title'>1900-2100区间内的公历、农历</div>
        <div className='picker-detail'>
          <div className='picker-detail-date'>{detail.cYear}-{detail.cMonth}-{detail.cDay} {detail.ncWeek}</div>
          <div className='picker-detail-day'>{detail.cDay}</div>
          <div className={isShowN?'picker-detail-nl':'picker-detail-nl hide'}>{detail.IMonthCn}{detail.IDayCn}</div>
          <div className={isShowN?'picker-detail-sx':'picker-detail-sx hide'}>{detail.Animal}年</div>
          <div className={isShowN?'picker-detail-nymdr':'picker-detail-nymdr hide'}>{detail.gzYear}年 {detail.gzMonth}月 {detail.gzDay}日</div>
          <div className={isShowN?'picker-detail-jq':'picker-detail-jq hide'}>{detail.Term?detail.Term:''}</div>
          <div className='picker-detail-xz'>{detail.astro}</div>
        </div>
        <div className='picker-tools'>
          <div className='picker-tools-prev-year' onClick={this.prevYear.bind(this)}>上一年</div>
          <div className='picker-tools-prev-month' onClick={this.prevMonth.bind(this)}>上一月</div>
          <div className='picker-tools-see-month'>{detail.cMonth}月</div>
          <div className='picker-tools-see-year'>{detail.cYear}年</div>
          <div className='picker-tools-next-month' onClick={this.nextMonth.bind(this)}>下一月</div>
          <div className='picker-tools-next-year' onClick={this.nextYear.bind(this)}>下一年</div>
        </div>
        <div className='picker-list-w clearfix'>
          <div className='picker-list-w-r'>日</div>
          <div>一</div>
          <div>二</div>
          <div>三</div>
          <div>四</div>
          <div>五</div>
          <div className='picker-list-w-r'>六</div>    
        </div>
        <div className='picker-list clearfix'>
          {
            prevkongList.map((item, index) => {
              return (<div key={item.cDay} className={isPNList?'picker-list-item picker-list-prev':'picker-list-item picker-list-prev hide'} onClick={this.prevFocusDetail.bind(this,item.cYear,item.cMonth,item.cDay,index)}>
                <div className='picker-list-item-y'>{item.cDay}</div>
                <div className={item.isShowN?'picker-list-item-n':'picker-list-item-n hide'}>{item.Term?item.Term:item.IDayCn}</div>
              </div>)
            })
          }
          {
            dateList.map((item, index) => {
              return (<div key={item.cDay} className={item.addCname} onClick={this.getFocusDetail.bind(this,item.cYear,item.cMonth,item.cDay,index)}>
                <div className='picker-list-item-y'>{item.cDay}</div>
                <div className={item.isShowN?'picker-list-item-n':'picker-list-item-n hide'}>{item.Term?item.Term:item.IDayCn}</div>
              </div>) 
            }) 
          } 
          {
            nextkongList.map((item, index) => {
              return (<div key={item.cDay} className={isPNList?'picker-list-item picker-list-next':'picker-list-item picker-list-next hide'} onClick={this.nextFocusDetail.bind(this,item.cYear,item.cMonth,item.cDay,index)}>
                <div className='picker-list-item-y'>{item.cDay}</div>
                <div className={item.isShowN?'picker-list-item-n':'picker-list-item-n hide'}>{item.Term?item.Term:item.IDayCn}</div>
              </div>)
            }) 
          } 
        </div>
        <div className='picker-tools2'>
          <div className='picker-tools2-to-change' onClick={this.ShowN.bind(this)}>显示农历</div>
          <div className='picker-tools2-to-change' onClick={this.hideN.bind(this)}>隐藏农历</div>
          <div className='picker-tools2-to-now' onClick={this.toNow.bind(this)}>返回今天</div>
        </div>
        <div className='picker-tools2'>
          <div className='picker-tools2-to-change' onClick={this.ShowPNList.bind(this)}>补全前后空留日期</div>
          <div className='picker-tools2-to-change' onClick={this.hidePNList.bind(this)}>移除前后空留日期</div>
        </div>
        <div className="picker-sel">
          <label>快速选择</label>
          <label>年：</label>
          <select ref="selected_year" onChange={this.bindDateChange.bind(this)} value={selected_year}>
            {
              selected_year_options.map((option, index) => {
                return (<option key={option} value={option}>{option}</option>)
              }) 
            }
          </select>
          <label>月：</label>
          <select ref="selected_month" onChange={this.bindDateChange.bind(this)} value={selected_month}>
            {
              selected_month_options.map((option, index) => {
                return (<option key={option} value={option}>{option}</option>)
              }) 
            }
          </select>
          <label>日：</label>
          <select ref="selected_day" onChange={this.bindDateChange.bind(this)} value={selected_day}>
            {
              selected_day_options.map((option, index) => {
                return (<option key={option} value={option}>{option}</option>)
              }) 
            }
          </select>
        </div>
      </div>
    );
  }
}
 
ReactDOM.render(
  <Picker></Picker>,
  document.getElementById('app')
);