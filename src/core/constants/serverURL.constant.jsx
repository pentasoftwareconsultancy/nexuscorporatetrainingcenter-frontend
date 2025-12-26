import { API_MODULE } from "../models/api.module";
class ServerUrl {
    
    // Base URL
    static REACT_APP_API_URL = import.meta.env.VITE_API_URL;

    // USER AUTH MODULE
    static API_MODULE_USER = "/api/auth";
    static API_LOGIN = ServerUrl.API_MODULE_USER + "/login";
    static API_REGISTER = ServerUrl.API_MODULE_USER + "/signup";

    // master module
    static API_MODULE_MASTER = "/api/master";    

    // COURSE CATEGORY APIs
    static API_ADD_COURSE_CATEGORY = ServerUrl.API_MODULE_MASTER + "/course-category";
    static API_GET_COURSE_CATEGORIES = ServerUrl.API_MODULE_MASTER + "/course-category";
    static API_GET_COURSE_CATEGORY_BY_ID = ServerUrl.API_MODULE_MASTER + "/course-category/"; // + id
    static API_UPDATE_COURSE_CATEGORY = ServerUrl.API_MODULE_MASTER + "/course-category/"; // + id
    static API_DELETE_COURSE_CATEGORY = ServerUrl.API_MODULE_MASTER + "/course-category/"; // + id

    // COURSES APIs
    static API_ADD_COURSE = ServerUrl.API_MODULE_MASTER + "/courses";
    static API_GET_COURSES = ServerUrl.API_MODULE_MASTER + "/courses";
    static API_GET_COURSE_BY_ID = ServerUrl.API_MODULE_MASTER + "/courses/"; // + id
    static API_UPDATE_COURSE = ServerUrl.API_MODULE_MASTER + "/courses/"; // + id
    static API_DELETE_COURSE = ServerUrl.API_MODULE_MASTER + "/courses/"; // + id
    static API_ADD_COURSE_WITH_DETAILS = ServerUrl.API_MODULE_MASTER + "/courses-full";

    // COURSES DETAILS APIs
    static API_ADD_COURSE_DETAILS = ServerUrl.API_MODULE_MASTER + "/course-details"
    static API_GET_COURSE_DETAILS = ServerUrl.API_MODULE_MASTER + "/course-details";
    static API_GET_COURSE_DETAILS_BY_ID = ServerUrl.API_MODULE_MASTER + "/course-details/"; // + id
    static API_UPDATE_COURSE_DETAILS = ServerUrl.API_MODULE_MASTER + "/course-details/"; // + id
    static API_DELETE_COURSE_DETAILS = ServerUrl.API_MODULE_MASTER + "/course-details/"; // + id
    static API_GET_CATEGORY_WITH_COURSES = ServerUrl.API_MODULE_MASTER + "/categories-with-courses";

    //BATCH APIs
    static API_ADD_BATCH = ServerUrl.API_MODULE_MASTER + "/batches";
    static API_GET_BATCHES = ServerUrl.API_MODULE_MASTER + "/batches";
    static API_GET_BATCH_BY_ID = ServerUrl.API_MODULE_MASTER + "/batches/"; // + id
    static API_UPDATE_BATCH = ServerUrl.API_MODULE_MASTER + "/batches/"; // + id
    static API_DELETE_BATCH = ServerUrl.API_MODULE_MASTER + "/batches/"; // + id
 
    // MEDIA MODULE / GALLERY MODULE
    static API_MODULE_MEDIA = "/api/media";    

    // CITY APIs
    static API_ADD_CITY = ServerUrl.API_MODULE_MEDIA + "/city";
    static API_GET_CITIES = ServerUrl.API_MODULE_MEDIA + "/city";
    static API_UPDATE_CITY = ServerUrl.API_MODULE_MEDIA + "/city/";   // + id
    static API_DELETE_CITY = ServerUrl.API_MODULE_MEDIA + "/city/";   // + id

    // COLLEGE APIs
    static API_ADD_COLLEGE = ServerUrl.API_MODULE_MEDIA + "/college";
    static API_GET_COLLEGES_BY_CITY = ServerUrl.API_MODULE_MEDIA + "/college/"; // + cityId
    static API_GET_COLLEGES_BY_ID = ServerUrl.API_MODULE_MEDIA + "/college/single/"; // + id
    static API_UPDATE_COLLEGE = ServerUrl.API_MODULE_MEDIA + "/college/";       // + id
    static API_DELETE_COLLEGE = ServerUrl.API_MODULE_MEDIA + "/college/";       // + id

    // IMAGE APIs
    static API_UPLOAD_IMAGE = ServerUrl.API_MODULE_MEDIA + "/image/upload";
    static API_GET_IMAGES_BY_COLLEGE = ServerUrl.API_MODULE_MEDIA + "/image/"; // + collegeId

    // MEDIA CRUD APIs
    static API_UPDATE_MEDIA = ServerUrl.API_MODULE_MEDIA + "/media/"; // + id
    static API_DELETE_MEDIA = ServerUrl.API_MODULE_MEDIA + "/media/"; // + id

    // EVENT MODULE
    static API_MODULE_EVENTS = "/api/events";

    // EVENT CRUD
    static API_CREATE_EVENT = ServerUrl.API_MODULE_EVENTS + "/gallery";
    static API_GET_ALL_EVENTS = ServerUrl.API_MODULE_EVENTS + "/gallery";
    static API_GET_EVENT_BY_ID = ServerUrl.API_MODULE_EVENTS + "/gallery";     // + id
    static API_UPDATE_EVENT = ServerUrl.API_MODULE_EVENTS + "/gallery";        // + id
    static API_DELETE_EVENT = ServerUrl.API_MODULE_EVENTS + "/gallery";        // + id

    // EVENT IMAGES
    static API_UPLOAD_EVENT_IMAGE = ServerUrl.API_MODULE_EVENTS + "/upload";
    static API_DELETE_EVENT_IMAGE = ServerUrl.API_MODULE_EVENTS + "/image/";   // + id

    // EVENT STORIES
    static API_CREATE_EVENTSTORIES = ServerUrl.API_MODULE_EVENTS + "/stories";
    static API_GET_EVENTSTORIES = ServerUrl.API_MODULE_EVENTS + "/stories";
    static API_GET_EVENTSTORY_BY_ID = ServerUrl.API_MODULE_EVENTS + "/stories-id"; // + id
    static API_UPDATE_EVENTSTORIES = ServerUrl.API_MODULE_EVENTS + "/stories"; // + id
    static API_DELETE_EVENTSTORIES = ServerUrl.API_MODULE_EVENTS + "/stories"; // + id

    // TESTS MODULE
    static API_MODULE_TESTS = "/api/tests";

    // CATEGORY APIs
    static API_CREATE_TEST_CATEGORY = ServerUrl.API_MODULE_TESTS + "/category";
    static API_GET_TEST_CATEGORIES = ServerUrl.API_MODULE_TESTS + "/category";

    // TEST APIs
    static API_CREATE_TEST = ServerUrl.API_MODULE_TESTS + "/";
    static API_GET_TESTS = ServerUrl.API_MODULE_TESTS + "/";
    static API_GET_TEST_BY_ID = ServerUrl.API_MODULE_TESTS + "/";          // + 

    // QUESTION APIs
    static API_CREATE_QUESTION = ServerUrl.API_MODULE_TESTS + "/question";
    static API_GET_QUESTIONS_BY_TEST = ServerUrl.API_MODULE_TESTS + "/question/"; // + testId

    // OPTION APIs
    static API_ADD_OPTION = ServerUrl.API_MODULE_TESTS + "/option";
    static API_GET_OPTIONS_BY_QUESTION = ServerUrl.API_MODULE_TESTS + "/option/"; // + questionId

    // SUBMIT TEST
    static API_SUBMIT_TEST = ServerUrl.API_MODULE_TESTS + "/submit";

    // GET TEST RESULT
    static API_GET_TEST_RESULT = ServerUrl.API_MODULE_TESTS + "/latest/"; // + testId

    // USER TEST RESULT APIs
    static API_USER_TEST_RESULT = ServerUrl.API_MODULE_TESTS + "/usertest"; // + /:userTestId/summary

    // VIDEO MODULE
    static API_MODULE_VIDEOS = "/api/uploads";
    
    static API_UPLOAD_VIDEO = ServerUrl.API_MODULE_VIDEOS + "/video";
    static API_GET_VIDEOS = ServerUrl.API_MODULE_VIDEOS + "/video";
    static API_DELETE_VIDEO = ServerUrl.API_MODULE_VIDEOS + "/video"; // + id
    static API_UPDATE_VIDEO = ServerUrl.API_MODULE_VIDEOS + "/video"; // + id

    // Placement MODULE
    static API_MODULE_PLACEMENTS = "/api/placement";

    /* ---------------- CATEGORY APIs ---------------- */
    static API_CREATE_PLACEMENT_CATEGORY = ServerUrl.API_MODULE_PLACEMENTS + "/category";
    static API_GET_PLACEMENT_CATEGORIES = ServerUrl.API_MODULE_PLACEMENTS + "/category";
    static API_UPDATE_PLACEMENT_CATEGORY = ServerUrl.API_MODULE_PLACEMENTS + "/category/";   // + id
    static API_DELETE_PLACEMENT_CATEGORY = ServerUrl.API_MODULE_PLACEMENTS + "/category/";   // + id
    
    /* ---------------- PLACEMENT APIs ---------------- */
    static API_CREATE_PLACEMENT = ServerUrl.API_MODULE_PLACEMENTS + "/";
    static API_GET_PLACEMENTS = ServerUrl.API_MODULE_PLACEMENTS + "/";
    static API_GET_PLACEMENT_BY_ID = ServerUrl.API_MODULE_PLACEMENTS + "/";   // + id
    static API_UPDATE_PLACEMENT = ServerUrl.API_MODULE_PLACEMENTS + "/";      // + id
    static API_DELETE_PLACEMENT = ServerUrl.API_MODULE_PLACEMENTS + "/";      // + id
    static API_GET_CATEGORY_WITH_PLACEMENT = ServerUrl.API_MODULE_PLACEMENTS + "/reports/category-year-wise"
    
    /* ---------------- DETAILS APIs ---------------- */
    static API_GET_ALL_PLACEMENT_DETAILS = ServerUrl.API_MODULE_PLACEMENTS + "/details/all";
    static API_GET_PLACEMENT_DETAILS = ServerUrl.API_MODULE_PLACEMENTS + "/details/";  // + id
    static API_CREATE_PLACEMENT_DETAILS = ServerUrl.API_MODULE_PLACEMENTS + "/details";
    static API_UPDATE_PLACEMENT_DETAILS = ServerUrl.API_MODULE_PLACEMENTS + "/details/"; // + id
    static API_GET_PLACEMENT_AND_DETAILS_BY_ID = ServerUrl.API_MODULE_PLACEMENTS + "/full"; // + id
    static API_DELETE_PLACEMENT_DETAILS = ServerUrl.API_MODULE_PLACEMENTS + "/details"; // + id
    
    /* ---------------- YEAR-WISE REPORT ---------------- */
    static API_PLACEMENT_YEAR_WISE = ServerUrl.API_MODULE_PLACEMENTS + "/reports/year-wise";

    /* ---------------- ALLPLACEMENTDETAILS APIs ---------------- */
    static API_GET_ALL_PLACEMENT_DETAILS_BYID = ServerUrl.API_MODULE_PLACEMENTS + "/allplacementdata/"; // + id
    static API_UPDATE_ALL_PLACEMENT_DETAILS_BYID = ServerUrl.API_MODULE_PLACEMENTS + "/full/";  // + placementId
    static API_CREATE_ALL_PLACEMENT_DETAILS = ServerUrl.API_MODULE_PLACEMENTS + "/full";
    static API_DELETE_ALL_PLACEMENT_DETAILS_BYID = ServerUrl.API_MODULE_PLACEMENTS + "/full/"; // + placementId

    /* -------------------- FACULTYS -------------------- */
    static API_MODULE_FACULTYS = "/api/faculty";
    
    static API_GET_FACULTYS = ServerUrl.API_MODULE_FACULTYS + "/";
    static API_POST_FACULTY = ServerUrl.API_MODULE_FACULTYS + "/";
    static API_UPDATE_FACULTY = ServerUrl.API_MODULE_FACULTYS + "/"; // + id
    static API_DELETE_FACULTY = ServerUrl.API_MODULE_FACULTYS + "/"; // + id

}

export default ServerUrl;