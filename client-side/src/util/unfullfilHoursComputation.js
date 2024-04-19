
export default (totalHours) => {

    const fullfillmentHours = 500
    const [hours, minutes] = totalHours.split(':')

    if (minutes > 0) {
        
    }else {
        return Math.abs(fullfillmentHours - hours)
    }
}