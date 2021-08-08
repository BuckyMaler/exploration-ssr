import React from 'react';
import logo from './logo.svg';
import { Photo } from './app/models';
import { DailyPhoto } from './features/daily-photo/DailyPhoto';
import { MasonryGrid } from './features/masonry-grid/MasonryGrid';
import './App.css';

function App(props: { dailyPhoto: Photo }) {
  return (
    <>
      <header className="App-header">
        <a href="/">
          <img src={logo} alt="logo" className="App-logo" />
        </a>
      </header>
      <DailyPhoto {...props} />
      <MasonryGrid />
    </>
  );
}

export default App;
