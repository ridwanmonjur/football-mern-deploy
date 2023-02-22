export function returnDateFormatted(dateString) {
    var dateObj = new Date(dateString)
    var hour = dateObj.getHours();
    var minutes = dateObj.getMinutes();
    var seconds = dateObj.getSeconds();
  
    var day = dateObj.getDate();
    var year = dateObj.getYear();
    var month = dateObj.getMonth();
  
    return `Purchased at ${day}/${month}/${year} ${hour}:${minutes}:${seconds}`
  }