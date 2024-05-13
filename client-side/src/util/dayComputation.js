
export default (morningTimeStart, morningTimeEnd, afternoonTimeStart, afternoonTimeEnd) => {

    const [morningHoursStart, morningMinutesStart] = morningTimeStart.split(':').map(Number);
    const [morningHoursEnd, morningMinutesEnd] = morningTimeEnd.split(':').map(Number);
    const [afternoonHoursStart, afternoonMinutesStart] = afternoonTimeStart.split(':').map(Number);
    const [afternoonHoursEnd, afternoonMinutesEnd] = afternoonTimeEnd.split(':').map(Number);

    const totalMorningStartMinutes = (morningHoursStart * 60) + morningMinutesStart;
    const totalMorningEndMinutes = (morningHoursEnd * 60) + morningMinutesEnd;
    const totalAfternoonStartMinutes = (afternoonHoursStart * 60) + afternoonMinutesStart;
    const totalAfternoonEndMinutes = (afternoonHoursEnd * 60) + afternoonMinutesEnd;

    const totalMorningMinutes = totalMorningEndMinutes - totalMorningStartMinutes;
    const totalAfternoonMinutes = totalAfternoonEndMinutes - totalAfternoonStartMinutes;

    const totalMinutes = totalMorningMinutes + totalAfternoonMinutes;
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    return `${totalHours}:${remainingMinutes.toString().padStart(2, '0')}`;
}