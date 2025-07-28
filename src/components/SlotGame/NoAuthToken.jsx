import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import sbfImage from "../../assets/slot/start.png";
export default function CasinoAuthPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="border bg-black/20 backdrop-blur-sm rounded-2xl p-8 space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">
              Casino Betman-Fried
            </h2>
            <p className="text-gray-400">
              Please login or create an account to access our casino games
            </p>
          </div>
          <img className=" block mx-auto" src={sbfImage} alt="" />
          <div className="space-y-4">
            <button
              onClick={handleLogin}
              className="w-full bg-white text-black py-4 px-8 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-3"
            >
              <User size={24} />
              <span>Login</span>
            </button>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p>Join thousands of players worldwide</p>
        </div>
      </div>
    </div>
  );
}
