import { ComicCard } from "@/components/comic-card/comic-card";
import { ComicI } from "@/interfaces/comics";
import marvelFetch from "@/utils/marvelFetch";

interface SavedComic {
  id: string;
  purchasedAt: string;
}

export async function getServerSideProps() {
  const savedComicsIdsRes = await fetch(
    "http://localhost:3000/api/my-purchases"
  );
  const comicsRes = await marvelFetch("comics");
  const comicJson: any = await comicsRes.json();
  const comics: ComicI[] = comicJson.data.results;
  const savedComicsResponse = await savedComicsIdsRes.json();
  const savedComics: SavedComic[] = savedComicsResponse.data.comics;
  const purchases = savedComics.map((savedComic) =>
    comics.find((comic) => comic.id.toString() === savedComic.id)
  );
  return { props: { comics: purchases } };
}

export default function PurchasedComics({ comics }: { comics: ComicI[] }) {
  return (
    <main className="grid grid-cols-5 ml-[150px]  justify-evenly gap-y-12 mt-[100px]">
      {comics
        .filter((comic) => comic.images && comic.images[0])
        .map((comic: ComicI) => (
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
