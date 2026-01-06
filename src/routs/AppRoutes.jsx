import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "../core/constants/routes.constant";

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
import TotalPlacementDashboard from "../pages/admin/TotalPlacementDashboard";
import TotalReviewsDashboard from "../pages/admin/TotalReviewsDashboard";
import AdminCoursesPage from "../pages/admin/AdminCoursesPage";
import AdminNotificationPage from "../pages/admin/AdminNotificationPage";
import AdminProfile from "../pages/admin/AdminProfile";
import AddCoursesPage from "../pages/admin/AddCorsesPage";
import PlacementDetailPage from "../pages/admin/PlacementDetailPage";
import RegisterDetailPage from "../pages/admin/RegisterDetailPage";
import TestCompleteDetailPage from "../pages/admin/TestCompleteDetailPage";
import GalleryForm from "../pages/admin/GalleryForm";
import GalleryCollegeDetailPage from "../pages/admin/GalleryCollegeDetailPage";
import GalleryEventPage from "../pages/admin/GalleryEventPage";
import GalleryEventDetailPage from "../pages/admin/GalleryEventDetailPage";
import TotalReviewsForm from "../pages/admin/TotalReviewsForm";
import BlogsForm from "../pages/admin/BlogsForm";
import AdminBlogsPage from "../pages/admin/AdminBlogsPage";
import AdminFacultyPage from "../pages/admin/AdminFacultyPage";
import AdminFacultyForm from "../pages/admin/AdminFacultyForm";
import TestCategoryForm from "../pages/admin/TestCategoryForm";

// Auth
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import AdminTestDashboardPage from "../pages/admin/AdminTestDashboardPage";
import AdminQuestionsDashboardPage from "../pages/admin/AdminQuestionsDashboardPage";
import QuestionsForm from "../pages/admin/QuestionsForm";

const AppRoutes = () => {

  return (
    <Routes>
      {/* AUTH ROUTES (Public layout) */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />

      {/* 🌍 PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.COURSES} element={<CoursesPage />} />
        <Route path={ROUTES.COURSE_DETAILS} element={<CoursesDetailPage />} />
        <Route path={ROUTES.GALLERY} element={<GalleryPage />} />
        <Route path={ROUTES.GALLERY_INFO} element={<GalleryInfoPage />} />
        <Route path={ROUTES.PLACEMENTS} element={<PlacementPage />} />
        <Route path={ROUTES.PLACEMENT_STORY} element={<PlacementStoryPage />} />
        <Route path={ROUTES.UPCOMING} element={<UpcomingPage />} />
        <Route path={ROUTES.BRANCHES} element={<BranchesPage />} />
        <Route path={ROUTES.PROFESSOR} element={<ProfessorPage />} />
        <Route
          path={ROUTES.VIDEO_TESTIMONIALS}
          element={<VideoTestiomoniualsPage />}
        />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
      </Route>

      {/* 👤 USER ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER_APPITUDE} element={<AppitudeExam />} />
          <Route path={`${ROUTES.USER_EXAM}/:id`} element={<TestExam />} />
          <Route path={ROUTES.USER_SUCCESS} element={<TestSuccess />} />
          <Route path={ROUTES.USER_RESULT} element={<Result />} />
          <Route path={ROUTES.USER_CERTIFICATION} element={<Certification />} />
        </Route>
      </Route>

      {/* 🛠 ADMIN ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
          <Route path={ROUTES.ADMIN_TOTAL_REGISTER} element={<TotalRegisterDashboard />} />
          <Route path={ROUTES.ADMIN_NEW_REGISTER} element={<NewRegisterDashboard />} />
          {/* Faculty */}
          <Route path={ROUTES.ADMIN_FACULTY} element={<AdminFacultyPage />} />
          <Route path={ROUTES.ADMIN_FACULTY_FORM} element={<AdminFacultyForm />} />
          <Route path={ROUTES.ADMIN_FACULTY_FORM_EDIT} element={<AdminFacultyForm />} />
          {/* Video */}
          <Route path={ROUTES.ADMIN_BLOGS} element={<AdminBlogsPage />} />
          <Route path={ROUTES.ADMIN_BLOGS_FORM} element={<BlogsForm />} />
          <Route path={ROUTES.ADMIN_BLOGS_FORM_EDIT} element={<BlogsForm />} />
          {/* Reviews */}
          <Route path={ROUTES.ADMIN_REVIEWS} element={<TotalReviewsDashboard />} />
          <Route path={ROUTES.ADMIN_REVIEW_EDIT} element={<TotalReviewsForm />} />
          <Route path={ROUTES.ADMIN_REVIEW_ADD} element={<TotalReviewsForm />} />
          {/* Gallery */}
          <Route path={ROUTES.ADMIN_GALLERY_FORM} element={<GalleryForm />} />
            {/*gallery event */}
            <Route path={ROUTES.ADMIN_GALLERY_EVENT} element={<GalleryEventPage />} />
            <Route path={ROUTES.ADMIN_EVENT_DETAIL_ADD} element={<GalleryEventDetailPage />} />
            <Route path={ROUTES.ADMIN_EVENT_DETAIL_EDIT} element={<GalleryEventDetailPage />} />
            {/* gallery college */}
            <Route path={ROUTES.ADMIN_EVENT_COLLEGE_ADD} element={<GalleryCollegeDetailPage />} />
            <Route path={ROUTES.ADMIN_EVENT_COLLEGE_EDIT} element={<GalleryCollegeDetailPage />} />
          {/* Courses */}
          <Route path={ROUTES.ADMIN_COURSES} element={<AdminCoursesPage />} />
          <Route path={ROUTES.ADMIN_ADD_COURSE} element={<AddCoursesPage />} />
          <Route path={ROUTES.ADMIN_ADD_COURSE_WITH_ID} element={<AddCoursesPage />} />
          {/* Placement */}
          <Route
            path={ROUTES.ADMIN_TOTAL_PLACEMENTS}
            element={<TotalPlacementDashboard />}
          />
          <Route path={ROUTES.ADMIN_PLACEMENT_DETAIL} element={<PlacementDetailPage />} />
          <Route path={ROUTES.ADMIN_PLACEMENT_DETAIL_EDIT} element={<PlacementDetailPage />} />
          {/* Admin Test */}
          {/* Test Category */}
          <Route path={ROUTES.ADMIN_TEST_DASHBOARD} element={<AdminTestDashboardPage />} />
          <Route path={ROUTES.ADMIN_TEST_CATEGORY_FORM} element={<TestCategoryForm />} />
          <Route path={`${ROUTES.ADMIN_TEST_CATEGORY_FORM_EDIT}/:id`} element={<TestCategoryForm />} />
          {/* Admin Questions */}
          <Route path={`${ROUTES.ADMIN_QUESTION_DASHBOARD_BY_ID}/:id`} element={<AdminQuestionsDashboardPage />} />
          <Route path={ROUTES.ADMIN_QUESTION_FORM} element={<QuestionsForm />} />
          <Route path={`${ROUTES.ADMIN_QUESTION_FORM_EDIT}/:id`} element={<QuestionsForm />} />
          {/*  */}
          <Route path={ROUTES.ADMIN_REGISTER_DETAIL} element={<RegisterDetailPage />} />
          <Route path={ROUTES.ADMIN_TEST_COMPLETE_DETAIL} element={<TestCompleteDetailPage />} />
          <Route
            path={ROUTES.ADMIN_NOTIFICATION}
            element={<AdminNotificationPage />}
          />
          <Route path={ROUTES.ADMIN_PROFILE} element={<AdminProfile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
