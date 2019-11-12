export const dateFromat = function () { }
/** 
 * 获取当前的日期到日
 * param time
 * 参数的格式为 
 * yyyy-mm-dd hh:mm::ss
 * yyyy/mm/dd hh:mm::ss
 */
dateFromat.FormatTimeToToday = function (time) {
    // 如果没有time参数
    if (time === undefined) {
        var today = new Date(new Date().getYear(), new Date().getMonth() + 1, new Date().getDate())
    } else {
        var time = time.replace(/-/g, "/").split(' ')[0]
        var today = new Date(new Date(time).getYear(), new Date(time).getMonth() + 1, new Date(time).getDate())
    }
    return today
}

dateFromat.dayDiff = function (time) {

    return Math.abs((dateFromat.FormatTimeToToday(time) - dateFromat.FormatTimeToToday()) / (1000 * 60 * 60 * 24));
}