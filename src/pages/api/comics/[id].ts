// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IComic } from "@/interfaces/comics";
import marvelFetch, {
  MarvelApiError,
  MarvelApiResponse,
} from "@/utils/marvelFetch";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MarvelApiResponse<IComic> | MarvelApiError>,
) {
  try {
    const { id } = req.query;
    const comicsRes: MarvelApiResponse<IComic> = await marvelFetch<IComic>(
      `comics/${id}`,
    );

    res.status(200).json(comicsRes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}
