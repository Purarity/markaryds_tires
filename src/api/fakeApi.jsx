let tires = [
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
    password: "aladin@gmail.com",
    telephoneNumber: "0278-410 44 47",
    address: "Tellusgatan 81, 254 72 Ödåkra"
  },
  {
    id: "2",
    name: "Hussein Saad	",
    email: "HusseinS@gmail.com",
    password: "HusseinS@gmail.com",
    telephoneNumber: "0970-663 40 59‬",
    address: "Englandsvägen 8, 285 36 Markaryd"
  },
  {
    id: "3",
    name: "Emelie Salomonsson",
    email: "Emelie@gmail.com",
    password: "Emelie@gmail.com",
    telephoneNumber: "0481-110 56 09‬",
    address: "Norrlandsvägen 49, 661 40 Säffle"
  },
  {
    id: "4",
    name: "Hussein Chahin",
    email: "Hussein@gmail.com",
    password: "Hussein@gmail.com",
    telephoneNumber: "0456-141 00 43‬",
    address: "Tuthult 1554, 285 91 Markaryd"
  }
];

let reservations = [
  {
    id: 10,
    name: "Aladin El-Khalil",
    notes: "Punktering",
    productId: "4acb99aa-855c-40d1-83fb-f23a85107f71",
    betalning: { fakturerad: true, betald: false }
  },
  {
    id: 20,
    name: "Hussein Saad	",
    notes: "Komplett hjulbyte 205/16 R16",
    productId: "10a84f11-e987-41a0-831e-b0edd23ba502",
    betalning: { fakturerad: true, betald: true }
  },
  {
    id: 30,
    name: "Emelie Salomonsson",
    notes: "Hjulbalansering",
    productId: "9a03ffdf-14b7-45bf-8bc6-66269763e6f4",
    betalning: { fakturerad: true, betald: false }
  },
  {
    id: 40,
    name: "Hussein Chahin",
    notes: "Komplett hjulbyte 245/18 R18",
    productId: "179ae8c3-c3f0-4bf9-9e14-998fa7ae32e6",
    betalning: { fakturerad: false, betald: false }
  }
];

export function getTiresList() {
  return tires;
}

export function getCustomersList() {
  return customers;
}

export function getReservations() {
  return reservations;
}

export function getProduct(id) {
  return tires.find(m => m.id === id);
}

export function deleteItem(id) {
  const updatedList = tires.filter(t => t.id !== id);
  tires = updatedList;
  return updatedList;
}

export async function saveReservation(reservation) {
  //let productInDb = reservations.find(p => p.id === product.id) || {};
  reservation.name = reservation.shopperName;
  reservation.betalning = {
    fakturerad: false,
    betald: false
  };
  reservation.id =
    reservations[reservations.length - 1].id + 1;
  return reservations.push(reservation);
}

export async function saveProduct(product) {
  let productInDb =
    tires.find(p => p.id === product.id) || {};
  if (!productInDb.id) {
    return tires.push(product);
  }

  productInDb.name = product.name;
  productInDb.description = product.description;
  productInDb.price = product.price;
  productInDb.stock = product.stock;

  return productInDb;
}
