// 格式化月日时分秒
export function timestampToMonthDayTime(timestamp) {
  const date = new Date(timestamp); // 创建一个新的 Date 对象，参数为时间戳
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // 获取月份，并补零
  const day = ("0" + date.getDate()).slice(-2); // 获取日期，并补零
  const hours = ("0" + date.getHours()).slice(-2); // 获取小时，并补零
  const minutes = ("0" + date.getMinutes()).slice(-2); // 获取分钟，并补零
  const formattedMonthDayTime = `${month}-${day} ${hours}:${minutes}`; // 格式化月日时分秒
  return formattedMonthDayTime;
}

//倒计时时间转换
export function formatTimeFromTimestamp(timestamp) {
  var hours = Math.floor(timestamp / 3600);
  var minutes = Math.floor((timestamp % 3600) / 60);
  var seconds = timestamp % 60;

  // 将时、分、秒转换为两位数的字符串形式
  var formattedHours = String(hours).padStart(2, "0");
  var formattedMinutes = String(minutes).padStart(2, "0");
  var formattedSeconds = String(seconds).padStart(2, "0");

  return [formattedHours, formattedMinutes, formattedSeconds];
}
