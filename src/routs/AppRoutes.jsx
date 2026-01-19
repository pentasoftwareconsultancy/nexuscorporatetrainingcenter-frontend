import React from "react";
import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "../core/constants/routes.constant";
import { LazyLoad } from "../core";

/* ======================= LAYOUTS (NORMAL IMPORTS) ======================= */
import PublicLayout from "../components/layout/PublicLayout";
import UserLayout from "../components/layout/UserLayout";
import AdminLayout from "../components/layout/AdminLayout";

/* ======================= PUBLIC PAGES ======================= */
const HomePage = lazy(() => import("../pages/nonuserpages/HomePage"));
const AboutPage = lazy(() => import("../pages/nonuserpages/AboutPage"));
const CoursesPage = lazy(() => import("../pages/nonuserpages/CoursesPage"));
const CoursesDetailPage = lazy(() => import("../pages/nonuserpages/CoursesDetailPage"));
const GalleryPage = lazy(() => import("../pages/nonuserpages/GalleryPage"));
const GalleryInfoPage = lazy(() => import("../pages/nonuserpages/GalleryInfoPage"));
const PlacementPage = lazy(() => import("../pages/nonuserpages/PlacementPage"));
const PlacementStoryPage = lazy(() => import("../pages/nonuserpages/PlacementStoryPage"));
const UpcomingPage = lazy(() => import("../pages/nonuserpages/UpcomingPage"));
const ProfessorPage = lazy(() => import("../pages/nonuserpages/ProfessorPage"));
const BranchesPage = lazy(() => import("../pages/nonuserpages/BranchesPage"));
const ContactPage = lazy(() => import("../pages/nonuserpages/ContactPage"));
const VideoTestiomoniualsPage = lazy(() => import("../pages/nonuserpages/VideoTestiomoniualsPage"));

/* ======================= AUTH ======================= */
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));

/* ======================= USER PAGES ======================= */
const AppitudeExam = lazy(() => import("../pages/user/AppitudeExam"));
const TestExam = lazy(() => import("../pages/user/TestExam"));
const TestSuccess = lazy(() => import("../pages/user/TestSuccess"));
const Result = lazy(() => import("../pages/user/Result"));
const Certification = lazy(() => import("../pages/user/Certification"));

/* ======================= ADMIN PAGES ======================= */
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const TotalRegisterDashboard = lazy(() =>import("../pages/admin/TotalRegisterDashboard"));
const NewRegisterDashboard = lazy(() =>import("../pages/admin/NewRegisterDashboard"));
const TotalPlacementDashboard = lazy(() =>import("../pages/admin/TotalPlacementDashboard"));
const TotalReviewsDashboard = lazy(() =>import("../pages/admin/TotalReviewsDashboard"));
const AdminCoursesPage = lazy(() =>import("../pages/admin/AdminCoursesPage"));
const AdminNotificationPage = lazy(() =>import("../pages/admin/AdminNotificationPage"));
const AdminProfile = lazy(() => import("../pages/admin/AdminProfile"));
const AddCoursesPage = lazy(() =>import("../pages/admin/AddCorsesPage"));
const PlacementDetailPage = lazy(() =>import("../pages/admin/PlacementDetailPage"));
const GalleryForm = lazy(() => import("../pages/admin/GalleryForm"));
const GalleryCollegeDetailPage = lazy(() =>import("../pages/admin/GalleryCollegeDetailPage"));
const GalleryEventPage = lazy(() =>import("../pages/admin/GalleryEventPage"));
const GalleryEventDetailPage = lazy(() =>import("../pages/admin/GalleryEventDetailPage"));
const TotalReviewsForm = lazy(() =>import("../pages/admin/TotalReviewsForm"));
const BlogsForm = lazy(() => import("../pages/admin/BlogsForm"));
const AdminBlogsPage = lazy(() =>import("../pages/admin/AdminBlogsPage"));
const AdminFacultyPage = lazy(() =>import("../pages/admin/AdminFacultyPage"));
const AdminFacultyForm = lazy(() =>import("../pages/admin/AdminFacultyForm"));
const TestCategoryForm = lazy(() =>import("../pages/admin/TestCategoryForm"));
const AdminTestDashboardPage = lazy(() =>import("../pages/admin/AdminTestDashboardPage"));
const AdminQuestionsDashboardPage = lazy(() =>import("../pages/admin/AdminQuestionsDashboardPage"));
const QuestionsForm = lazy(() =>import("../pages/admin/QuestionsForm"));
const AdminBatchPage = lazy(() => import("../pages/admin/AdminBatchPage"));
const BatchFormPage = lazy(() => import("../pages/admin/BatchFormPage"));

const AppRoutes = () => {
  
  return (
    <Routes>
      {/* ================= AUTH ROUTES ================= */}
      <Route
        path={ROUTES.LOGIN}
        element={<LazyLoad component={Login} />}
      />
      <Route
        path={ROUTES.SIGNUP}
        element={<LazyLoad component={Signup} />}
      />

      {/* ================= PUBLIC ROUTES ================= */}
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.HOME} element={<LazyLoad component={HomePage} />} />
        <Route path={ROUTES.ABOUT} element={<LazyLoad component={AboutPage} />} />
        <Route path={ROUTES.COURSES} element={<LazyLoad component={CoursesPage} />} />
        <Route path={ROUTES.COURSE_DETAILS} element={<LazyLoad component={CoursesDetailPage} />} />
        <Route path={ROUTES.GALLERY} element={<LazyLoad component={GalleryPage} />} />
        <Route path={ROUTES.GALLERY_INFO} element={<LazyLoad component={GalleryInfoPage} />} />
        <Route path={ROUTES.PLACEMENTS} element={<LazyLoad component={PlacementPage} />} />
        <Route path={ROUTES.PLACEMENT_STORY} element={<LazyLoad component={PlacementStoryPage} />} />
        <Route path={ROUTES.UPCOMING} element={<LazyLoad component={UpcomingPage} />} />
        <Route path={ROUTES.BRANCHES} element={<LazyLoad component={BranchesPage} />} />
        <Route path={ROUTES.PROFESSOR} element={<LazyLoad component={ProfessorPage} />} />
        <Route
          path={ROUTES.VIDEO_TESTIMONIALS}
          element={<LazyLoad component={VideoTestiomoniualsPage} />}
        />
        <Route path={ROUTES.CONTACT} element={<LazyLoad component={ContactPage} />} />
      </Route>

      {/* ================= USER ROUTES ================= */}
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER_APPITUDE} element={<LazyLoad component={AppitudeExam} />} />
          <Route path={`${ROUTES.USER_EXAM}/:id`} element={<LazyLoad component={TestExam} />} />
          <Route path={ROUTES.USER_SUCCESS} element={<LazyLoad component={TestSuccess} />} />
          <Route path={ROUTES.USER_RESULT} element={<LazyLoad component={Result} />} />
          <Route path={ROUTES.USER_CERTIFICATION} element={<LazyLoad component={Certification} />} />
        </Route>
      </Route>

      {/* ================= ADMIN ROUTES ================= */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<LazyLoad component={AdminDashboard} />} />
          <Route path={ROUTES.ADMIN_TOTAL_REGISTER} element={<LazyLoad component={TotalRegisterDashboard} />} />
          <Route path={ROUTES.ADMIN_NEW_REGISTER} element={<LazyLoad component={NewRegisterDashboard} />} />

          {/* Faculty */}
          <Route path={ROUTES.ADMIN_FACULTY} element={<LazyLoad component={AdminFacultyPage} />} />
          <Route path={ROUTES.ADMIN_FACULTY_FORM} element={<LazyLoad component={AdminFacultyForm} />} />
          <Route path={ROUTES.ADMIN_FACULTY_FORM_EDIT} element={<LazyLoad component={AdminFacultyForm} />} />

          {/* Blogs */}
          <Route path={ROUTES.ADMIN_BLOGS} element={<LazyLoad component={AdminBlogsPage} />} />
          <Route path={ROUTES.ADMIN_BLOGS_FORM} element={<LazyLoad component={BlogsForm} />} />
          <Route path={ROUTES.ADMIN_BLOGS_FORM_EDIT} element={<LazyLoad component={BlogsForm} />} />

          {/* Reviews */}
          <Route path={ROUTES.ADMIN_REVIEWS} element={<LazyLoad component={TotalReviewsDashboard} />} />
          <Route path={ROUTES.ADMIN_REVIEW_EDIT} element={<LazyLoad component={TotalReviewsForm} />} />
          <Route path={ROUTES.ADMIN_REVIEW_ADD} element={<LazyLoad component={TotalReviewsForm} />} />

          {/* Gallery */}
          <Route path={ROUTES.ADMIN_GALLERY_FORM} element={<LazyLoad component={GalleryForm} />} />

          {/* Gallery Event */}
          <Route path={ROUTES.ADMIN_GALLERY_EVENT} element={<LazyLoad component={GalleryEventPage} />} />
          <Route path={ROUTES.ADMIN_EVENT_DETAIL_ADD} element={<LazyLoad component={GalleryEventDetailPage} />} />
          <Route path={ROUTES.ADMIN_EVENT_DETAIL_EDIT} element={<LazyLoad component={GalleryEventDetailPage} />} />

          {/* Gallery College */}
          <Route path={ROUTES.ADMIN_EVENT_COLLEGE_ADD} element={<LazyLoad component={GalleryCollegeDetailPage} />} />
          <Route path={ROUTES.ADMIN_EVENT_COLLEGE_EDIT} element={<LazyLoad component={GalleryCollegeDetailPage} />} />

          {/* Courses */}
          <Route path={ROUTES.ADMIN_COURSES} element={<LazyLoad component={AdminCoursesPage} />} />
          <Route path={ROUTES.ADMIN_ADD_COURSE} element={<LazyLoad component={AddCoursesPage} />} />
          <Route path={ROUTES.ADMIN_ADD_COURSE_WITH_ID} element={<LazyLoad component={AddCoursesPage} />} />

          {/* Placement */}
          <Route path={ROUTES.ADMIN_TOTAL_PLACEMENTS} element={<LazyLoad component={TotalPlacementDashboard} />} />
          <Route path={ROUTES.ADMIN_PLACEMENT_DETAIL} element={<LazyLoad component={PlacementDetailPage} />} />
          <Route path={ROUTES.ADMIN_PLACEMENT_DETAIL_EDIT} element={<LazyLoad component={PlacementDetailPage} />} />

          {/* Test */}
          <Route path={ROUTES.ADMIN_TEST_DASHBOARD} element={<LazyLoad component={AdminTestDashboardPage} />} />
          <Route path={ROUTES.ADMIN_TEST_CATEGORY_FORM} element={<LazyLoad component={TestCategoryForm} />} />
          <Route path={`${ROUTES.ADMIN_TEST_CATEGORY_FORM_EDIT}/:id`} element={<LazyLoad component={TestCategoryForm} />} />

          {/* Questions */}
          <Route path={`${ROUTES.ADMIN_QUESTION_DASHBOARD_BY_ID}/:id`} element={<LazyLoad component={AdminQuestionsDashboardPage} />} />
          <Route path={ROUTES.ADMIN_QUESTION_FORM} element={<LazyLoad component={QuestionsForm} />} />
          <Route path={`${ROUTES.ADMIN_QUESTION_FORM_EDIT}/:id`} element={<LazyLoad component={QuestionsForm} />} />

          {/* Batches */}
          <Route path={`${ROUTES.ADMIN_BATCH_PAGE}`} element={<LazyLoad component={AdminBatchPage} />} />
          <Route path={`${ROUTES.ADMIN_BATCH_FORM}`} element={<LazyLoad component={BatchFormPage} />} />
          <Route path={`${ROUTES.ADMIN_BATCH_FORM_EDIT}`} element={<LazyLoad component={BatchFormPage} />} />

          {/* Misc */}
          <Route path={ROUTES.ADMIN_NOTIFICATION} element={<LazyLoad component={AdminNotificationPage} />} />
          <Route path={ROUTES.ADMIN_PROFILE} element={<LazyLoad component={AdminProfile} />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;

