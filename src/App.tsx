import { DailyPhoto } from './features/daily-photo/DailyPhoto';
import { MasonryGrid } from './features/masonry-grid/MasonryGrid';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
      <header className="App-header">
        <a href="/">
          <img src={logo} alt="logo" className="App-logo" />
        </a>
      </header>
      <DailyPhoto />
      <MasonryGrid />
    </>
  );
}

export default App;
