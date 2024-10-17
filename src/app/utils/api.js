import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch data from the server

export async function getPlayersStatsOverview() {
  try {
    const response = await axiosInstance.get("players_stats/overview");
    return response.data;
  } catch (error) {
    console.log(error?.message);
  }
}
export async function getPlayersStats(params) {
  try {
    const response = await axiosInstance.get("players_stats", { params });
    return response.data;
  } catch (error) {
    console.log(error?.message);
  }
}
