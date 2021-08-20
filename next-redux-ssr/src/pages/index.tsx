import type { InferGetServerSidePropsType, NextPage } from 'next';
import Image from 'next/image';
import { fetchDailyPhoto } from './api/daily-photo';
import { fetchPhotos } from './api/photos';
import { initStore } from '../app/store';
import { DailyPhoto } from '../features/daily-photo/DailyPhoto';
import { MasonryGrid } from '../features/masonry-grid/MasonryGrid';
import { fetchPhotos as fetchPhotosAsyncThunk } from '../features/masonry-grid/photosSlice';
import logo from '../../public/logo.svg';
import styles from '../styles/App.module.css';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const IndexPage: NextPage<Props> = (props) => {
  return (
    <>
      <header className={styles.header}>
        <a href="/">
          <Image src={logo} alt="logo" width={36} />
        </a>
      </header>
      <DailyPhoto dailyPhoto={props.dailyPhoto} />
      <MasonryGrid />
    </>
  );
};

export async function getServerSideProps() {
  const store = initStore();
  const [dailyPhoto, photos] = await Promise.all([
    fetchDailyPhoto(),
    fetchPhotos(store.getState().photos.pageCount),
  ]);

  store.dispatch({
    type: fetchPhotosAsyncThunk.fulfilled.type,
    payload: photos,
  });

  return {
    props: {
      dailyPhoto,
      preloadedState: store.getState(),
    },
  };
}

export default IndexPage;
