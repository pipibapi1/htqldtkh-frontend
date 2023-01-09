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
  top: "50%",
  transform: "translate(30%, 50%)",
  right: "100px",
  fontSize: "500%",
  color: "#000",
  //zIndex: 1,
  cursor: "pointer",
} as React.CSSProperties;

const leftArrowStyles = {
  top: "50%",
  transform: "translate(30%, 50%)",
  left: "100px",
  fontSize: "500%",
  color: "#000",
  //zIndex: 1,
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
  return <div className = 'w-full justify-between items-center'>
      <img src={src} className= 'w-full border border-blue-700 rounded-md'/>
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

  return (
    // style={sliderStyles}
    <div className= 'bg-[#D9D9D9] grid grid-cols-5 w-full h-full static'>
      <div onClick={goToPrevious} style={leftArrowStyles} className = 'static w-1/2 h-3/4 text-center '>
        ❰
      </div>
      <main className = 'w-full col-span-3 text-center'>
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

      </main>
      <div onClick={goToNext} style={rightArrowStyles} className = 'static w-1/2 h-3/4 text-center'>
        ❱
      </div>
    </div>
  );
};

export default ImageSlider;