import axios from "axios";

export type AuthResponse = {
  message: string;
  id:number;
  email: string;
  name: string | null;
  role: "ADMIN" | "USER" | "SELLER";
  image: string | null;
  phone: string | null;
  cartId: number | undefined;
};

export default async function handleLoginOrSignup({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  try {
    if (!email || !password) {
      throw new Error("Email and Password are required");
    }
    const payload = {
      email: email,
      password: password,
    };

    const response = await axios.post<AuthResponse>(
      `${BACKEND_URL}/user/checkout/signing`,
      payload,
      { withCredentials: true }
    );
    if (response.status === 200 || response.status === 201) {
      console.log("Login or Signup successful");
      console.log("Login data : setter",response.data)
      return response.data;
    } else if (response.status === 401) {
      console.log("Existing user...Wrong Password");
      throw new Error("Existing user...Wrong Password");
    } else if (response.status === 500) {
      console.log("Internal Server Error");
      throw new Error("Internal Server Error");
    }

    return response.data;
  } catch (error) {
    console.log("Error occured while handling login or signup");
    throw new Error("Error occured. Try later");
  }
}
