import Navbar from "../components/Navbar";
import Endbar from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { CircleAlert, Lock, Mail, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
const SignUp = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { cartId, setCartId } = useCart();

  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [role, setRole] = useState<"USER" | "ADMIN" | "SELLER">("USER");
  const [error, setError] = useState<string | null>(null);

  async function validateAndRegister(e: React.FormEvent) {
    e.preventDefault();

    if (!name && !email && !password) {
      setError("All Fields must not be empty");
      return;
    }

    if ((name ?? "").length < 3) {
      setError("Name must have atleast 3 letters");
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
    registerUser();
  }

  async function registerUser() {
    try {
      const payload = {
        name: name,
        email: email,
        password: password,
        role: role,
      };
      const response = await axios.post(
        `${BACKEND_URL}/user/register`,
        payload,
        { withCredentials: true }
      );

      if (response.status === 201) {
        const data = response.data as any;
        console.log(data);
        console.log("User has been registered");
        setCartId(data.cartId);
        if (data.role === "USER") {
          navigate("/home");
        }
        if (data.role === "SELLER") {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      const err = error as AxiosError;

      if (err.response.status === 409) {
        console.log("User email already exists");
        setError(err.response.data.message);
      } else if (err.response.status === 500) {
        console.log("Internal Server Error");
        setError(err.response.data.message);
      } else {
        console.log("Unexpected Error while registering");
        setError("Unexpected error occurred");
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
            <h1 className="text-xl font-bold tracking-tight">Sign In</h1>
            <p className="text-gray-500">
              Enter your credentials to register your account
            </p>
          </div>

          <form onSubmit={validateAndRegister} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <p className="font-medium ">Full Name</p>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <User className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name ?? ""}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-10 w-full border border-gray-300 p-2 focus:border-2 focus:border-indigo-600 rounded-lg"
                />
              </div>
            </div>
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

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:opacity-80 transition duration-300"
            >
              Sign In
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
            <span className="text-gray-600">Already have an account?</span>
            <span> </span>
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Log In
            </button>
          </div>
        </motion.div>
        <p className="text-center text-xs text-gray-500/70 mt-8 flex items-center gap-1">
          By continuing, you agree to our{" "}
          <p className="underline hover:text-gray-500">Terms of Service</p> and{" "}
          <p className="underline hover:text-gray-500">Privacy Policy</p>.
        </p>
      </div>

      <Endbar />
    </div>
  );
};

export default SignUp;
