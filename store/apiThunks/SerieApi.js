import { secretToken } from "../../secretToken";
import { SerieAction } from "../Slices/tvSerieSlice";
import { TimeOut } from "../TimeOut";

export const FetchSerieInfo = (
  serieId,
  seasonId = null,
  episodeId = null,
  session
) => {
  return async (dispatch) => {
    const otherFetch = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${secretToken}`,
      },
    };

    const dataPromise = async () => {
      dispatch(SerieAction.loaderHandler(true));
      dispatch(
        SerieAction.errorHandler({
          error: false,
          message: "",
        })
      );
      const links = [
        `https://api.themoviedb.org/3//tv/${serieId}/account_states${
          session ? `?session_id=${session}` : ""
        }`,
        ` https://api.themoviedb.org/3//tv/${serieId}?language=en-US`,
        `https://api.themoviedb.org/3//tv/${serieId}/images`,
      ];

      const SerieOnlyDetail = links.map(async (serie) => {
        dispatch(SerieAction.loaderHandler(true));
        const serieonly = await fetch(serie, otherFetch);

        if (!serieonly.ok) {
          dispatch(
            SerieAction.errorHandler({
              error: true,
              message: "Could not load Serie",
            })
          );
          dispatch(SerieAction.loaderHandler(false));
        }
        const seriesData = await serieonly.json();
        dispatch(SerieAction.loaderHandler(false));

        return seriesData;
      });
      return SerieOnlyDetail;
    };

    const seasonPromise = async () => {
      dispatch(SerieAction.loaderHandler(true));
      dispatch(
        SerieAction.errorHandler({
          error: false,
          message: "",
        })
      );
      const serieSeason = await fetch(
        `https://api.themoviedb.org/3/tv/${serieId}/season/${seasonId}`,
        otherFetch
      );
      if (!serieSeason.ok) {
        dispatch(
          SerieAction.errorHandler({
            error: true,
            message: "Could not load Serie Season",
          })
        );
        dispatch(SerieAction.loaderHandler(false));
      }
      const data = await serieSeason.json();
      dispatch(SerieAction.loaderHandler(false));

      return {
        airDate: data.air_date,
        serieNumber: data.season_number,
        serieId: data.id,
        averageVote: data.vote_average,
        seasonImgSrc: data.poster_path,
        description: data.overview,
        seasonName: data.name,
        episodes: data.episodes.map((d) => {
          return {
            episodeNumber: d.episode_number,
            episodeName: d.name,
            episodeRuntime: d.runtime,
            serieId: d.show_id,
            imgSrc: d.still_path,
            averageVote: d.vote_average,
            episodeId: d.id,
            description: d.overview,
          };
        }),
      };
    };

    //Add Image Api LATER
    const EpisodePromise = async () => {
      dispatch(SerieAction.loaderHandler(true));
      dispatch(
        SerieAction.errorHandler({
          error: false,
          message: "",
        })
      );
      const links = [
        `https://api.themoviedb.org/3/tv/${serieId}/season/${seasonId}/episode/${episodeId}/account_states${
          session ? `?session_id=${session}` : ""
        }`,
        `https://api.themoviedb.org/3/tv/${serieId}/season/${seasonId}/episode/${episodeId}`,
        `https://api.themoviedb.org/3/tv/${serieId}/season/${seasonId}/episode/${episodeId}/images`,
      ];

      const serieEpisodeOnly = links.map(async (epi) => {
        const serieEpisode = await fetch(epi, otherFetch);
        if (!serieEpisode.ok) {
          dispatch(
            SerieAction.errorHandler({
              error: true,
              message: "Could not load  Season Episode",
            })
          );
          dispatch(SerieAction.loaderHandler(false));
        }
        const data = await serieEpisode.json();
        dispatch(SerieAction.loaderHandler(false));
        return data;
      });
      return serieEpisodeOnly;
    };
    try {
      if (serieId && !episodeId && !seasonId) {
        const PromiseData = await Promise.race([
          TimeOut(8, "Series"),
          dataPromise(),
        ]);

        const listPromise = await Promise.all(PromiseData);
        const [obj1, obj2, obj3] = listPromise;
        const seriesData = Object.assign({}, obj1, obj2, obj3);

        const filterImgs = seriesData.posters.filter((img, i) => i <= 10);

        const newData = {
          rated: seriesData.rated,
          favorite: seriesData.favorite,
          watchlist: seriesData.watchlist,
          images: filterImgs.map((img) => {
            return {
              height: img.height,
              width: img.width,
              imgSrc: img.file_path,
            };
          }),
          serieId: seriesData.id,
          creators: seriesData.created_by.map((data) => {
            return {
              peopleId: data.id,
              name: data.name,
              imgSrc: data.profile_path,
              castId: data.credit_id,
            };
          }),
          bgImgSrc: seriesData.backdrop_path,
          runtime: seriesData.episode_run_time[0],
          firstAirDate: seriesData.first_air_date,
          lastAirDate: seriesData.last_air_date,
          genre: seriesData.genres.map((g) => g.name),
          InProduction: seriesData.in_production,
          totalSeasons: seriesData.number_of_seasons,
          totalEpisodes: seriesData.number_of_episodes,
          networks: seriesData.networks.map((net) => {
            return {
              networkId: net.id,
              imgSrc: net.logo_path,
              name: net.name,
              origin: net.origin_country,
            };
          }),
          serieOrigins: seriesData.origin_country,
          language: seriesData.original_language,
          title: seriesData.original_name,
          description: seriesData.overview,
          popularity: seriesData.popularity,
          companies: seriesData.production_companies.map((comp) => {
            return {
              companyId: comp.id,
              imgSrc: comp.logo_path,
              name: comp.name,
              origin: comp.origin_country,
            };
          }),
          countries: seriesData.production_countries.map((c) => c.name),
          seasons: seriesData.seasons.map((s) => {
            return {
              airDate: s.air_date,
              numberOfEpisodes: s.episode_count,
              seasonId: s.id,
              seasonName: s.name,
              description: s.overview,
              imgSrc: s.poster_path,
              seasonNumber: s.season_number,
              Averagevotes: s.vote_average,
            };
          }),
          status: seriesData.status,
          averageVotes: seriesData.vote_average,
          votes: seriesData.vote_count,
          tag: seriesData.tagline,
        };
        dispatch(SerieAction.getSerieData(newData));
        dispatch(SerieAction.seasonList(newData.seasons));
      }

      if (serieId && !episodeId && seasonId) {
        const dataSeason = await Promise.race([
          TimeOut(8, "Season Request"),
          seasonPromise(),
        ]);
        dispatch(SerieAction.loaderHandler(false));
        dispatch(SerieAction.singleSeason(dataSeason));
      }

      if (serieId && episodeId && seasonId) {
        const episodeData = await EpisodePromise();

        const listPromise = await Promise.race([
          TimeOut(8, "Episode Request"),
          Promise.all(episodeData),
        ]);
        const [obj1, obj2, obj3] = listPromise;
        const data = Object.assign({}, obj1, obj2, obj3);

        const filterImgs = data.stills.filter((img, i) => i <= 10);

        const episode = {
          airDate: data.air_date,
          //ADD showId
          images: filterImgs.map((img) => {
            return {
              height: img.height,
              width: img.width,
              imgSrc: img.file_path,
            };
          }),
          rated: data.rated,
          crew: data.crew.map((d) => {
            return {
              job: d.job || d.character,
              castId: d.credit_id,
              name: d.original_name,
              popularity: d.popularity,
              imgSrc: d.profile_path,
              peopleId: d.id,
            };
          }),
          runtime: data.runtime,
          bgImgSrc: data.still_path,
          averageVote: data.vote_average,
          seasonNumber: data.season_number,
          description: data.overview,
          episodeTitle: data.name,
          votes: data.vote_count,
        };
        dispatch(SerieAction.loaderHandler(false));
        dispatch(SerieAction.singleEpisode(episode));
      }
      return;
    } catch (err) {
      typeof err === "string"
        ? dispatch(
            SerieAction.errorHandler({
              error: true,
              message:
                typeof err === "string" && err.includes("too")
                  ? err
                  : "Something went wrong!",
            })
          )
        : dispatch(
            SerieAction.errorHandler({
              error: true,
              message: "Something went wrong!",
            })
          );
      dispatch(SerieAction.loaderHandler(false));
    }
  };
};
