import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import photosReducer from '../features/masonry-grid/photosSlice';

export function initStore(preloadedState?) {
  return configureStore({
    reducer: {
      photos: photosReducer,
    },
    preloadedState,
  });
}

let store: ReturnType<typeof initStore>;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
