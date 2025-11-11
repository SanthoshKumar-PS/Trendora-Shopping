import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Lock, Mail } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";
const Login = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  // const [email,setEmail]=useState<string|null>(null)
  const [email, setEmail] = useState<string | null>("srs@gmail.com");
  // const [password,setPassword]=useState<string|null>(null)
  const [password, setPassword] = useState<string | null>("srs123");
  const [role, setRole] = useState<"USER" | "ADMIN" | "SELLER">("USER");
  const [error, setError] = useState<string | null>(null);

  const { setCartId } = useCart();
  const { setUser } = useUser();

  async function validateAndLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email && !password) {
      setError("Enter Email and Password Fields");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email ?? "")) {
      setError("Please enter a valid email address");
      return;
    }

    if ((password ?? "").length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    loginUser();
  }

  async function loginUser() {
    try {
      const payload = {
        email: email,
        password: password,
      };
      const response = await axios.post(`${BACKEND_URL}/user/login`, payload, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const data = response.data as any;
        console.log("User has been registered", data);
        setUser({
          loggedIn: true,
          email: data.email,
          name: data.name,
          role: data.role,
          image: data.image,
          phone: data.phone,
          cartId: data.cartId,
        });
        localStorage.setItem(
          "UserInfo",
          JSON.stringify({
            loggedIn: true,
            email: data.email,
            name: data.name,
            role: data.role,
            image: data.image,
            phone: data.phone,
            cartId: data.cartId,
          })
        );

        if (data.role === "USER") {
          console.log("Cart ID of user - ", data.cartId);
          setCartId(Number(data.cartId));
          navigate("/home");
        }
        if (data.role === "SELLER") {
          setCartId(Number(data.cartId));
          navigate("/dashboard");
        }
      }
    } catch (error) {
      const err = error as AxiosError;

      if (err.response) {
        if (err.response.status === 500) {
          console.log("Internal Server Error");
          setError(err.response.data?.message || "Server error");
        } else if (err.response.status === 404) {
          console.log("User not exists");
          setError(err.response.data?.message || "User not exists");
        } else {
          console.log("Unexpected Error while registering");
          setError("Unexpected error occurred");
        }
      } else {
        console.log("Network or other error", err.message);
        setError("Network error. Please try again.");
      }
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col relative">
      <Navbar seller={false} />

      <div className="w-full min-h-full flex flex-col space-y-4 items-center justify-center p-8">
        {/* Inner Box Like Card */}
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.5 }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          className="w-full p-8 max-w-md space-y-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl"
        >
          <div className="flex justify-center">
            <img src="/App/LogoWithName.png" alt="" className="h-16" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-xl font-bold tracking-tight">Log In</h1>
            <p className="text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={validateAndLogin} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <p className="font-medium ">Email</p>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <Mail className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={email ?? ""}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="santhosh@gmail.com"
                  required
                  className="pl-10 w-full border border-gray-300 p-2 focus:border-2 focus:border-blue-600 rounded-lg"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <p className="font-medium ">Password</p>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <Lock className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={password ?? ""}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-10 w-full border border-gray-300 p-2 focus:border-2 focus:border-blue-600 rounded-lg"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button className="text-blue-600 text-sm font-semibold hover:underline">
                Forgot Password?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:opacity-80 transition duration-300"
            >
              Log In
            </button>
          </form>

          {/* OR */}
          <div className="relative text-sm">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-gray-500 uppercase">Or</span>
            </div>
          </div>

          {/* Dont have account */}
          <div className="text-center text-sm ">
            <span className="text-gray-600">Don't have an account?</span>
            <span> </span>
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </button>
          </div>
        </motion.div>
        <p className="text-center text-xs text-gray-500/70 mt-8 flex items-center gap-1">
          By continuing, you agree to our{" "}
          <span className="underline hover:text-gray-500">Terms of Service</span> and{" "}
          <span className="underline hover:text-gray-500">Privacy Policy</span>.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
