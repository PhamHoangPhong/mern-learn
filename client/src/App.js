import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Landing from './components/layouts/Landing'
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext';
import Dasboard from './views/Dasboard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import About from './views/About';
import PostContextProvider from './contexts/PostContex';
function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route exact path='/' element={<Landing />} />
            <Route exact path='/login' element={<Auth authRoute='login' />} />
            <Route exact path='/register' element={<Auth authRoute='register' />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/dasboard' element={<Dasboard />} />
              <Route path='/about' element={<About />} />
            </Route>
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
