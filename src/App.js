import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import './style.css'
import URL from './components/url'
import firebaseConfig from './firebaseconfig';
import { Route, Routes } from 'react-router';
import Redirect from './Redirect';

function App() {
  const config = firebaseConfig
  const app = initializeApp(config);
  const db = getFirestore(app);

  return (
    <>
      <Routes>
        <Route path={'/'} element={<URL />}></Route>
        <Route path={'/:id'} element={<Redirect />}></Route>
      </Routes>
    </>
  );
}

export default App;
