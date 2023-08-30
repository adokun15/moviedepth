import errImg from "../src/asset/otherImg/MovieDepth (6).png";
export const originalImg = (img) =>
  img ? `https://image.tmdb.org/t/p/original${img}` : errImg;
export const smallImg = (img) =>
  img ? `https://image.tmdb.org/t/p/w300${img}` : errImg;
