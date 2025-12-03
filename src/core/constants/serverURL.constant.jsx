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

    //BATCH APIs
    static API_ADD_BATCH = ServerUrl.API_MODULE_MASTER + "/batches";
    static API_GET_BATCHES = ServerUrl.API_MODULE_MASTER + "/batches";
    static API_GET_BATCH_BY_ID = ServerUrl.API_MODULE_MASTER + "/batches/"; // + id
    static API_UPDATE_BATCH = ServerUrl.API_MODULE_MASTER + "/batches/"; // + id
    static API_DELETE_BATCH = ServerUrl.API_MODULE_MASTER + "/batches/"; // + id
 
    // MEDIA MODULE
    static API_MODULE_MEDIA = "/api/media";    

    // CITY APIs
    static API_ADD_CITY = ServerUrl.API_MODULE_MEDIA + "/city";
    static API_GET_CITIES = ServerUrl.API_MODULE_MEDIA + "/city";
    static API_UPDATE_CITY = ServerUrl.API_MODULE_MEDIA + "/city/";   // + id
    static API_DELETE_CITY = ServerUrl.API_MODULE_MEDIA + "/city/";   // + id

    // COLLEGE APIs
    static API_ADD_COLLEGE = ServerUrl.API_MODULE_MEDIA + "/college";
    static API_GET_COLLEGES_BY_CITY = ServerUrl.API_MODULE_MEDIA + "/college/"; // + cityId
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
    static API_CREATE_EVENT = ServerUrl.API_MODULE_EVENTS + "/";
    static API_GET_ALL_EVENTS = ServerUrl.API_MODULE_EVENTS + "/";
    static API_GET_EVENT_BY_ID = ServerUrl.API_MODULE_EVENTS + "/";     // + id
    static API_UPDATE_EVENT = ServerUrl.API_MODULE_EVENTS + "/";        // + id
    static API_DELETE_EVENT = ServerUrl.API_MODULE_EVENTS + "/";        // + id

    // EVENT IMAGES
    static API_UPLOAD_EVENT_IMAGE = ServerUrl.API_MODULE_EVENTS + "/upload";
    static API_DELETE_EVENT_IMAGE = ServerUrl.API_MODULE_EVENTS + "/image/";   // + id

    // TESTS MODULE
    static API_MODULE_TESTS = "/api/tests";

    // CATEGORY APIs
    static API_CREATE_TEST_CATEGORY = ServerUrl.API_MODULE_TESTS + "/category";
    static API_GET_TEST_CATEGORIES = ServerUrl.API_MODULE_TESTS + "/category";

    // TEST APIs
    static API_CREATE_TEST = ServerUrl.API_MODULE_TESTS + "/";
    static API_GET_TESTS = ServerUrl.API_MODULE_TESTS + "/";
    static API_GET_TEST_BY_ID = ServerUrl.API_MODULE_TESTS + "/";          // + id
    static API_GET_TEST_BY_ID_ALT = ServerUrl.API_MODULE_TESTS + "/tests/"; // + id

    // QUESTION APIs
    static API_CREATE_QUESTION = ServerUrl.API_MODULE_TESTS + "/question";

    // OPTION APIs
    static API_ADD_OPTION = ServerUrl.API_MODULE_TESTS + "/option";

    // SUBMIT TEST
    static API_SUBMIT_TEST = ServerUrl.API_MODULE_TESTS + "/submit";

}
console.log("ServerUrl Loaded:", {
  API_BASE: ServerUrl.REACT_APP_API_URL,
  LOGIN: ServerUrl.API_LOGIN,
  COURSES: ServerUrl.API_GET_COURSES
});

export default ServerUrl;