import axios from "axios";
import { APPLICATION_CONSTANTS } from "../constants/app.constant";
import StorageService from "./storage.service";
import ServerUrl from "../constants/serverURL.constant";

class ApiInterceptor {
  static axiosReference = axios.create({
    baseURL: ServerUrl.REACT_APP_API_URL,
  });

  static requestCounts = 0;

  static init() {
    ApiInterceptor.axiosReference.interceptors.request.use((config) => {
      ApiInterceptor.requestCounts++;

      console.log("Requesting to:", config.baseURL); // Logs actual base URL
      config.headers = {
        ...config.headers,
        ...this.generateHeader(),
      };

      return config;
    });

    ApiInterceptor.axiosReference.interceptors.response.use(
      (response) => {
        ApiInterceptor.requestCounts--;
        return response;
      },
      (err) => {
        ApiInterceptor.requestCounts--;
        console.error("API Error =>", err);
        return Promise.reject(err);
      }
    );

    return ApiInterceptor.axiosReference;
  }

  static generateHeader() {
<<<<<<< HEAD
    const storedUser = localStorage.getItem("user");
    
    if (!storedUser) {
      console.log("No user found in localStorage");
      return {};
    }
  
    const user = JSON.parse(storedUser);
  
    if (!user.token) {
      console.log("No token found inside user object");
      return {};
    }
  
    console.log("TOKEN FOUND:", user.token);
  
    return {
      Authorization: `Bearer ${user.token}`,
    };
=======
    const token = StorageService.getData(APPLICATION_CONSTANTS.STORAGE.TOKEN);
    console.log(StorageService.getData(APPLICATION_CONSTANTS.STORAGE.TOKEN));
    return token ? { Authorization: `Bearer ${token}` } : {};
>>>>>>> 33f5ff6a0411adf3f6b8dc08bd0f15639330bfad
  }
}

export default ApiInterceptor;