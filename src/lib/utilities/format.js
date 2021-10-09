
const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const prettyPrintTime = (time) => {
    const display = 
    `${monthName[time.getMonth()]} ${time.getDate()}, 
     ${time.getFullYear()}, 
     ${formatTime(time.getHours())}:${formatTime(time.getMinutes())} 
     ${time.getHours() >= 12 ? 'PM' : 'AM'}`;
     return display;
}


export const formatTime = (time) => {
    return time < 10 ? '0' + time : time;
}
