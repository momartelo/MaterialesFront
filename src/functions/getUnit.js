import { API_URL } from "../utils/consts";

export const fetchUnits = async(token) => {
    try {
        const response = await fetch(`${API_URL}/unit`, {
            headers: {
            Authorization: token,
        },
    });
    if (!response.ok) {
        throw new Error ("Network response was not ok")
    }
    return response.json();
    } catch (error) {
        console.error("Error fetching units:", error);
        throw error;
    }
 };

 export const fetchUnits2 = async() => {
    try {
        const response = await fetch(`${API_URL}/unit`, {
            
    });
    if (!response.ok) {
        throw new Error ("Network response was not ok")
    }
    return response.json();
    } catch (error) {
        console.error("Error fetching units:", error);
        throw error;
    }
 };