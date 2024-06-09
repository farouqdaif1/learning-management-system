"use client";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center ",
  height: "600px",
  borderRadius: "50px",
};
const divHome = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "contain",
  backgroundPosition: "center",
};
const slideImages = [
  {
    url: "/slide-two.webp",
    caption: "Slide 2",
  },
  {
    url: "/slide-one.webp",
    caption: "Slide 2",
  },
  {
    url: "/slide-3.webp",
    caption: "Slide 3",
  },
];
const Slider = () => {
  return (
    <div
      className="w-full h-screen relative overflow-hidden mb-4 mt-4"
      style={{ ...divHome, backgroundImage: "url('/pattern.webp')" }}
    >
      <div className="slide-container  w-[90%] m-auto ">
        <Slide>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <div
                style={{
                  ...divStyle,
                  backgroundImage: `url(${slideImage.url})`,
                }}
              ></div>
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
};

export default Slider;
