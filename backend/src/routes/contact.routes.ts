import { Router } from "express";
import { prisma } from "../prisma";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.use(authMiddleware);

router.post("/", async (req, res) => {
  try {
    const contact =
      await prisma.contact.create({
        data: req.body,
      });

    return res.status(201).json(contact);
  } catch (error) {
    return res.status(400).json({
      error:
        "Erro ao criar contato. Email ou telefone já cadastrado.",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const contacts =
      await prisma.contact.findMany({
        include: {
          client: true,
        },
      });

    return res.json(contacts);
  } catch (error) {
    return res.status(500).json({
      error:
        "Erro ao buscar contatos.",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const contact =
      await prisma.contact.update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      });

    return res.json(contact);
  } catch (error) {
    return res.status(400).json({
      error:
        "Erro ao atualizar contato.",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await prisma.contact.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({
      error:
        "Erro ao excluir contato.",
    });
  }
});

export default router;