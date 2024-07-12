import { API_URL } from "../utils/consts";


export const fetchSubcategories = async(token) => {
    try {
        const response = await fetch(`${API_URL}/subcategory`, {
            headers: {
            Authorization: token,
        },
    });
    if (!response.ok) {
        throw new Error ("Network response was not ok")
    }
    return response.json();
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        throw error;
    }
 };

 export const fetchSubcategories2 = async() => {
    try {
        const response = await fetch(`${API_URL}/subcategory`);
        console.log(response)
    if (!response.ok) {
        throw new Error ("Network response was not ok")
    }
    return response.json();
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        throw error;
    }
 };