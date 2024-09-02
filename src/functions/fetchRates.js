import { getExchangesRates } from "../functions/fetchs"; // Ajusta el import según la ubicación de tu archivo

export const fetchRates = async (setRates, setLoading, setIsRefreshing) => {
  setLoading(true);
  try {
    const response = await getExchangesRates();
    const data = response.data;
    const dolar = data.find((moneda) => moneda.moneda === "USD");
    const euro = data.find((moneda) => moneda.moneda === "EUR");

    const dolarCompra = dolar ? parseFloat(dolar.compra) : "No disponible";
    const dolarVenta = dolar ? parseFloat(dolar.venta) : "No disponible";
    const euroCompra = euro ? parseFloat(euro.compra) : "No disponible";
    const euroVenta = euro ? parseFloat(euro.venta) : "No disponible";

    const fechaCotizacionDolar = dolar
      ? dolar.fechaActualizacion
      : "No disponible";
    const fechaCotizacionEuro = euro
      ? euro.fechaActualizacion
      : "No disponible";

    const opcionesFecha = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    const fechaFormateadaDolar = new Date(
      fechaCotizacionDolar
    ).toLocaleDateString("es-AR", opcionesFecha);
    const fechaFormateadaEuro = new Date(
      fechaCotizacionEuro
    ).toLocaleDateString("es-AR", opcionesFecha);

    setRates({
      valorDolarCompra: dolarCompra.toFixed(2),
      valorDolarVenta: dolarVenta.toFixed(2),
      valorEuroCompra: euroCompra.toFixed(2),
      valorEuroVenta: euroVenta.toFixed(2),
      fechaDolar: fechaFormateadaDolar,
      fechaEuro: fechaFormateadaEuro,
    });
  } catch (error) {
    console.error("Error fetching exchanges rates", error);
  } finally {
    setLoading(false);
    setTimeout(() => setIsRefreshing(false), 1000);
  }
};
