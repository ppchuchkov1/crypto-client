import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import useAuthStore from "../../zustang/useAuthStore";

const RegisterForm = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const token = useAuthStore((state) => state.token);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    setError(null);

    try {
      await register(email, password);
      if (token?.length > 0) {
        navigate("/");
      } else {
        setError("Login error. Check your email and password");
      }
    } catch (err) {
      setError("Registration failed. Email may already be in use");
    }
  };

  return (
    <div className="flex min-h-[95vh] flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="FTX" src={logo} className="mx-auto h-8 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-2 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-2 sm:text-sm"
            />
          </div>

          <div>
            <button
              onClick={handleRegister}
              className="flex w-full justify-center rounded-md bg-ftx px-3 py-1.5 text-sm font-semibold text-white shadow-sm cursor-pointer focus-visible:outline-2"
            >
              Register
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-4 text-center text-sm text-red-600">{error}</p>
        )}
        {token && (
          <p className="mt-4 text-center text-sm text-green-600">
            Успешна регистрация!
          </p>
        )}

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-ftx">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
