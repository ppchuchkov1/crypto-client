import { CheckCircle, ArrowRight, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const DepositeSuccess = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="mx-auto w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mb-8">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-4xl font-bold text-black mb-4">
          Deposit Successful
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-md mx-auto">
          Your funds have been successfully added to your wallet. The
          transaction has been confirmed and processed.
        </p>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 text-left rounded-r-lg">
          <h3 className="font-semibold text-green-800 mb-2">
            Transaction Complete
          </h3>
          <p className="text-green-700">
            Your deposit has been processed successfully and is now available in
            your wallet balance.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <Link
            to="/profile"
            className="w-full bg-black text-white font-semibold py-4 px-6 rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center text-lg"
          >
            <Eye className="w-5 h-5 mr-3" />
            View Wallet
          </Link>

          <Link
            to="/"
            className="w-full bg-white text-black font-semibold py-4 px-6 rounded-lg border-2 border-black hover:bg-black hover:text-white transition-all duration-200 flex items-center justify-center text-lg"
          >
            <ArrowRight className="w-5 h-5 mr-3" />
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DepositeSuccess;
