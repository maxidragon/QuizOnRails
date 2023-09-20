import { backendRequest } from "./request";

export const registerUser = async (
  email: FormDataEntryValue | null,
  username: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
) => {
  try {
    const body = {
      user: {
        email: email,
        name: username,
        password: password,
      },
    };
    const response = await backendRequest("signup", "POST", false, body);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
export const login = async (
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
) => {
  try {
    const response = await backendRequest("login", "POST", false, {
      user: {
        email: email,
        password: password,
      },
    });
    if (response.status === 200) {
      const headers: [string, string][] = [...response.headers];
      const authorizationHeader = headers.find(
        (header) => header[0] === "authorization",
      );
      if (!authorizationHeader) throw new Error("No authorization header");
      const token = authorizationHeader[1].split(" ")[1];
      localStorage.setItem("token", token);
      return response.status;
    }
    return response.status;
  } catch (error) {
    console.log(error);
  }
};
export const logout = async () => {
  localStorage.removeItem("token");
};

export const isUserLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};
