import React from 'react';

import ImageSlider from "./ImageSlider";

import BK1 from "../../assets/images/BK_1.jpg";
import BK2 from "../../assets/images/BK_2.jpg";
import BK3 from "../../assets/images/BK_3.jpg";

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

const MainHomePageContent: React.FC = () => {
    return (   
      <div className= 'w-full'>
        {<ImageSlider/>} 
      </div>   
    )
}

export default MainHomePageContent;