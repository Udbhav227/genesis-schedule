import { days } from "./data.js";
// const now = new Date("April 5, 2026 12:30:00");
const now = new Date();

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const todayStr = `${monthNames[now.getMonth()]} ${now.getDate()}`;

const defaultDayIndex = days.indexOf(todayStr);

export let activeDay = defaultDayIndex !== -1 ? defaultDayIndex + 1 : 1;
export let activeFilter = "all";
export let activeClub = "all";
export const currentDate = now;
export let showOnlyLive = false;

export function setActiveDay(day) {
  activeDay = day;
}
export function setActiveFilter(filter) {
  activeFilter = filter;
}
export function setActiveClub(club) {
  activeClub = club;
}
export function setShowOnlyLive(val) {
  showOnlyLive = val;
}
