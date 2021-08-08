import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import photosReducer from '../features/masonry-grid/photosSlice';

const { __PRELOADED_STATE__ } = window as any;

export const store = configureStore({
  reducer: {
    photos: photosReducer,
  },
  preloadedState: __PRELOADED_STATE__,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
