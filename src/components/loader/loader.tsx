import Image from "next/image";
import { useEffect, useState } from "react";
import { clearInterval, setInterval } from "timers";

const imgs = [
  {
    src: "/sprites/thor.png",
    alt: "thor-space",
  },
  {
    src: "/sprites/hulk.png",
    alt: "hulk-sprite",
  },
  {
    src: "/sprites/cap.png",
    alt: "cap-sprite",
  },
  {
    src: "/sprites/iron-man.png",
    alt: "iron-man-sprite",
  },
  {
    src: "/sprites/spider-man.png",
    alt: "spider-man-sprite",
  },
  {
    src: "/sprites/wolverine.png",
    alt: "wolverine-sprite",
  },
];
export function Loader() {
  const images = imgs.map((img) => (
    <Image src={img.src} alt={img.alt} height={100} width={100} key={img.alt} />
  ));

  const [imageIndex, setImageIndex] = useState(
    Math.floor(Math.random() * images.length)
  );

  useEffect(() => {
    function changeInRangeImageIndex() {
      let index = Math.floor(Math.random() * images.length);
      if (imageIndex === index) index = imageIndex + 1;
      setImageIndex(index);
    }

    const interval = setInterval(() => changeInRangeImageIndex(), 1000);

    return () => clearInterval(interval);
  }, [imageIndex]);

  return (
    <>
      {images[imageIndex]}
      <h1 className="text-3xl"> Loading </h1>
    </>
  );
}
