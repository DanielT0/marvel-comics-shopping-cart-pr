import { ComicCard } from "@/components/comic-card/comic-card";
import { IComic } from "@/interfaces/comics";
import marvelFetch, { MarvelApiResponse } from "@/utils/marvelFetch";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useState } from "react";

export default function Page() {
  const [comics, setComics] = useState<IComic[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const comicsRes: MarvelApiResponse<IComic> = await marvelFetch<IComic>(
        "comics",
        {
          dateDescriptor: "thisMonth",
        }
      );

      setComics(comicsRes.data.results);
    };
    fetchData().catch((e) => {
      console.log("error getting comics", e);
    });
  }, []);

  return (
    <main className="grid grid-cols-5 ml-[150px]  justify-evenly gap-y-12 mt-[100px]">
      {comics
        .filter((comic) => comic.images && comic.images[0])
        .map((comic: IComic) => (
          <ComicCard
            key={comic.id}
            id={comic.id}
            name={comic.title}
            src={comic.thumbnail.path + "." + comic.thumbnail.extension}
            alt={comic.id.toString()}
          />
        ))}
    </main>
  );
}
