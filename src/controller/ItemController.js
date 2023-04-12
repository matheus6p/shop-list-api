import { ItemService } from "../services/ItemService.js";

const itemService = new ItemService();

export async function getItems(req, res) {
  try {
    const items = await itemService.getAllItems();
    return res.status(200).json(items);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function addItem(req, res) {
  const item = req.body;
  if (!item) {
    return res.status(404).send();
  }
  try {
    const newItem = await itemService.addItem(item);
    return res.status(201).json(newItem);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
}

export async function editItem(req, res) {
  const { id } = req.params;
  try {
    const editedItem = await itemService.toggleItemCompleted(id);
    res.status(200).json({ message: "Updated", editedItem });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}

export async function deleteItem(req, res) {
  const { id } = req.params;

  try {
    const deleteItem = await itemService.deleteItem(id);
    return res.status(204).send(deleteItem);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}

export async function clearList(req, res) {
  try {
    const result = await itemService.clearList();
    return res.status(204).send({ message: "Tudo limpo por aqui", result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
