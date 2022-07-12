import { NextPage } from "next";
import Seo from "../components/Seo";
import { useEffect, useState } from "react";

const API_KEY = "10923b261ba94d897ac6b81148314a3f";

export type IMovie = {
  id: number;
  original_title: string;
};

interface Props {
  data: IMovie[];
}

const Landing: NextPage<Props> = (props) => {
  const [movies, setMovies] = useState<IMovie[]>();

  useEffect(() => {
    (async () => {
      const { results } = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        )
      ).json();
      setMovies(results);
    })();
  }, []);

  return (
    <>
      <Seo title="Home" />
      {!movies && <h4>Loading...</h4>}
      {movies?.map((movie: IMovie) => (
        <div key={movie.id}>
          <h4>{movie.original_title}</h4>
        </div>
      ))}
    </>
  );
};

export default Landing;
