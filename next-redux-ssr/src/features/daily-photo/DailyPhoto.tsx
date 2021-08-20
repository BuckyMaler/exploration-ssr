import { Photo } from '../../app/models';
import styles from './DailyPhoto.module.css';

export function DailyPhoto(props: { dailyPhoto: Photo }) {
  return (
    <div
      className={styles.dailyPhoto}
      style={{ backgroundImage: `url(${props.dailyPhoto.urls.regular})` }}
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
        Photo of the Day by {props.dailyPhoto.user.name}
      </p>
    </div>
  );
}
