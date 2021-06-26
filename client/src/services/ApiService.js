import axiosInstance from "./axiosInstance";

class APIService {
  getProducts = () => this.get("/api/products");
  get = (url) => axiosInstance.get(url);
  post = (url, data) => axiosInstance.post(url, data);
  delete = (url) => axiosInstance.delete(url);
  put = (url, data) => axiosInstance.put(url, data);
}

let apiService = new APIService();
export default apiService;
