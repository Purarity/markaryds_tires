import { getCustomersList } from "./fakeApi";

export const login = (email, password) => {
  const user = getCustomersList().find(
    user => user.email === email
  );
  if (user) {
    if (user.password === password) {
      const token = email + password;
      return localStorage.setItem("token", token);
    }
  }
  return { auth: "Wrong email or password" };
};

export const register = data => {
  const newUser = {
    id: Date.now(),
    name: data.name,
    email: data.email,
    password: data.password,
    telephoneNumber: data.telephoneNumber,
    address: data.address
  };

  localStorage.setItem(
    "token",
    newUser.email + newUser.password
  );

  return getCustomersList().push(newUser);
};
