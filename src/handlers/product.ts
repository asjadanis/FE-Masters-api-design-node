import { Request, Response } from "express";
import prisma from "../db";

const getProducts = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req["user"].id,
    },
    include: {
      products: true,
    },
  });

  res.status(200);
  res.json({
    data: user.products,
  });
};

const getProductById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const product = await prisma.product.findFirst({
    where: {
      id: id,
      belongsToId: req["user"].id,
    },
  });

  res.status(200);
  return res.json({
    data: product,
  });
};

const createProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req["user"].id,
    },
  });

  res.status(200);
  res.json({ data: product });
};

const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const updated = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: id,
        belongsToId: req["user"].id,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  res.status(200);
  res.json({ data: updated });
};

const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedProduct = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: id,
        belongsToId: req["user"].id,
      },
    },
  });

  res.status(200);
  res.json({ data: deletedProduct });
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
