import { API_KEY } from "../config";
import { axiosService } from "./axios";

class Movies {
  getPopularMovie(page: number) {
    return axiosService.get(`movie/top_rated?api_key=${API_KEY}&page=${page}`);
  }
}

class ApiService {
  public movies = new Movies();
}

const apiService = new ApiService();

export { apiService };
