import { configureStore } from "@reduxjs/toolkit";
import { MoviesSlice } from "./Slices/moviesSlice";
import { MovieSlice } from "./Slices/movieSlice";
import { CastsSlice } from "./Slices/castsSlice";
import { CastSlice } from "./Slices/castSlice";
import { uiSlice } from "./UI";
import { OtherSlice } from "./Slices/OtherSlice";
import { FilmSlice } from "./Slices/filmsSlice";
import { Series } from "./Slices/tvSeriesSlice";
import { AllContentSlice } from "./Slices/allContentModifier";
import { Serie } from "./Slices/tvSerieSlice";
import { SearchedSlice } from "./Slices/searchedItemSlice";
import { AuthSlice } from "./Slices/authSlice";
import { NotifySlice } from "./Slices/notificationSlice";
import { RatingSlice } from "./Slices/RatingSlice";
const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    notify: NotifySlice.reducer,
    movies: MoviesSlice.reducer,
    other: OtherSlice.reducer,
    movie: MovieSlice.reducer,
    casts: CastsSlice.reducer,
    cast: CastSlice.reducer,
    ui: uiSlice.reducer,
    films: FilmSlice.reducer,
    series: Series.reducer,
    serie: Serie.reducer,
    rated: RatingSlice.reducer,
    searched: SearchedSlice.reducer,
    allContent: AllContentSlice.reducer,
  },
});

export default store;
