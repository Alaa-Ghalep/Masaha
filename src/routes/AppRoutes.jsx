import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from "../components/layout/MainLayout";
import Login from '../pages/auth/Login'; 
import Register from '../pages/auth/Register'; 
import UserHome from '../pages/user/UserHome';
import UserExplore from '../pages/user/UserExplore';
import SpaceDetails from '../pages/user/SpaceDetails'; 
import Profile from '../pages/user/Profile'; 
import UserBookings from '../pages/user/UserBookings'; 
import UserOffers from '../pages/user/UserOffers'; 
import UserNotifications from '../pages/user/UserNotifications'; 
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<UserHome />} /> 
        <Route path="/dashboard/explore" element={<UserExplore />} />
        <Route path="/dashboard/explore">
        <Route index element={<UserExplore />} /> 
        <Route path=":id" element={<SpaceDetails />} />
        </Route> 
        <Route path="/dashboard/profile" element={<Profile />} /> 
        <Route path="bookings" element={<UserBookings />} />
        <Route path="offers" element={<UserOffers />} />
        <Route path="notifications" element={<UserNotifications />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;