
export default (timeString) => {

    const [hours, minutes] = timeString.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'

    let displayHours = hours % 12
    displayHours = displayHours === 0 ? 12 : displayHours

    const formattedTime = `${displayHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`

    return formattedTime
    
}