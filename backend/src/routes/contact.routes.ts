import { Router } from "express";
import { prisma } from "../prisma";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.use(authMiddleware);

router.post("/", async (req, res) => {
  const contact = await prisma.contact.create({
    data: req.body
  });

  return res.json(contact);
});

router.get("/", async (req, res) => {
  const contacts = await prisma.contact.findMany({
  include: {
    client: true,
  },
});

  return res.json(contacts);
});

router.put("/:id", async (req, res) => {
  const contact = await prisma.contact.update({
    where: {
      id: req.params.id
    },
    data: req.body
  });

  return res.json(contact);
});

router.delete("/:id", async (req, res) => {
  await prisma.contact.delete({
    where: {
      id: req.params.id
    }
  });

  return res.sendStatus(204);
});

export default router;