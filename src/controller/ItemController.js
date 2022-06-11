import Item from "../models/Items.js";

export async function getItems(req, res) {
  try {
    const items = await Item.find();
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
    const newItem = await new Item(item).save();
    return res.status(201).json(newItem);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
}

export async function editItem(req, res) {
  const { id } = req.params;
  try {
    const editedItem = await Item.findById(id);
    editedItem.completed = !editedItem.completed;
    editedItem.save();
    res.status(200).json({ message: "Updated", editedItem });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}

export async function deleteItem(req, res) {
  const { id } = req.params;

  const itemExists = await Item.findById(id);

  if (!itemExists) {
    return res.status(404).json({ message: "Item Not found" });
  }
  try {
    const deleteItem = await Item.findByIdAndDelete(id);
    return res.status(204).send(deleteItem);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function clearList(req, res) {
  try {
    await Item.deleteMany({});
    return res.status(204).send({ message: "Tudo limpo por aqui" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
