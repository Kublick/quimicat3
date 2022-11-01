import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const username = "admin";

  const user = await prisma.user.findFirstOrThrow({
    where: {
      username,
    },
    include: {
      Profile: true,
      Sucursal: true,
    },
  });

  console.log(user);

  res.status(200).json({ message: "Example" });
}
