import moment from 'moment';

class FormatTime {
  static formatTime(val: number, format: string) {
    return moment(val).format(format);
  }
}

export default FormatTime;
