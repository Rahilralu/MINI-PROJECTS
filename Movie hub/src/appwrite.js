import { Client,Databases,ID,Query } from "appwrite";
import noMovie from "./assets/no-movie.png";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

const databases = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("searchTerm", searchTerm)]
    );

    if (result.documents.length > 0) {
      const doc = result.documents[0];
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm,
          movie_id: movie?.id || 0,
          poster_url: movie?.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : noMovie,
          count: 1,
        }
      );
    }
  } catch (error) {
    console.error("updateSearchCount error:", error);
  }
};


export const getTrendingMovies = async () => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.limit(5),
        Query.orderDesc("count")
      ]
    );
    return result.documents;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};
