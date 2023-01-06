import { Request, Response } from "express";
import prisma from "../db";

const getUpdates = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req["user"].id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  res.status(200);
  res.json({
    data: updates,
  });
};

const getUpdateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const update = await prisma.update.findUnique({
    where: {
      id: id,
    },
  });
  res.status(200);
  res.json({
    data: update,
  });
};

const createUpdate = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    res.json({ message: "No product found" });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: {
        connect: { id: product.id },
      },
    },
  });

  res.json({ data: update });
};

const updateUpdate = async (req: Request, res: Response) => {
  const updateId = req.params.id;
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req["user"].id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === updateId);

  if (!match) {
    return res.json({
      message: "Sorry no results found",
    });
  }

  const update = await prisma.update.update({
    where: {
      id: updateId,
    },
    data: req.body,
  });

  res.status(200);
  res.json({ data: update });
};

const deleteUpdate = async (req: Request, res: Response) => {
  const updateId = req.params.id;
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req["user"].id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === updateId);

  if (!match) {
    return res.json({
      message: "Sorry no results found",
    });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: updateId,
    },
  });

  res.json({ data: deleted });
};

export { getUpdates, getUpdateById, createUpdate, updateUpdate, deleteUpdate };
