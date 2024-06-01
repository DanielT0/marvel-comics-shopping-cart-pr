import Image from "next/image";
import Link from "next/link";

interface ComicCadProps {
  id: number;
  src: string;
  alt: string;
  name: string;
  disabled?: boolean;
}

export function ComicCard({ id, src, alt, name, disabled }: ComicCadProps) {
  return (
    <div className={"relative h-[310px] w-[200px] "}>
      <Link
        className="font-medium text-sm text-white dark:text-blue-500 hover:underline"
        href={disabled ? "" : `/comics/${id}`}
      >
        <Image
          src={src}
          alt={alt}
          width={200}
          height={200}
          className="absolute object-cover max-h-[310px] h-full"
        />
        <div
          className={`absolute z-10 bg-black opacity-0 hover:opacity-90 h-full w-full ${
            disabled && "cursor-default"
          }`}
        >
          <div className="absolute top-0 w-full p-4 flex justify-around"></div>
          <span className="absolute text-white bottom-[40px] left-[15px] text-2xl">
            {name}
          </span>
        </div>
      </Link>
    </div>
  );
}
