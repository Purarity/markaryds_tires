const tires = [
  {
    id: "179ae8c3-c3f0-4bf9-9e14-998fa7ae32e6",
    name: "MICHELIN",
    description: "aaa",
    price: 1000,
    stock: 30,
    imgId: "1"
  },
  {
    id: "8e667906-75c0-4857-b0f1-ef7d8a9902b4",
    name: "PIRELLI",
    description: "bbb",
    price: 800,
    stock: 21,
    imgId: "2"
  },
  {
    id: "9a03ffdf-14b7-45bf-8bc6-66269763e6f4",
    name: "COOPER",
    description: "ccc",
    price: 700,
    stock: 20,
    imgId: "3"
  },
  {
    id: "bef1edb6-9f83-4780-be81-d4d9483b1935",
    name: "GOODYEAR",
    description: "ddd",
    price: 699,
    stock: 50,
    imgId: "4"
  },
  {
    id: "10a84f11-e987-41a0-831e-b0edd23ba502",
    name: "CONTINENTAL",
    description: "eee",
    price: 605,
    stock: 50,
    imgId: "5"
  },
  {
    id: "4acb99aa-855c-40d1-83fb-f23a85107f71",
    name: "DUNLOP",
    description: "fff",
    price: 500,
    stock: 42,
    imgId: "6"
  },
  {
    id: "056189b0-76a1-4ead-9d89-4f636c58fad7",
    name: "BFGOODRICH",
    description: "ggg",
    price: 550,
    stock: 45,
    imgId: "7"
  }
];

export function getTiresList() {
  return tires;
}

export function getProduct(id) {
  return tires.find(m => m.id === id);
}

export async function saveProduct(product) {
  let productInDb = tires.find(p => p.id === product.id) || {};
  productInDb.name = product.name;
  productInDb.description = product.description;
  productInDb.price = product.price;
  productInDb.stock = product.stock;

  return productInDb;
}
