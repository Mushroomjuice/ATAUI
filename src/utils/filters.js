export function TimeForFormatter(row){
    /*
      定义注册时间,把时间戳转换成日期的形式
      row:number,object
      return :2019-07-3 20:24:12
    */
   if (typeof row == 'number') {
    return timestampTodata(row)
  }
  if (row.register_time && row.register_time != 'undefined') {
    return timestampTodata(row.register_time)
  }
  if (row.link && row.link != 'undefined') {
    return timestampTodata(row.link)
  }
  if (row.create_date && row.create_date != 'undefined') {
    return timestampTodata(row.create_date)
  }
  if (row.date && row.date != 'undefined') {
    return timestampTodata(row.date)
  }
  if (row.time && row.time != 'undefined') {
    return timestampTodata(row.time)
  }
  if (row.uut_start_time && row.uut_start_time != 'undefined') {
    return timestampTodata(row.uut_start_time)
  }
  if (row.scanintime && row.scanintime != 'undefined') {
    return timestampTodata(row.scanintime)
  }
  return 'Now That Key!'
}





export function timestampTodata(val){
    var date = ''
    if (!val || val == 'undefined') {
        return ''
    }
    if (Date.now() / val > 10) {
        date = new Date(val * 1000)
    }
    else {
        date = new Date(val)
    }
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';

    var h = date.getHours();
    h = h < 10 ? '0' + h : h;
    var m = date.getMinutes();
    m = m < 10 ? '0' + m : m;
    var s = date.getSeconds();
    s = s < 10 ? '0' + s : s;
    return Y + M + D + h + ':' + m + ':' + s;
    
}