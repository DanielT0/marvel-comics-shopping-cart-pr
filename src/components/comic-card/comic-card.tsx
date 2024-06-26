import Image from "next/image";
import Link from "next/link";

interface ComicCadProps {
  id: number;
  src: string;
  alt: string;
  name: string;
}

export function ComicCard({ id, src, alt, name }: ComicCadProps) {
  return (
    <div className="relative h-[310px] w-[200px]">
      <Image
        src={src}
        alt={alt}
        width={200}
        height={200}
        className="absolute object-cover max-h-[310px] h-full"
      />
      <div className="absolute z-10 bg-black opacity-0 hover:opacity-90 h-full w-full">
        <div className="absolute top-0 w-full p-4 flex justify-around">
          <Link
            className="font-medium text-sm text-white dark:text-blue-500 hover:underline"
            href={`/comics/${id}/static`}
          >
            Go SSG
          </Link>
          <Link
            className="font-medium text-sm text-white dark:text-blue-500 hover:underline"
            href={`/comics/${id}/client`}
            prefetch={false}
          >
            Go CSR
          </Link>
          <Link
            className="font-medium text-sm text-white dark:text-blue-500 hover:underline"
            href={`/comics/${id}`}
          >
            Go SSR
          </Link>
        </div>
        <span className="absolute text-white bottom-[40px] left-[15px] text-2xl">
          {name}
        </span>
      </div>
    </div>
  );
}
