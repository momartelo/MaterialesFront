import { API_URL } from "../utils/config";

export const fetchCategories = async (token) => {
  try {
    const response = await fetch(`${API_URL}/category`, {
      headers: {
        Authorization: token,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchCategoriesWithoutAuth = async () => {
  try {
    const response = await fetch(`${API_URL}/category`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
