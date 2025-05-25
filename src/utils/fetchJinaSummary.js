import axios from "axios";


export async function fetchJinaSummary(url) {
  if (!url) return "No URL provided.";
  const apiUrl = `https://r.jina.ai/${encodeURIComponent(url)}`;
  try {
    const response = await axios.get(apiUrl, { responseType: "text" });
    return typeof response.data === "string" ? response.data : "No summary available.";
  } catch (error) {
    console.log(error);
    
    return "Could not fetch summary. Please try again later.";
  }
}
