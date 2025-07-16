import { Search } from "lucide-react";

const CryptoSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <>
      <div className="pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Ready to explore the markets?</p>
            <p className="text-2xl font-bold text-gray-900">
              Start with our live cryptocurrency data below
            </p>
          </div>
        </div>
      </div>
      <form className="max-w-md mx-auto py-5">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Bitcoin, ETH..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
    </>
  );
};

export default CryptoSearch;
