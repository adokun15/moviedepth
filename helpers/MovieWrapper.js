const MovieCastWrapper = ({ children, cls }) => {
  return (
    <main
      className={`${cls} min-h-full col-start-1 col-end-5 row-start-2  row-span-full overflow-scroll  `}
    >
      {children}
    </main>
  );
};
export default MovieCastWrapper;
