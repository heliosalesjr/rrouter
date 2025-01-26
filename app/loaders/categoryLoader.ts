export async function categoryLoader({ params }: { params: { categoryId: string } }) {
    const apiKey = process.env.REACT_APP_NASA_API_KEY;
    let query = "";
  
    switch (params.categoryId) {
      case "planets":
        query = "planets";
        break;
      case "stars":
        query = "stars";
        break;
      case "missions":
        query = "missions";
        break;
      default:
        throw new Response("Categoria não encontrada", { status: 404 });
    }
  
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=6&concept_tags=True&keywords=${query}`
    );
  
    if (!res.ok) {
      throw new Response("Erro ao buscar dados da API", { status: res.status });
    }
  
    return res.json();
  }
  