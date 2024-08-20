import { API_URL } from "../utils/consts";
import axios from "axios";

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
    const response = await fetch(`${API_URL}/subcategories`, {
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

export const getCovertExchangePair = async (moneda_origen, moneda_final) => {
  // const apiKey = process.env.REACT_APP_EXCHANGE_API_KEY;
  const api_URL_convert = `https://v6.exchangerate-api.com/v6/b4664edbd01707d626c5ddcc/pair/${moneda_origen}/${moneda_final}`;
  console.log("Dentro del fetch");
  console.log(api_URL_convert);
  try {
    const response = await axios.get(api_URL_convert);
    const tipo_cambio = response.data.conversion_rate;
    const lastUpdate = response.data.time_last_update_utc;
    return { tipo_cambio, lastUpdate };
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado que está fuera del rango de 2xx
      console.error("Error status:", error.response.status);
      console.error("Error data:", error.response.data);
      console.error("Error headers:", error.response.headers);
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error("Error request:", error.request);
    } else {
      // Algo sucedió al configurar la solicitud
      console.error("Error message:", error.message);
    }
    throw new Error("Error al obtener el tipo de cambio");
  }
};

export const getConvertExchangeLatest = async (moneda) => {
  const apiKey = process.env.REACT_APP_EXCHANGE_API_KEY;
  const api_URL_convert = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${moneda}`;

  try {
    const response = await axios.get(api_URL_convert);
    const conversion_rate = response.data.conversion_rates;
    return conversion_rate;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener el tipo de cambio");
  }
};

// ver API dolarapi.com/

export const getExchangesRates = async () => {
  const api_URL = `https://dolarapi.com/v1/cotizaciones`;

  try {
    const response = await axios.get(api_URL);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las cotizaciones");
  }
};
