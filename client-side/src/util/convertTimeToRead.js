
export default (time) => {

    const [hours, minutes] = time.split(':')

    const minuteInWords = (minData) => {
        if (parseInt(minData) === 1) {
            return minData + 'min'
        }else {
            return minData + 'mins'
        }
    }

    const hoursInWords = (hoursData) => {
        if (parseInt(hoursData) === 1) {
            return hoursData + 'hr'
        }else {
            return hoursData + 'hrs'
        }
    }

    if (hours > 0) {
        if (minutes > 0) {
            return hoursInWords(hours) +" "+ minuteInWords(minutes)
        }else {
            return hoursInWords(hours)
        }
    }else {
        return minuteInWords(minutes)
    }
}