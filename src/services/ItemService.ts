import Item, { ItemModel } from "../models/Items";

export class ItemService {
  async getAllItems(): Promise<ItemModel[]> {
    const items = await Item.find();
    return items;
  }

  async addItem(item: ItemModel): Promise<ItemModel> {
    const newItem = new Item(item).save();
    return newItem;
  }

  async toggleItemCompleted(id: string): Promise<ItemModel> {
    const item = await Item.findById(id);
    if (!item) throw new Error("Item not found");
    item.isCompleted = !item.isCompleted;
    const editedItem = await item.save();
    return editedItem;
  }

  async deleteItem(id: string): Promise<{ message: string }> {
    const itemExists = await Item.findById(id);
    if (!itemExists) throw new Error("Item not found");

    const filter = {
      _id: itemExists._id
    }

    await Item.deleteOne(filter);
    return { message: "Item deleted"};
  }

  async clearList(): Promise<{ message: string }> {
    await Item.deleteMany({});
    return { message: "Tudo limpo por aqui" };
  }
}
