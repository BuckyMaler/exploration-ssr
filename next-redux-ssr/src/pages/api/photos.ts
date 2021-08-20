import type { NextApiRequest, NextApiResponse } from 'next';
import { API_LOCATION, REQUEST_OPTIONS } from '../../app/constants';
import { Photo } from '../../app/models';

export async function fetchPhotos(
  page: string | number
): Promise<Array<Photo>> {
  const res = await fetch(
    `${API_LOCATION}/photos?page=${page}`,
    REQUEST_OPTIONS
  );

  return await res.json();
}

export default async function fetchPhotosHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const photos = await fetchPhotos(req.query.page as string);

  res.json(photos);
}
