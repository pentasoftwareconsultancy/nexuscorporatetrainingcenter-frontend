import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthRedirect from "./AuthRedirect";

// Layouts
import PublicLayout from "../components/layout/PublicLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import AuthLayout from "../components/layout/AuthLayout";

// Public Pages
import HomePage from "../pages/nonuserpages/HomePage";
import AboutPage from "../pages/nonuserpages/AboutPage";
import CoursesPage from "../pages/nonuserpages/CoursesPage";
import CoursesDetailPage from "../pages/nonuserpages/CoursesDetailPage";
import GalleryPage from "../pages/nonuserpages/GalleryPage";
import GalleryInfoPage from "../pages/nonuserpages/GalleryInfoPage";
import PlacementPage from "../pages/nonuserpages/PlacementPage";
import PlacementStoryPage from "../pages/nonuserpages/PlacementStoryPage";
import ContactPage from "../pages/nonuserpages/ContactPage";

// User Pages
import AppitudeExam from "../pages/user/AppitudeExam";
import TestExam from "../pages/user/TestExam";
import TestSuccess from "../pages/user/TestSuccess";
import Result from "../pages/user/Result";
import Certification from "../pages/user/Certification";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import ExamManagement from "../pages/admin/ExamManagement";

// Auth Pages
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:categoryName" element={<CoursesDetailPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/gallery/:id" element={<GalleryInfoPage />} />
        <Route path="/placements" element={<PlacementPage />} />
        <Route path="/placements/:id" element={<PlacementStoryPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Auth Pages */}
      <Route element={<AuthLayout />}>
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

      {/* Protected Routes (Role-based) */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* User Dashboard */}
        <Route
          path="/appitude"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <AppitudeExam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exam"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <TestExam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <TestSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Result />
            </ProtectedRoute>
          }
        />
        <Route
          path="/certification"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Certification />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exam-management"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ExamManagement />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
