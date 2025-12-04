import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../core/contexts/AuthContext";

// Layouts
import PublicLayout from "../components/layout/PublicLayout";
import UserLayout from "../components/layout/UserLayout";
import AdminLayout from "../components/layout/AdminLayout";

// Public Pages
import HomePage from "../pages/nonuserpages/HomePage";
import AboutPage from "../pages/nonuserpages/AboutPage";
import CoursesPage from "../pages/nonuserpages/CoursesPage";
import CoursesDetailPage from "../pages/nonuserpages/CoursesDetailPage";
import GalleryPage from "../pages/nonuserpages/GalleryPage";
import GalleryCollege from "../pages/nonuserpages/GalleryCollege";
import GalleryInfoPage from "../pages/nonuserpages/GalleryInfoPage";
import PlacementPage from "../pages/nonuserpages/PlacementPage";
import PlacementStoryPage from "../pages/nonuserpages/PlacementStoryPage";
import UpcomingPage from "../pages/nonuserpages/UpcomingPage";
import ProfessorPage from "../pages/nonuserpages/ProfessorPage";
import BranchesPage from "../pages/nonuserpages/BranchesPage";
import ContactPage from "../pages/nonuserpages/ContactPage";
import VideoTestiomoniualsPage from "../pages/nonuserpages/VideoTestiomoniualsPage";

// USER Pages (inside user layout)
import AppitudeExam from "../pages/user/AppitudeExam";
import TestExam from "../pages/user/TestExam";
import TestSuccess from "../pages/user/TestSuccess";
import Result from "../pages/user/Result";
import Certification from "../pages/user/Certification";

// ADMIN Pages (inside admin layout)
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
import AddCoursesPage from "../pages/admin/AddCorsesPage";
import CollegeVisitDetailPage from "../pages/admin/CollegeVisitDetailPage";
import GalleryEventDetailPage from "../pages/admin/GalleryEventDetailPage";
import PlacementDetailPage from "../pages/admin/PlacementDetailPage";
import RegisterDetailPage from "../pages/admin/RegisterDetailPage";
import TestCompleteDetailPage from "../pages/admin/TestCompleteDetailPage";

// Auth
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

const AppRoutes = () => {
  const { isLoggedIn, isLoading, user } = useAuth();

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <Routes>
      {/* 🌍 PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:categoryName" element={<CoursesDetailPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/gallery/:collegeId" element={<GalleryCollege />} />
        <Route path="/gallery/album/:id" element={<GalleryInfoPage />} />
        <Route path="/placements" element={<PlacementPage />} />
        <Route path="/placements/:year/:id" element={<PlacementStoryPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        <Route path="/branch" element={<BranchesPage />} />
        <Route path="/professor" element={<ProfessorPage />} />
        <Route
          path="/videotestimonials"
          element={<VideoTestiomoniualsPage />}
        />
        <Route path="/contact" element={<ContactPage />} />

        {/* AUTH ROUTES (Public layout) */}
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login />
            ) : user?.role === "admin" ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/appitude" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isLoggedIn ? (
              <Signup />
            ) : user?.role === "admin" ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/appitude" replace />
            )
          }
        />
      </Route>

      {/* 👤 USER ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route element={<UserLayout />}>
          <Route path="/appitude" element={<AppitudeExam />} />
          <Route path="/exam" element={<TestExam />} />
          <Route path="/success" element={<TestSuccess />} />
          <Route path="/result" element={<Result />} />
          <Route path="/certification" element={<Certification />} />
        </Route>
      </Route>

      {/* 🛠 ADMIN ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/totaldashboard" element={<TotalRegisterDashboard />} />
          <Route path="/registerdashboard" element={<NewRegisterDashboard />} />
          <Route path="/testdashboard" element={<CompletedTestDashboard />} />
          <Route path="/visitdashboard" element={<CollegeVisitDashboard />} />
          <Route
            path="/placementdashboard"
            element={<TotalPlacementDashboard />}
          />
          <Route path="/reviewsdashboard" element={<TotalReviewsDashboard />} />
          <Route path="/galleryevent" element={<GalleryEventPage />} />
          <Route path="/admincourses" element={<AdminCoursesPage />} />
          <Route
            path="/adminnotification"
            element={<AdminNotificationPage />}
          />
          <Route path="/adminprofile" element={<AdminProfile />} />
          <Route path="/addcourses" element={<AddCoursesPage />} />
          <Route path="/visitdetail" element={<CollegeVisitDetailPage />} />
          <Route path="/eventdetail" element={<GalleryEventDetailPage />} />
          <Route path="/placementdetail" element={<PlacementDetailPage />} />
          <Route path="/registerdetail" element={<RegisterDetailPage />} />
          <Route path="/completedetail" element={<TestCompleteDetailPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
