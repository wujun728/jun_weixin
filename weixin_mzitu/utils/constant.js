//后端服务地址
var BASE_URL = "http://192.168.1.129:8080/minApp";
//error相关
var ERROR_DATA_IS_NULL = "获取数据为空，请重试";
function time(){
  return Date.parse(new Date()) / 1000;
}
module.exports = {
  BASE_URL: BASE_URL,
  ERROR_DATA_IS_NULL: ERROR_DATA_IS_NULL,
  time: time
}