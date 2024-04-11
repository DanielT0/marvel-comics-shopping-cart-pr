import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import marvelFetch from "@/utils/marvelFetch";
import Image from "next/image";
import Navbar from "@/components/navbar/navbar";
import { ComicI } from "@/interfaces/comics";
import { comics as comiics } from "@/mock/comic";

type Comic = {
  // TODO Define type
};

export const getServerSideProps = (async (context: any) => {
  // Fetch data from external API
  const res = await marvelFetch(`comics/${context.params.id}`);
  const comicJson: any = await res.json();

  // Pass data to the page via props
  return { props: { comic: comicJson.data.results[0] } };
}) satisfies GetServerSideProps<{ comic: any }>;

export default function Page({
  comic,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="absolute bottom-[120px] right-0 left-0">
      <div className="h-max flex items-end justify-between ml-[150px] mr-[150px] grow ">
        <div className="h-[100%] text-white flex flex-col gap-10 max-w-[800px] items-start max-w-[700px] pb-[30px]">
          <h1 className="font-bold text-7xl">{comic.title}</h1>
          <div>
            {comic.creators.items.map((creator) => (
              <span key={creator.name}>- {creator.name}</span>
            ))}
          </div>

          <div className="mt-[30px] mb-[100px] text-lg">
            {comic.textObjects[0].text}
          </div>
          <div className="text-5xl self-end">${comic.prices[0].price}</div>
        </div>

        <Image
          className="min-w-[400px]"
          src={`${comic.images[0]?.path + "." + comic.images[0]?.extension}`}
          alt={`${comic.title} comic image`}
          width={450}
          height={100}
        ></Image>
      </div>
    </main>
  );
}