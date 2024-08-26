export const formatPesos = (amount) => {
  return amount
    ? amount.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      })
    : "";
};

export const formatDollars = (amount) => {
  return amount
    ? (() => {
        const parts = amount.toFixed(2).toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return `U$S ${parts.join(",")}`;
      })()
    : "";
};
