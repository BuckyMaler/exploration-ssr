import { useEffect, useState } from 'react';
import * as api from '../../app/api';
import { Photo } from '../../app/models';
import styles from './DailyPhoto.module.css';

export function DailyPhoto() {
  const [dailyPhoto, setDailyPhoto] = useState<Photo>();

  useEffect(() => {
    api.fetchDailyPhoto().then((photo) => {
      setDailyPhoto(photo);
    });
  }, []);

  return (
    <div
      className={styles.dailyPhoto}
      style={{ backgroundImage: `url(${dailyPhoto?.urls.regular})` }}
    >
      <div className={styles.backgroundGradient}></div>
      <div className={styles.outerContainer}>
        <div className={styles.innerContainer}>
          <h1 className={styles.title}>Unsplash</h1>
          <p className={styles.about}>
            The internet's source of freely-usable images.
            <br />
            Powered by creators everywhere.
          </p>
        </div>
      </div>
      <p className={styles.attribution}>
        Photo of the Day by {dailyPhoto?.user.name}
      </p>
    </div>
  );
}
