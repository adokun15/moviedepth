import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Slider = ({ children }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 900 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 900, min: 500 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 2,
    },
  };
  return <Carousel responsive={responsive}>{children}</Carousel>;
};
export default Slider;
