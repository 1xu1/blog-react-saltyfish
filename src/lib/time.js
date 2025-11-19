// 日期相关的一些工具类

//获取当前时间戳
function getUnix() {
    const date = new Date();
    return date.getTime();
}

//获取今天0点0分0秒的时间戳
function getTodayUnix() {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
}
function getLastDate(time) {
    const date = new Date(time);
    const month = date.getMonth() + 1;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const hours = 
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const minutes = 
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const seconds = 
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
export function getFormatTime(timestamp) {
    if(!timestamp) return ''
    timestamp = new Date(timestamp);
    const now = getUnix();
    const timestamp1 = timestamp.getTime();
    const today = getTodayUnix();
    const timer = (now - timestamp1) / 1000;
    let tip = "";
    if (timer <= 0) {
        tip = "刚刚";
    } else if (Math.floor(timer / 60) <= 0) {
        tip = "刚刚";
    } else if (timer < 3600) {
        tip = Math.floor(timer / 60) + "分钟前";
    } else if (timer >= 3600 && timestamp1 - today >= 0) {
        tip = Math.floor(timer / 3600) + "小时前";
    } else if (timer / 86400 <= 31) {
        tip = Math.floor(timer / 86400) + "天前";
    } else {
        tip = getLastDate(timestamp);
    }
    return tip;
}