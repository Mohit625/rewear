import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import Home from './pages/Home';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Dashboard from './pages/Dashboard';
import BrowseItems from './pages/BrowseItems';
import AddItem from './pages/AddItem';
import AdminPanel from './pages/AdminPanel';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/browse" element={<BrowseItems />} />
          <Route path="/dashboard" element={
  <PrivateRoute><Dashboard /></PrivateRoute>
} />
<Route path="/add" element={
  <PrivateRoute><AddItem /></PrivateRoute>
} />
<Route path="/admin" element={
  <PrivateRoute><AdminPanel /></PrivateRoute>
} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
