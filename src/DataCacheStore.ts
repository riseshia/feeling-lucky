type Item = string;

const getItems: () => Item[] = () => {
  const serialized = localStorage.getItem("dataCache") || "";
  return serialized.split("|||");
};

const saveItems: (items: Item[]) => void = items => {
  localStorage.setItem("dataCache", items.join("|||"));
};

const hasItems = () => {
  return getItems().length > 0;
};

export default { getItems, saveItems, hasItems };
