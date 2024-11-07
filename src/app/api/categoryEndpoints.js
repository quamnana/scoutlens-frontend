import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getCategories(field, params = {}) {
  try {
    const response = await axiosInstance.get(`categories/${field}`, { params });
    return response.data;
  } catch (error) {
    console.log(error?.message);
  }
}
