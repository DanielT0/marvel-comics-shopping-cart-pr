// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IComic } from "@/interfaces/comics";
import marvelFetch, { MarvelApiError, MarvelData } from "@/utils/marvelFetch";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<MarvelData<IComic> | MarvelApiError>,
) {
  try {
    const comicsData: MarvelData<IComic> = await marvelFetch<IComic>("comics");

    res.status(200).json(comicsData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}
