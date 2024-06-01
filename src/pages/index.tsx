import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`relative h-full w-full flex flex-col items-center justify-center content-center text-white`}
    >
      <Image
        className="opacity-40"
        src="/marvel-background.jpg"
        alt="Marvel Background"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
        priority
      />
      <div className="flex flex-col text-center opacity-100">
        <h1 className="fond-bold text-3xl">NextJS Marvel Comic List</h1>
      </div>
    </main>
  );
}
