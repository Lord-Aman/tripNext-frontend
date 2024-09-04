export const getFlagUrl = (countryCode) => {
  return `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;
};

export const getCountryCode = async (countryName) => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const data = await response.json();
    return data[0]?.cca2.toLowerCase() || "in";
  } catch (error) {
    console.error("Error fetching country code:", error);
    return "in";
  }
};

export const calculateDays = (start, end) => {
  const diffTime = Math.abs(new Date(end) - new Date(start));
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB").replace(/\//g, ".");
};

export const formatDateFromISO = (isoDate) => {
  // Create a new Date object from the ISO string
  const date = new Date(isoDate);

  // Convert to YYYY-MM-DD format by slicing the first 10 characters of the ISO string
  const formattedDate = date.toISOString().split("T")[0];

  return formattedDate;
};
