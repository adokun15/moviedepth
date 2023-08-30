import { secretToken } from "../../secretToken";
import { MovieAction } from "../Slices/movieSlice";
import { TimeOut } from "../TimeOut";

export const FetchSingleMovie = (movieId, session) => {
  return async (dispatch) => {
    const links = [
      `https://api.themoviedb.org/3/movie/${movieId}/account_states${
        session ? `?session_id=${session}` : ""
      }`,
      ` https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      `https://api.themoviedb.org/3/movie/${movieId}/images`,
    ];
    const getMovieDetail = links.map(async (mov) => {
      dispatch(MovieAction.loaderHandler(true));

      const fetchedData = await fetch(mov, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${secretToken}`,
        },
      });
      if (!fetchedData.ok) {
        dispatch(
          MovieAction.errorHandler({
            error: true,
            message: "Could not load Movie",
          })
        );
        dispatch(MovieAction.loaderHandler(false));
      }

      const fetched = await fetchedData.json();
      dispatch(MovieAction.loaderHandler(false));

      return fetched;
    });
    try {
      dispatch(MovieAction.loaderHandler(true));
      dispatch(
        MovieAction.errorHandler({
          error: false,
          message: "",
        })
      );

      const listPromise = await Promise.race([
        TimeOut(8),
        Promise.all(getMovieDetail),
      ]);
      const [obj1, obj2, obj3] = listPromise;
      const data = Object.assign({}, obj1, obj2, obj3);

      const filterImgs = data.posters.filter((img, i) => i <= 10);

      dispatch(MovieAction.loaderHandler(false));

      const newData = {
        averageVotes: data.vote_average,
        images: filterImgs.map((img) => {
          return {
            height: img.height,
            width: img.width,
            imgSrc: img.file_path,
          };
        }),
        runtime: data.runtime,
        favorite: data.favorite,
        rated: data.rated.value,
        watchlist: data.watchlist,
        bgImgSrc: data.backdrop_path,
        title: data.original_title,
        companies: data.production_companies.map((comp) => {
          return {
            companyId: comp.id,
            ImgSrc: comp.logo_path,
            title: comp.name,
            origin: comp.origin_country,
          };
        }),
        countryOrigin: data.production_countries.map((country) => {
          return { countryLocale: country.iso_3166_1, title: country.name };
        }),
        releasedDate: data.release_date,
        popularity: data.popularity,
        languages: [...data.spoken_languages],
        status: data.status,
        tag: data.tagline,
        votes: data.vote_count,
        id: data.id,
        genre: data.genres.map((gen) => gen.name),
        budget: data.budget,
        revenue: data.revenue,
        description: data.overview,
        homepage: data.homepage,
      };
      dispatch(MovieAction.movieData(newData));
    } catch (err) {
      typeof err === "string"
        ? dispatch(
            MovieAction.errorHandler({
              error: true,
              message:
                typeof err === "string" && err.includes("too")
                  ? err
                  : "Something went wrong!",
            })
          )
        : dispatch(
            MovieAction.errorHandler({
              error: true,
              message: "Something went wrong!",
            })
          );

      dispatch(MovieAction.loaderHandler(false));
    }
  };
};
