let data = [
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

let customers = [
  {
    id: "1",
    name: "Aladin El-Khalil",
    email: "aladin@gmail.com",
    telephoneNumber: "076-288 65 75",
    address: "Tellusgatan 81, 254 72 Ödåkra"
  },
  {
    id: "2",
    name: "Hussein Saad	",
    email: "HusseinS@gmail.com",
    telephoneNumber: "070-726 08 33‬",
    address: "Englandsvägen 8, 285 36 Markaryd"
  },
  {
    id: "3",
    name: "Emelie Salomonsson",
    email: "Emelie@gmail.com",
    telephoneNumber: "‭070-494 99 41‬",
    address: "Norrlandsvägen 49, 661 40 Säffle"
  },
  {
    id: "4",
    name: "Hussein Chahin",
    email: "HusseinC@gmail.com",
    telephoneNumber: "070-723 93 84‬",
    address: "Tuthult 1554, 285 91 Markaryd"
  }
];

let reservations = [
  {
    id: 10,
    name: "Aladin El-Khalil",
    descriptions: "Punktering",
    betalning: { fakturerad: true, betald: false }
  },
  {
    id: 20,
    name: "Hussein Saad	",
    descriptions: "Komplett hjulbyte 205/16 R16",
    betalning: { fakturerad: true, betald: true }
  },
  {
    id: 30,
    name: "Emelie Salomonsson",
    descriptions: "Hjulbalansering",
    betalning: { fakturerad: true, betald: false }
  },
  {
    id: 40,
    name: "Hussein Chahin",
    descriptions: "Komplett hjulbyte 245/18 R18",
    betalning: { fakturerad: false, betald: false }
  }
];

export function getTiresList() {
  return data;
}

export function getCustomersList() {
  return customers;
}

export function getReservations() {
  return reservations;
}

export function getProduct(id) {
  return data.find(m => m.id === id);
}

export function deleteItem(id) {
  const updatedList = data.filter(t => t.id !== id);
  data = updatedList;
  return updatedList;
}

export async function saveReservation(reservation) {
  //let productInDb = reservations.find(p => p.id === product.id) || {};
  reservation.name = reservation.shopperName;
  reservation.descriptions = reservation.id + reservation.notes;
  reservation.betalning = { fakturerad: false, betald: false };
  reservation.id = reservations[reservations.length - 1].id + 1;
  return reservations.push(reservation);
}

export async function saveProduct(product) {
  let productInDb = data.find(p => p.id === product.id) || {};
  if (!productInDb.id) {
    return data.push(product);
  }

  productInDb.name = product.name;
  productInDb.description = product.description;
  productInDb.price = product.price;
  productInDb.stock = product.stock;

  return productInDb;
}
