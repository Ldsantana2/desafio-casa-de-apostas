import { Router } from "express";
import { prisma } from "../prisma";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.use(authMiddleware);

router.post("/", async (req, res) => {
  try {
    const client = await prisma.client.create({
      data: req.body,
    });

    return res.status(201).json(client);
  } catch (error) {
    return res.status(400).json({
      error:
        "Erro ao criar cliente. Email ou telefone já cadastrado.",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const clients =
      await prisma.client.findMany({
        include: {
          contacts: true,
        },
      });

    return res.json(clients);
  } catch (error) {
    return res.status(500).json({
      error:
        "Erro ao buscar clientes.",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const client =
      await prisma.client.update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      });

    return res.json(client);
  } catch (error) {
    return res.status(400).json({
      error:
        "Erro ao atualizar cliente.",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await prisma.client.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({
      error:
        "Erro ao excluir cliente.",
    });
  }
});

export default router;