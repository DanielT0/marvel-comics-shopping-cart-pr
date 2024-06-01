import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
//   return (
//     <main
//       className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
//     >
//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">src/pages/index.tsx</code>
//         </p>
//       </div>
//       <div className="relative h-full w-full">
//         <Image
//           src="/marvel-background.jpg"
//           alt="Marvel Background"
//           // placeholder="blur"
//           quality={100}
//           fill
//           // sizes="100vw"
//           style={{
//             objectFit: "cover",
//           }}
//           priority
//         />
//       </div>
//     </main>
//   );
// }

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
