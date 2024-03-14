
export default (data) => {
    const list =  data
    let totalHours = 0
    let totalMinutes = 0

    for (let i = 0; i < list.length; i++) {
        const [hours, minutes] = list[i].split(':')
        totalHours += parseInt(hours)
        totalMinutes += parseInt(minutes)
    }

    if (totalHours === 0) {
    
        if (totalMinutes >= 60) {
            const excess = Math.floor(totalMinutes / 60)
            totalHours = totalHours + excess
            const minutes = (excess * 60) - (totalMinutes)
    
            if (minutes !== 0) {
                return totalHours + ':' + Math.abs(minutes)
            }else {
                return totalHours + ':00'
            }
        }else {
            return '0:' + Math.abs(totalMinutes)
        }
    }else {
        if (totalMinutes >= 60) {
            const exceed = Math.floor(totalMinutes / 60)
            totalHours += exceed
            const restMinutes = (exceed * 60) - (totalMinutes)

            if (restMinutes !== 0) {
                return totalHours + ':' + Math.abs(restMinutes)
            }else {
                return totalHours + ':00'
            }

        }else {
            if (totalMinutes === 0) {
                return Math.abs(totalHours) + ':00'
            }
            return totalHours + ':' +Math.abs(totalMinutes)
        }
    }

}