import React from 'react';
import PropTypes from 'prop-types';
import styles from './DaysToSummer.scss';

class DaysToSummer extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    summerTime: PropTypes.string,
  };

  DaysToSummer() {
    const currentDate = new Date();

    const summerStart = new Date(
      ('June 21, 2021')
      // Date.UTC(currentDate.getUTCFullYear(), 5, 21)
    );
    const summerEnd = new Date(Date.UTC(currentDate.getUTCFullYear(), 7, 23));
    const oneDayToSummer = new Date(
      Date.UTC(currentDate.getUTCFullYear(), 7, 22)
    );

    const daysToSummerDescription = ' days to summer';
    const oneDayToSummerDescription = ' day to summer';
    const oneDay = 24 * 60 * 60 * 1000;
    let diffDays;

    if (currentDate < summerStart) {
      diffDays =
        Math.ceil(Math.abs((currentDate - summerStart) / oneDay)) +
        'days to summer';
    } else if (currentDate > summerEnd) {
      const nextYear = currentDate.getUTCFullYear(nextSummer) + 1; /* DO OMÓWIENIA */
      const nextSummer = new Date(nextYear, 5, 21); /* DO OMÓWIENIA */

      diffDays =
        Math.ceil(Math.abs((currentDate - summerStart) / oneDay)) +
        daysToSummerDescription;
    } else if (currentDate == oneDayToSummer) {
      diffDays =
        Math.ceil(Math.abs((currentDate - summerStart) / oneDay)) +
        oneDayToSummerDescription;
    }

    return diffDays;
  }

  render() {

    const { title, summerTime } = this.props;
    const DaysToSummer = this.DaysToSummer();

    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.countdown}>
          {DaysToSummer ? DaysToSummer : summerTime}
        </div>
      </div>
    );
  }
}

export default DaysToSummer;
