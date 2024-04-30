import { ComicCard } from "@/components/comic-card/comic-card";
import { IComic } from "@/interfaces/comics";
import marvelFetch, { MarvelApiResponse } from "@/utils/marvelFetch";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps = (async () => {
  const comicsRes: MarvelApiResponse<IComic> = await marvelFetch<IComic>(
    "comics",
    {
      // titleStartsWith: "Ant-Man",
      // startYear: 2024,
      limit: 100,
      dateDescriptor: "thisMonth",
    }
  );

  // Pass data to the page via props
  return { props: { comics: comicsRes.data.results } };

  // TODO: Handle API errors 400, 500
}) satisfies GetServerSideProps<{ comics: IComic[] }>;

export default function Page({
  comics,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="flex w-full items-center mt-[100px] justify-center">
      <div className="grid grid-cols-auto-fill-150 gap-12 gap-x-24 mb-[100px] w-[85%]">
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
      </div>
    </main>
  );
}
