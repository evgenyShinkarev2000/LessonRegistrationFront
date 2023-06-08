import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { MainPage } from './pages/MainPage';
import { useAppEnv } from './services/AppEnv/useAppEnv';

function App()
{
  const env = useAppEnv();
  console.log(env);
  return (
    <Routes>
      <Route Component={MainPage} path='index/*'></Route>
      <Route path='/' element={<Navigate to="index" />}></Route>
      <Route path='*' element={<Navigate to='/' />}></Route>
    </Routes>
  )
}

export default App
