const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function GetDateDiff(startTime, endTime, diffType) {
  //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
  startTime = startTime.replace(/\-/g, "/");
  endTime = endTime.replace(/\-/g, "/");

  //将计算间隔类性字符转换为小写
  diffType = diffType.toLowerCase(); //比如几天
  var sTime = new Date(startTime); //开始时间
  var eTime = new Date(endTime); //结束时间
  //作为除数的数字
  var divNum = 1;
  var answer = 0;
  switch (diffType) {
    case "second":
      divNum = 1000;
      break;
    case "minute":
      divNum = 1000 * 60;
      console.log('minute')
      break;
    case "hour":
      divNum = 1000 * 3600;
      console.log('hour')
      break;
    case "day":
      divNum = 1000 * 3600 * 24;
      console.log('day')
      break;
    default:
      break;
  }
  return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));

  //GetDateDiff("2010-10-11 00:00:00", "2010-10-11 00:01:40", "seond")是计算秒数
}

function timeStamp(second_time) {
  //返回时间
  var retTime2 = {
    lever:0,
    Time: {
      second: 0,
      minute: 0,
      hour: 0,
      day: 0,
    }
  }

  retTime2.Time.second = parseInt(second_time) > 9 ? parseInt(second_time) : '0' + parseInt(second_time)
  retTime2.lever = 1
  if (parseInt(second_time) > 60) {
    var second = parseInt(second_time) % 60;
    var min = parseInt(second_time / 60);

    retTime2.Time.second = second > 9 ? second : '0' + second
    retTime2.Time.minute = min > 9 ? min : '0' + min
    retTime2.lever = 2
    if (min > 60) {
      min = parseInt(second_time / 60) % 60;
      var hour = parseInt(parseInt(second_time / 60) / 60);

      retTime2.Time.second = second > 9 ? second : '0' + second
      retTime2.Time.minute = min > 9 ? min : '0' + min
      retTime2.Time.hour = hour > 9 ? hour : '0' + hour
      retTime2.lever = 3
      if (hour > 24) {
        hour = parseInt(parseInt(second_time / 60) / 60) % 24;
        var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);

        retTime2.Time.second = second > 9 ? second : '0' + second
        retTime2.Time.minute = min > 9 ? min : '0' + min
        retTime2.Time.hour = hour > 9 ? hour : '0' + hour
        retTime2.Time.day = day
        retTime2.lever = 4
      }
    }
  }
  return retTime2;
}

module.exports = {
  formatTime: formatTime,
  GetDateDiff:GetDateDiff,
  timeStamp: timeStamp
}
