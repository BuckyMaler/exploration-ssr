import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import * as api from '../../app/api';
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

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async (pageCount: number) => await api.fetchPhotos(pageCount)
);

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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

export const selectPageCount = (state: RootState) => state.photos.pageCount;

export default photosSlice.reducer;
