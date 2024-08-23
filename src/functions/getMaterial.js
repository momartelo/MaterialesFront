import { API_URL } from "../utils/config";

export const fetchMaterials = async (token) => {
  try {
    const response = await fetch(`${API_URL}/material`, {
      headers: {
        Authorization: token,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching materials:", error);
    throw error;
  }
};

export const fetchMaterialsWithoutAuth = async () => {
  try {
    const response = await fetch(`${API_URL}/material`, {});
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching materials:", error);
    throw error;
  }
}; // ! el fecth sin autenticarse
