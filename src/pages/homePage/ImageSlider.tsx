import { useState } from "react";
import { slideImage, slidesImageData } from './HomePageContent'

const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "320px",
  fontSize: "70px",
  color: "#000",
  zIndex: 1,
  cursor: "pointer",
} as React.CSSProperties;

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "320px",
  fontSize: "70px",
  color: "#000",
  zIndex: 1,
  cursor: "pointer",
} as React.CSSProperties;

const sliderStyles = {
  position: "relative",
  height: "100%",
} as React.CSSProperties;

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
};

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "20px",
  color: "#000",
};

const SlideBanner = ({SlideImage}: {SlideImage: slideImage}) => {
  const {src} = SlideImage
  return <div className = 'flex justify-between items-center relative overflow-hidden'>
      <img src={src} className= 'mx-44 my-4 w-8/12  mx border border-blue-700 rounded-md'/>
  </div>
}

// {slides} : {slides:any}
const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slidesImageData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slidesImageData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  // const goToSlide = ({slideIndex} : {slideIndex: any}) => {
  //   setCurrentIndex(slideIndex);
  // };
  return (
    // style={sliderStyles}
    <div className= 'bg-[#D9D9D9] '>
      <div className= ''>
      {/* onClick={goToPrevious} */}
        <div onClick={goToPrevious} style={leftArrowStyles}>
          ❰
        </div>
        <div onClick={goToNext} style={rightArrowStyles}>
          ❱
        </div>
      </div>
      <div>
        {slidesImageData.map((slideImage, index) => 
          (
            <div className={index === currentIndex ? 'slide active' : 'slide'} key={index}>
                {index === currentIndex && (
                <SlideBanner key={index} SlideImage={slideImage} />
                )}
            </div>
          )
          )
        }

      </div>
      {/* <div style={dotsContainerStyles}>
        {slides.map(({slide} : {slide:any}, {slideIndex} : {slideIndex:any}) => (
          <div
            style={dotStyle}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default ImageSlider;