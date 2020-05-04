import i18n from "i18next";
import moment from "moment";

class Timer {
  /* Message returns when time left is ended */
  private expirationMessage: string;
  /* Time left */
  private timeLeft: moment.Duration;

  constructor() {
    this.expirationMessage = "Period ended";
    this.timeLeft = moment.duration();
  }
  /* Returns current value of time left in HH:mm:ss format or expiration message if time left is ended */
  get value(): string {
    console.log(i18n.t(this.expirationMessage));
    return this.timeLeft.asMilliseconds() === 0
      ? i18n.t(this.expirationMessage)
      : this.formatTimeLeft(this.timeLeft);
  }
  /* Calculates and set time left based on current server time and planned expiration time */
  setInitialTimeLeft(serverTime: string, expirationTime: string) {
    this.timeLeft = moment.duration(
      moment(expirationTime, "HH:mm:ss").diff(moment(serverTime, "HH:mm:ss"))
    );
  }
  /* Substracts 1 second from time left */
  decreaseTimeLeft() {
    if (this.timeLeft.asMilliseconds() > 0) {
      this.timeLeft = this.timeLeft.subtract(1, "seconds");
    }
  }
  /* Returns time left as string in HH:mm:ss format*/
  formatTimeLeft(duration: moment.Duration) {
    const date = moment().startOf("day");
    return date.add(duration).format("HH:mm:ss");
  }
}

/**
 * Timer returns time left in HH:mm:ss format or expiration message if time left is ended
 *
 * @visibleName Timer
 */
export default Timer;
