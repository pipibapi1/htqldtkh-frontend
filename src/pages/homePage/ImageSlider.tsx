import { useState } from "react";
import { slideImage, slidesImageData } from './HomePageContent'

const rightArrowStyles = {
  top: "50%",
  transform: "translate(30%, 50%)",
  right: "100px",
  fontSize: "500%",
  color: "#BE1227",
  zIndex: 1,
  cursor: "pointer",
} as React.CSSProperties;

const leftArrowStyles = {
  top: "50%",
  transform: "translate(30%, 50%)",
  left: "100px",
  fontSize: "500%",
  color: "#BE1227",
  zIndex: 1,
  cursor: "pointer",
} as React.CSSProperties;


const SlideBanner = ({SlideImage}: {SlideImage: slideImage}) => {
  const {src} = SlideImage
  return <div className = 'relative w-full justify-between items-center'>
      <img src={src} className= 'w-full h-[525px] border border-blue-700 rounded-md'/>
      <div className="absolute top-1/2 mt-[-38px] left-1/2 ml-[-343px] z-1">
          <div className="text-3xl text-[#1488D8] font-black font-outline">
          ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH
          </div>
          <div className="text-4xl text-[#030391] font-black font-outline">
          ỨNG DỤNG QUẢN LÝ ĐỀ TÀI KHOA HỌC
          </div>
	    </div>
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
    <div className= 'grid grid-cols-5 w-full h-full static border-b border-slate-900'>
      <div onClick={goToPrevious} style={leftArrowStyles} className = 'static w-1/2 h-1/2 text-center'>
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
      <div onClick={goToNext} style={rightArrowStyles} className = 'static w-1/2 h-1/2 text-center'>
        ❱
      </div>
    </div>
  );
};

export default ImageSlider;