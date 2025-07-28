import { AlertTriangle, RefreshCw, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const DepositCancel = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="mx-auto w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mb-8">
          <AlertTriangle className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-4xl font-bold text-black mb-4">Deposit Failed</h1>

        <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-md mx-auto">
          We couldn't process your wallet deposit. This might be due to network
          issues or temporary service interruption.
        </p>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 text-left rounded-r-lg">
          <h3 className="font-semibold text-red-800 mb-2">What happened?</h3>
          <p className="text-red-700">
            The transaction couldn't be completed due to network connectivity
            issues. Please try again in a few moments.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <Link
            to="/deposite"
            className="w-full bg-black text-white font-semibold py-4 px-6 rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center text-lg"
          >
            <RefreshCw className="w-5 h-5 mr-3" />
            Try Again
          </Link>

          <Link
            to="/deposite"
            className="w-full bg-white text-black font-semibold py-4 px-6 rounded-lg border-2 border-black hover:bg-black hover:text-white transition-all duration-200 flex items-center justify-center text-lg"
          >
            <HelpCircle className="w-5 h-5 mr-3" />
            Get Help
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DepositCancel;
