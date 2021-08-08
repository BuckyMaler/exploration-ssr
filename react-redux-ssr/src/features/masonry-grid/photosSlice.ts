import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import { Photo } from '../../app/models';
import { RootState } from '../../app/store';

interface PhotosState extends EntityState<Photo> {
  pageCount: number;
  status: 'idle' | 'loading' | 'failed';
}

const photosAdapter = createEntityAdapter<Photo>();

const initialState: PhotosState = photosAdapter.getInitialState({
  pageCount: 1,
  status: 'idle',
});

export const fetchPhotos = createAsyncThunk<
  Array<Photo>,
  void,
  { state: RootState }
>('photos/fetchPhotos', async (_, { getState }) => {
  const res = await fetch(`/api/photos?page=${getState().photos.pageCount}`);

  return await res.json();
});

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        photosAdapter.addMany(state, action.payload);
        state.pageCount += 1;
        state.status = 'idle';
      })
      .addCase(fetchPhotos.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { selectAll: selectAllPhotos } = photosAdapter.getSelectors(
  (state: RootState) => state.photos
);

export default photosSlice.reducer;
