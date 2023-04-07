import Item from "../models/Items.js";

export class ItemService {
  async getAllItems() {
    const items = await Item.find();
    return items;
  }

  async addItem(item) {
    const newItem = new Item(item).save();
    return newItem;
  }

  async toggleItemCompleted(id) {
    const item = await Item.findById(id);
    item.isCompleted = !item.isCompleted;
    const editedItem = await item.save();
    return editedItem;
  }

  async deleteItem(id) {
    const itemExists = await Item.findById(id);
    if (!itemExists) throw new Error("Item not found");
    const deleteItem = await Item.deleteOne(itemExists);
    return deleteItem;
  }

  async clearList() {
    await Item.deleteMany({});
    return { message: "Tudo limpo por aqui" };
  }
}
