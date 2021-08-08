import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';
import { fetchPhotos, selectAllPhotos, selectPageCount } from './photosSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from './MasonryGrid.module.css';

export function MasonryGrid() {
  const photos = useAppSelector(selectAllPhotos);
  const pageCount = useAppSelector(selectPageCount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPhotos(pageCount));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <InfiniteScroll
      dataLength={photos.length}
      next={() => dispatch(fetchPhotos(pageCount))}
      hasMore={true}
      loader={<></>}
    >
      <Masonry
        breakpointCols={{
          default: 3,
          991: 2,
          767: 1,
        }}
        className={styles.masonryGrid}
        columnClassName={styles.masonryGridColumn}
      >
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.urls.regular}
            alt={photo.description}
          />
        ))}
      </Masonry>
    </InfiniteScroll>
  );
}
