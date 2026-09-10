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
import AdminDashboard from '../pages/admin/AdminDashboard';
import UsersManagement from '../pages/admin/UsersManagement';
import AdminNotifications from '../pages/admin/AdminNotifications';
import AdminReports from '../pages/admin/AdminReports';
 import { SpacesManagement, EditSpace } from '../pages/admin/SpacesManagement';
// import { SpacesManagement } from '../pages/admin/SpacesManagement';
import SpaceOwners from '../pages/admin/SpaceOwners';
import OwnerDashboard from '../pages/owner/OwnerDashboard';
import ReceptionistDashboard from '../pages/receptionist/ReceptionistDashboard';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      {/* -------- User -------- */}
      <Route path="/dashboard" element={<MainLayout role="user" />}>
        <Route index element={<UserHome />} />
        <Route path="explore" element={<UserExplore />} />
        <Route path="explore/:id" element={<SpaceDetails />} />
        <Route path="profile" element={<Profile />} />
        <Route path="bookings" element={<UserBookings />} />
        <Route path="offers" element={<UserOffers />} />
        <Route path="notifications" element={<UserNotifications />} />
      </Route>

      {/* -------- Admin -------- */}
      <Route path="/admin" element={<MainLayout role="admin" />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UsersManagement />} />
        <Route path="spaceowners" element={<SpaceOwners />} />
        <Route path="spaces" element={<SpacesManagement />} />
        <Route path="spaces/edit/:id" element={<EditSpace />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="notifications" element={<AdminNotifications />} />
      </Route>

      {/* -------- Owner -------- */}
      <Route path="/owner" element={<MainLayout role="owner" />}>
        <Route path="dashboard" element={<OwnerDashboard />} />
        <Route path="spaces" element={<SpacesManagement />} />
        <Route path="bookings" element={<UserBookings />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="notifications" element={<AdminNotifications />} />
      </Route>

      {/* -------- Receptionist -------- */}
      <Route path="/receptionist" element={<MainLayout role="receptionist" />}>
        <Route path="dashboard" element={<ReceptionistDashboard />} />
        <Route path="bookings" element={<UserBookings />} />
        <Route path="visitors" element={<UsersManagement />} />
        <Route path="requests" element={<UserBookings />} />
        <Route path="notifications" element={<AdminNotifications />} />
      </Route>

      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;