import { Photo } from './models';

export async function fetchDailyPhoto(): Promise<Photo> {
  const res = await fetch('/api/daily-photo');

  return await res.json();
}

export async function fetchPhotos(pageCount: number): Promise<Array<Photo>> {
  const res = await fetch(`/api/photos?page=${pageCount}`);

  return await res.json();
}
