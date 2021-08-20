import { API_LOCATION, REQUEST_OPTIONS } from '../../app/constants';
import { Photo } from '../../app/models';

export async function fetchDailyPhoto(): Promise<Photo> {
  const res = await fetch(
    `${API_LOCATION}/collections/1459961`,
    REQUEST_OPTIONS
  );
  const { cover_photo } = await res.json();

  return cover_photo;
}
