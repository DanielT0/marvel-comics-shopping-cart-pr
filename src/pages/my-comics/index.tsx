import { ComicCard } from "@/components/comic-card/comic-card";
import { IComicPurchase } from "@/interfaces/purchases";
import prisma from "@/lib/prisma";

// export async function getServerSideProps() {
//   const savedComicsRes = await fetch("http://localhost:3000/api/my-purchases");
//   const savedComicsResponse = await savedComicsRes.json();
//   const savedComics: IComicPurchase[] = savedComicsResponse.data.comics;
//   return { props: { comics: savedComics } };
// }

export async function getServerSideProps() {
  const purchases = await prisma.purchasedComics.findMany();
  const savedComics: IComicPurchase[] = purchases.map((comic) => {
    return {
      ...comic,
      id: Number(comic.id),
      purchasedAt: comic.purchasedAt.toString(),
    };
  });

  return { props: { comics: savedComics } };
}

export default function PurchasedComics({
  comics,
}: {
  comics: IComicPurchase[];
}) {
  return (
    <main className="grid grid-cols-5 ml-[150px]  justify-evenly gap-y-12 mt-[100px]">
      {comics.map((comic: IComicPurchase) => (
        <ComicCard
          key={comic.id}
          id={comic.id}
          name={comic.title}
          src={comic.src}
          alt={comic.id.toString()}
          disabled={true}
        />
      ))}
    </main>
  );
}
