import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicLayout from '../layouts/PublicLayout';

import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { PrivateLayout } from '../layouts/PrivateLayout';
import Home from '../pages/Home';
import { AuthProvider } from '../contexts/AuthContext';
import CreatePost from '../pages/CreatePost';
import Dashboard from '../pages/Dashboard';
import { EditPost } from '../pages/EditPost';
import Post from '../pages/Post';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* without token */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post/:id" element={<Post />} />
          </Route>

          {/* with token */}
          <Route element={<PrivateLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/post/new" element={<CreatePost />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/post/:id/edit" element={<EditPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
