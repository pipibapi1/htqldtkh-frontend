import React from 'react';
import BK1 from "../../assets/images/BK_1.jpg";
import BK2 from "../../assets/images/BK_2.jpg";
import BK3 from "../../assets/images/BK_3.jpg";
import ImageSlider from "./ImageSlider";

export interface slideImage{
  src: string;
}

export const slidesImageData: slideImage[] = [
  {
    src: BK1
  },
  {
    src: BK2
  },
  {
    src: BK3
  }
  ];

  
  const containerStyles = {
    width: "1200px",
    height: "600px",
    margin: "0 auto",
    padding: "20px",
  };


  // slidesImageData.map((slide, index) => (
  //   <div key = {index}>
  //     {/* <img src={slide} alt = ''/> */}
  //   </div>
  // ))
const MainHomePageContent: React.FC = (props: any) => {
    return (   
        <div style={containerStyles} className= ''>
        {
          <ImageSlider/>
        } 
        </div>   
    )
}

export default MainHomePageContent;