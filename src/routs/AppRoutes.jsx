import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthRedirect from "./AuthRedirect";

// Layouts
import PublicLayout from "../components/layout/PublicLayout";
import UserLayout from "../components/layout/UserLayout";   // USER layout
import AdminLayout from "../components/layout/AdminLayout";           // ADMIN layout

// Public Pages
import HomePage from "../pages/nonuserpages/HomePage";
import AboutPage from "../pages/nonuserpages/AboutPage";
import CoursesPage from "../pages/nonuserpages/CoursesPage";
import CoursesDetailPage from "../pages/nonuserpages/CoursesDetailPage";
import GalleryPage from "../pages/nonuserpages/GalleryPage";
import GalleryInfoPage from "../pages/nonuserpages/GalleryInfoPage";
import PlacementPage from "../pages/nonuserpages/PlacementPage";
import PlacementStoryPage from "../pages/nonuserpages/PlacementStoryPage";
import UpcomingPage from "../pages/nonuserpages/UpcomingPage";
import ContactPage from "../pages/nonuserpages/ContactPage";

// User Pages
import AppitudeExam from "../pages/user/AppitudeExam";
import TestExam from "../pages/user/TestExam";
import TestSuccess from "../pages/user/TestSuccess";
import Result from "../pages/user/Result";
import Certification from "../pages/user/Certification";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import TotalRegisterDashboard from "../pages/admin/TotalRegisterDashboard";
import NewRegisterDashboard from "../pages/admin/NewRegisterDashboard";
import CompletedTestDashboard from "../pages/admin/CompletedTestDashboard";
import CollegeVisitDashboard from "../pages/admin/CollegeVisitDashboard";
import TotalPlacementDashboard from "../pages/admin/TotalPlacementDashboard";
import TotalReviewsDashboard from "../pages/admin/TotalReviewsDashboard";
import GalleryEventPage from "../pages/admin/GalleryEventPage";
import AdminCoursesPage from "../pages/admin/AdminCoursesPage";
import AdminNotificationPage from "../pages/admin/AdminNotificationPage";
import AdminProfile from "../pages/admin/AdminProfile";

// Auth Pages
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

const AppRoutes = () => {
  return (
    <Routes>

      {/* 🌍 PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:categoryName" element={<CoursesDetailPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/gallery/:id" element={<GalleryInfoPage />} />
        <Route path="/placements" element={<PlacementPage />} />
        <Route path="/placements/:id" element={<PlacementStoryPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* 🔑 LOGIN + SIGNUP (Public layout!) */}
        <Route 
          path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />
        <Route 
          path="/signup"
          element={
            <AuthRedirect>
              <Signup />
            </AuthRedirect>
          }
        />
      </Route>


      {/* 👤 USER ROUTES (Dashboard layout) */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/appitude" element={<AppitudeExam />} />
        <Route path="/exam" element={<TestExam />} />
        <Route path="/success" element={<TestSuccess />} />
        <Route path="/result" element={<Result />} />
        <Route path="/certification" element={<Certification />} />
      </Route>


      {/* 🛠️ ADMIN ROUTES (Admin layout, NO footer) */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/"></Route>
      </Route>

    </Routes>
  );
};

export default AppRoutes;
