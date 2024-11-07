import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch data from the server

export async function getPlayersOverview() {
  try {
    const response = await axiosInstance.get("players/overview");
    return response.data;
  } catch (error) {
    console.log(error?.message);
  }
}
export async function getPlayersStats(params) {
  try {
    const response = await axiosInstance.get("players", { params });
    return response.data;
  } catch (error) {
    console.log(error?.message);
  }
}

export async function getPlayersStatsFilterParams(params) {
  try {
    const response = await axiosInstance.get("players/", {
      params,
    });
    return response.data;
  } catch (error) {
    console.log(error?.message);
  }
}
