import Image from "next/image";

interface ComicCadProps {
  id: number;
  src: string;
  alt: string;
  name: string;
}

export function ComicCardClient({ src, alt, name }: ComicCadProps) {
  return (
      <div className="relative sm:h-[310px] sm:w-[200px] w-[350px] h-[500px]">
        <Image
          src={src}
          alt={alt}
          width={200}
          height={200}
          className="absolute object-cover w-full h-full sm:max-h-[310px] "
        />
        <div className="absolute z-10 bg-black opacity-0 hover:opacity-90 h-full w-full">
          <span className="absolute text-white bottom-[40px] left-[15px] text-2xl">
            {name}
          </span>
        </div>
      </div>
  );
}
