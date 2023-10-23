import './App.css';
import BookList from './components/bookList';
// import {Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    // <BrowserRouter>
      <div className="App">
        {/* <Routes>
          <Route component={BookList} path="/" exact={true}/>

        </Routes> */}
        <BookList/>
      </div>
    // </BrowserRouter>
  );
}

export default App;
