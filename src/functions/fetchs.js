import { API_URL } from "../utils/consts";

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
    const response = await fetch(`${API_URL}/material`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
} catch (error) {
    console.error("Error fetching materials without authentication:", error);
    throw error;
}
};

export const fetchCategories = async (token) => {
  try {
    const response = await fetch(`${API_URL}/categories`, {
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
      const response = await fetch(`${API_URL}/categories`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

export const fetchSubcategories = async (token) => {
  try {
    const response = await fetch(`${API_URL}/subcategories`,{
        headers: {
            Authorization: token,
        },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};

export const fetchSubcategoriesWithoutAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/subcategories`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      throw error;
    }
  };
  
export const fetchUnits = async () => {
  try {
    const response = await fetch(`${API_URL}/units`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching units:", error);
    throw error;
  }
  
};

export const fetchUnitsWithoutAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/units`, {
        headers: {
            Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching units:", error);
      throw error;
    }
    
  };
