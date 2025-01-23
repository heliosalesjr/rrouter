export async function clientLoader() {
  const apiUrl = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&format=json";
  
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Retorna um array vazio em caso de erro
  }
}

export default function Universe() {
    return <><h1>Universe</h1></>;
  }