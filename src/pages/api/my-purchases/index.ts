import { IComicPurchase } from "@/interfaces/purchases";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const purchasedComics = await prisma.purchasedComics.findMany();
      res.status(200).json({
        message: "Comics found",
        data: { comics: purchasedComics },
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
  if (req.method === "POST") {
    const purchases: IComicPurchase[] = req.body.purchases;
    if (!purchases || purchases.length === 0)
      res
        .status(400)
        .json({ message: "Missing required body property: purchases" });
    try {
      await prisma.purchasedComics.createMany({
        data: purchases.map((purchase) => {
          return { ...purchase, id: purchase.id.toString() };
        }),
      });
      res.status(200).json({
        message: "Comics added to purchases",
        data: { purchases },
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
  res.status(404).json({ message: "There's not endpoint created for this" });
}
