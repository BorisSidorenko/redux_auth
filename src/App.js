import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './features/auth/Login';
import Welcome from './features/profile/Welcome';
import RequireAuth from './features/auth/RequireAuth';
import CoursesList from './features/courses/CoursesList';



function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route path='login' element={<Login />} />
        
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route index path='/' element={<Welcome />} />
          <Route path='coursesList' element={<CoursesList />} />
        </Route>

      </Route>
    </Routes>
  )
}

export default App;
