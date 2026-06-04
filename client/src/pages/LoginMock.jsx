import { FaRegCheckSquare } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginMock = ({ checkAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    const login = async () => {
      try {
        setIsLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL || "";
        const response = await fetch(`${apiUrl}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });
        if (!response.ok) throw new Error("Invalid email or password");
        await response.json();

        checkAuth();
        setError("");
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    login();
  };
  return (
    <div className="flex h-screen items-center justify-center text-mauve-300 bg-gray-900">
      <div>
        <h2 className="text-3xl font-bold mb-3 text-center">
          <FaRegCheckSquare className="inline-block text-4xl mr-2 text-green-500" />
          System Task
        </h2>
        <p>Enter your email and password to access your workspace</p>
        <form onSubmit={handleLogin}>
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
            disabled={isLoading}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-slate-400">
          <Link to="/register" className="underline hover:text-white">
            Don't have an account? Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginMock;
