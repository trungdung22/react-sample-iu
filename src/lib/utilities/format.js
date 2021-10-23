
const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const numberWithCommas = (x) => {
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
