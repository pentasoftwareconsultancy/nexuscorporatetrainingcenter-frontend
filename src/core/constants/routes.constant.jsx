export const ROUTES = {
  //  Public Pages
  HOME: "/",
  ABOUT: "/about",
  COURSES: "/courses",
  COURSE_DETAILS: "/courses/category/:categoryId",
  GALLERY: "/gallery",
  GALLERY_COLLEGE: "/gallery/:collegeId",
  GALLERY_INFO: "/gallery/:id",
  PLACEMENTS: "/placements",
  PLACEMENT_STORY: "/placements/:year/:id",
  UPCOMING: "/upcoming",
  BRANCHES: "/branch",
  PROFESSOR: "/professor",
  VIDEO_TESTIMONIALS: "/videotestimonials",
  CONTACT: "/contact",

  //  Auth Pages
  LOGIN: "/login",
  SIGNUP: "/signup",

  //  User Dashboard Pages
  USER_APPITUDE: "/appitude",
  USER_EXAM: "/exam",
  USER_SUCCESS: "/success",
  USER_RESULT: "/result",
  USER_CERTIFICATION: "/certification",

  // Admin Dashboard Pages
  ADMIN_DASHBOARD: "/dashboard",
  ADMIN_TOTAL_REGISTER: "/totaldashboard",
  ADMIN_NEW_REGISTER: "/registerdashboard",
  ADMIN_TEST_COMPLETED: "/testdashboard",
  ADMIN_COLLEGE_VISIT: "/visitdashboard",
  ADMIN_REVIEWS: "/reviewsdashboard",
  //Gallery
  ADMIN_GALLERY_FORM: "/galleryform",
    // gallery event
    ADMIN_GALLERY_EVENT: "/galleryevent",
    ADMIN_EVENT_DETAIL_ADD: "/eventdetail/add",
    ADMIN_EVENT_DETAIL_EDIT: "/eventdetail/edit/:id",
    // gallery college
    ADMIN_GALLERY_COLLEGE: "/gallerycollege",
    ADMIN_EVENT_COLLEGE_ADD: "/eventcollege/add",
    ADMIN_EVENT_COLLEGE_EDIT: "/eventcollege/edit/:id",
  //Courses
  ADMIN_COURSES: "/admincourses",
  ADMIN_ADD_COURSE: "/addcourses",
  ADMIN_ADD_COURSE_WITH_ID: "/addcourses/:id",
  //Placement
  ADMIN_TOTAL_PLACEMENTS: "/placementdashboard",
  ADMIN_PLACEMENT_DETAIL: "/placementdetail",
  ADMIN_PLACEMENT_DETAIL_EDIT: "/placementdetail/:id",
  // 
  ADMIN_NOTIFICATION: "/adminnotification",
  ADMIN_PROFILE: "/adminprofile",
  ADMIN_VISIT_DETAIL: "/visitdetail",
  ADMIN_REGISTER_DETAIL: "/registerdetail",
  ADMIN_TEST_COMPLETE_DETAIL: "/completedetail",
};
