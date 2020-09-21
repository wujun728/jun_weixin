import clientInterface from "/clientInterface.js";

function jsonToStr (json) {

  var returnParam = ""
  var str = ["jsonOnly=1"];
  for (var p in json) {
    str.push((p) + "=" + (json[p]));
  }
  returnParam += str.join("&")
  return returnParam
}

function dellUrl(url, params, method, random, loginToken){
  console.log("url", url)
  var post = {
    url: "",
    method: "", 
    params: {}
  }
  if (!params) {
    params = {}
  }
  if (!loginToken){
    loginToken = ''
  } 

  params.loginToken = loginToken
  if (!random || method == 'post'){
    params.__ajax_random__ = Math.random();
  }
  
  params.mini = 1
  params.mini = 1
  if(!method){
    method = "get"
  }
  if(method == "all"){
    method = post;
  }
  
  console.log(params)
  if (url.substring(0, 6) == "Client") {
    post.url =  clientInterface[url].url;
  } else {
    post.url =  url
  }
  if (!method || method == 'get') {
    
    post.params = '?' + jsonToStr(params) +"&apiversion=2"
    post.url = post.url + post.params
  } else {
    post.params = params
    post.params.apiversion = 2
    post.params.jsonOnly = 1
  }
  post.method = method;
  
  console.log(post)
  return post;
}
// 时间日期方法
function withData(param) {
  return param < 10 ? '0' + param : '' + param;
}
function getLoopArray(start, end, type) {
  console.log("===getLoopArray==", start, end, type)
  var start = start || 0;
  var end = end || 1;
  var array = [];
  let unit = '年'
  if (type == "month"){
    unit = "月"
  } else if (type == "data"){
    unit = "日"
  } else if (type == "hours") {
    unit = "时"
  } else if (type == "minutes") {
    unit = "分"
  } else if (type == "seconds") {
    unit = "秒"
  }
  for (var i = start; i <= end; i++) {
    array.push(withData(i) +unit);
  }
  console.log("===getLoopArray==", array)
  return array;
}
function getMonthDay(year, month) {
  console.log("getMonthDay", month, year)
  var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;
  console.log("flag", flag)
  switch (month) {
    case '01':
    case '03':
    case '05':
    case '07':
    case '08':
    case '10':
    case '12':
      array = getLoopArray(1, 31, 'data')
      break;
    case '04':
    case '06':
    case '09':
    case '11':
      array = getLoopArray(1, 30, 'data')
      break;
    case '02':
      array = flag ? getLoopArray(1, 29, 'data') : getLoopArray(1, 28, 'data')
      break;
    default:
      array = '月份格式不正确，请重新输入！'
  }
  return array;
}
function getNewDateArry() {
  // 当前时间的处理
  var newDate = new Date();
  var year = withData(newDate.getFullYear()) + "年",
    mont = withData(newDate.getMonth() + 1) + "月",
    date = withData(newDate.getDate()) + "日",
    hour = withData(newDate.getHours()) + "时",
    minu = withData(newDate.getMinutes()) + "分",
    seco = withData(newDate.getSeconds()) + "秒";

  return [year, mont, date, hour, minu, seco];
}
function dateTimePicker(startYear, endYear, date) {
  // 返回默认显示的数组和联动数组的声明
  console.log("==dateTimePicker==", date)
  var dateTime = [], dateTimeArray = [[], [], [], [], [], []];
  var start = startYear || 1978;
  var end = endYear || 2100;
  // 默认开始显示数据
  var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArry();
  console.log("==defaultDate==", defaultDate)
  // 处理联动列表数据
  /*年月日 时分秒*/
  let year = defaultDate[0].slice(0, -1);
  let month = defaultDate[1].slice(0, -1);
  console.log("==defaultDate==", year, month)
  dateTimeArray[0] = getLoopArray(start, end,'year');
  dateTimeArray[1] = getLoopArray(1, 12, 'month');
  dateTimeArray[2] = getMonthDay(year, month, 'data');
  dateTimeArray[3] = getLoopArray(0, 23, 'hours');
  dateTimeArray[4] = getLoopArray(0, 59, 'minutes');
  dateTimeArray[5] = getLoopArray(0, 59, 'seconds');

  dateTimeArray.forEach((current, index) => {
    dateTime.push(current.indexOf(defaultDate[index]));
  });

  return {
    dateTimeArray: dateTimeArray,
    dateTime: dateTime
  }
}


export { dellUrl, dateTimePicker, getMonthDay}