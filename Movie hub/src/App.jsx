import { useEffect,useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import Moviecard from "./components/moviecard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite.js";
import TrendingMovieCard from './components/TrendingMovieCard';

const url = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method:'GET',
  headers:{
    accept: 'application/json',
    Authorization:`Bearer ${API_KEY}`,
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [trendingMovies,setTrendingMovies] = useState([]);
  const [errorMessage,seterrorMessage] = useState('');
  const [moveList,setmoveList] = useState([]);
  const [isLoading,setisLoading] = useState(false);
  const [debounceSearchTerm,setdebounceSearchTerm] = useState('');

  useDebounce(() => setdebounceSearchTerm(searchTerm), 500, [searchTerm]);

const fetchMovies = async (query = '') => {
  setisLoading(true);
  seterrorMessage('');

  try {
    const endpoint = query
  ? `${url}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  : `${url}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;

    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();

    setmoveList(data.results || []);
    if(query && data.results.length > 0){
      await updateSearchCount(query,data.results[0]);
    }

  } catch (error) {
    console.error(`Error fetching movies: ${error}`);
    seterrorMessage('Error fetching movies. Please try again later.');
  } finally {
    setisLoading(false);
  }
};

const loadTrendingMovies = async () => {
  try {
    const movies = await getTrendingMovies();
    console.log("Trending movies from Appwrite:", movies.map(m => ({
      title: m.title,
      poster_url: m.poster_url
    })));
    setTrendingMovies(movies);
  } catch (error) {
    console.error("Error fetching trending Movies", error);
  }
};


  useEffect(()=>{
    fetchMovies(debounceSearchTerm);
  },[debounceSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  },[])

  return (
    <div className="pattern">
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner"></img>
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <TrendingMovieCard key={movie.$id} movie={movie} index={index} />
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ?
          <Spinner />: 
          errorMessage ? (<p className="text-red-500">{errorMessage}</p>) :
          (<ul>
            {moveList.map((movie) => (
              <Moviecard key={movie.id} movie={movie}/>
            ))}
          </ul> 
          )}
        </section>
      </div>

  </div>
  );
};

export default App;
