import { Router } from "express";
import { prisma } from "../prisma";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.use(authMiddleware);

router.post("/", async (req, res) => {
  const client = await prisma.client.create({
    data: req.body
  });

  return res.json(client);
});

router.get("/", async (req, res) => {
  const clients = await prisma.client.findMany({
    include: {
      contacts: true
    }
  });

  return res.json(clients);
});

router.put("/:id", async (req, res) => {
  const client = await prisma.client.update({
    where: {
      id: req.params.id
    },
    data: req.body
  });

  return res.json(client);
});

router.delete("/:id", async (req, res) => {
  await prisma.client.delete({
    where: {
      id: req.params.id
    }
  });

  return res.sendStatus(204);
});

export default router;