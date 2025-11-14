import {DateTime} from 'luxon';
export function getCurrentWeekRangeIST() {
    const now = DateTime.now().setZone('Asia/Kolkata');
    const startOfWeekUTC = now.startOf('week').toUTC();
    const endOfTodayUTC = now.endOf('day').toUTC();
    console.log("Start of week: ",startOfWeekUTC.toJSDate())
    console.log("End of day: ",endOfTodayUTC.toJSDate())
    return {startOfWeek : startOfWeekUTC.toJSDate(), endOfToday:endOfTodayUTC}
}