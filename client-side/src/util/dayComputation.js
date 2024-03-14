
export default (morningTimeStart, morningTimeEnd, afternoonTimeStart, afternoonTimeEnd) => {

        const [morningHoursStart, morningMinutesStart] = morningTimeStart.split(':')
        const [morningHoursEnd, morningMinutesEnd] = morningTimeEnd.split(':')
        const [afternoonHoursStart, afternoonMinutesStart] = afternoonTimeStart.split(':')
        const [afternoonHoursEnd, afternoonMinutesEnd] = afternoonTimeEnd.split(':')
    
        const totalMorningStartHours = Math.abs(parseInt(morningHoursStart) - parseInt(morningHoursEnd))
        const totalMorningStartMinutes = Math.abs(parseInt(morningMinutesStart) - parseInt(morningMinutesEnd))
        const totalAfternoonStartHours = Math.abs(parseInt(afternoonHoursStart) - parseInt(afternoonHoursEnd))
        const totalAfternoonStartMinutes = Math.abs(parseInt(afternoonMinutesStart) - parseInt(afternoonMinutesEnd))
    
        const totalHours = Math.abs(totalMorningStartHours + totalAfternoonStartHours)
        const totalMinutes = Math.abs(totalMorningStartMinutes + totalAfternoonStartMinutes)    
    
        if (morningTimeStart === '0:0' || morningTimeEnd === '0:0') {
            return '0:0'
        }

        if (totalHours === 0) {
            let hours = totalHours
            if (totalMinutes >= 60) {
                const excess = Math.floor(totalMinutes / 60)
                hours = hours + excess
                const minutes = (excess * 60) - (totalMinutes)
        
                if (minutes !== 0) {
                    return hours + ':' + Math.abs(minutes)
                }else {
                    return hours + ':0' 
                }
            }else {
                return '0:' + Math.abs(totalMinutes)
            }
        }else {
            let hours = totalHours
            if (totalMinutes >= 60) {
                const excess = Math.floor(totalMinutes / 60)
                hours = hours + excess
                const minutes = (excess * 60) - (totalMinutes)
        
                if (minutes !== 0) {
                    return hours + ':' + Math.abs(minutes)
                }else {
                    return hours + ':0'
                }
            }else {
                if (totalMinutes === 0) {
                    return Math.abs(hours) + ':0'
                }
                return hours + ':' +Math.abs(totalMinutes)
            }
        }
}