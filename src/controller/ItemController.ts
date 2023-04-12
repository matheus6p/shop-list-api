import { Request, Response } from "express";
import { ItemService } from "../services/ItemService";

const itemService = new ItemService();

export async function getItems(req: Request, res: Response) {
  res.setHeader('Access-Control-Allow-Origin', 'https://shop-list-kappa.vercel.app/')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  try {
    const items = await itemService.getAllItems();
    return res.status(200).json(items);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export async function addItem(req: Request , res: Response) {
  const item = req.body;
  if (!item) {
    return res.status(404).send();
  }
  try {
    const newItem = await itemService.addItem(item);
    return res.status(201).json(newItem);
  } catch (err: any) {
    return res.status(500).json({ erro: err.message });
  }
}

export async function editItem(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const editedItem = await itemService.toggleItemCompleted(id);
    res.status(200).json({ message: "Updated", editedItem });
  } catch (err: any) {
    return res.status(404).json({ error: err.message });
  }
}

export async function deleteItem(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deleteItem = await itemService.deleteItem(id);
    return res.status(204).send(deleteItem);
  } catch (err: any) {
    return res.status(404).json({ error: err.message });
  }
}

export async function clearList(req: Request, res: Response) {
  try {
    const result = await itemService.clearList();
    return res.status(204).send({ message: "Tudo limpo por aqui", result });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
