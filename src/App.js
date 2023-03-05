import { Route, Routes } from 'react-router-dom';
import LogIn from './pages/LogIn';
import Main from './pages/Main';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LogIn />} />
      <Route path='/app' element={<Main />} />
    </Routes>
  );
}

export default App;
