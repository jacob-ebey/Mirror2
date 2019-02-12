import Clock from "./Clock";

export default {
  component: Clock,
  defaults: {
    format: "h:mm A",
    timezone: "US/Pacific",
    autoTimezone: true,
    showDate: true,
    dateFormat: "dddd, MMMM Do YYYY"
  }
}