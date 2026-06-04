import { FaRegCheckSquare } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required to create an account.");
      return;
    }

    const register = async () => {
      try {
        setIsLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL || "";
        const response = await fetch(`${apiUrl}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) throw new Error("registration failed");
        await response.json();

        navigate("/login");
        setError("");
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    register();
  };
  return (
    <div className="px-6 flex h-screen items-center justify-center text-mauve-300 bg-gray-900">
      <div>
        <h2 className="text-3xl font-bold mb-3 text-center">
          <FaRegCheckSquare className="inline-block text-4xl mr-2 text-green-500" />
          System Task
        </h2>
        <p>Enter your details to create an account</p>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter your username"
            className="mt-4 rounded-md p-2 border border-mauve-300 text-mauve-300 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-100 w-full mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-4 rounded-md p-2 border border-mauve-300 text-mauve-300 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-100 w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="mt-4 rounded-md p-2 border border-mauve-300 text-mauve-300 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-100 w-full mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-rose-500 text-xs mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-slate-400">
          <Link to="/login" className="underline hover:text-white">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
