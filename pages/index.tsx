import { NextPage } from "next";
import Seo from "../components/Seo";
import { useEffect, useState } from "react";

export type IMovie = {
  id: number;
  original_title: string;
  poster_path: string;
};

interface Props {
  data: IMovie[];
}

const Landing: NextPage<Props> = (props) => {
  const [movies, setMovies] = useState<IMovie[]>();

  useEffect(() => {
    (async () => {
      const { results } = await (await fetch(`/api/movies`)).json();
      setMovies(results);
    })();
  }, []);

  return (
    <>
      <Seo title="Home" />
      {!movies && <h4>Loading...</h4>}
      {movies?.map((movie: IMovie) => (
        <div className="movie" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default Landing;
