
const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const numberWithCommas = (x) => {
    if (typeof x === 'string') {
        var convert_val = Number(x);
        return convert_val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const prettyPrintTime = (time) => {
    const display = 
    `${monthName[time.getUTCMonth()]} ${time.getUTCDate()}, 
     ${time.getFullYear()}, 
     ${formatTime(time.getUTCHours())}:${formatTime(time.getUTCMinutes())} 
     ${time.getUTCHours() >= 12 ? 'PM UTC' : 'AM UTC'}`;
     return display;
}


export const formatTime = (time) => {
    return time < 10 ? '0' + time : time;
}

export const buildParamRequest = (filter) => {
    if (filter == null)
      return '';
    let requestQuery = ''
    for (const [key, value] of Object.entries(filter)) {
      requestQuery = `${requestQuery}&${key}=${value}`;
    }
    return requestQuery;
}

export const splitArrayIntoChunksOfLen = (arr, len) => {
    console.log(arr);
    let chunks = [], i = 0, n = arr.length;
    while (i < n) {
      chunks.push(arr.slice(i, i += len));
    }
    return chunks;
}

export const format2digitNumber = (number) => {
    return ("0" + number).slice(-2);
}