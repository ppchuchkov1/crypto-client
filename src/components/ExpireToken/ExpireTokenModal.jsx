import { ShieldX } from "lucide-react";
import useAuthStore from "../../zustang/useAuthStore";

import ExpireTokenLogin from "./ExpireTokenLogin";

import Modal from "../../UI/Modal";
import { useEffect } from "react";

const ExpireTokenModal = () => {
  const isExpireToken = useAuthStore((state) => state.isExpireToken);
  const setIsExpireToken = useAuthStore((state) => state.setIsExpireToken);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (isExpireToken) {
      logout();
    }
    // logout само при първо показване
    // eslint-disable-next-line
  }, [isExpireToken]);

  if (!isExpireToken) return null;

  return (
    <Modal
      isOpen={isExpireToken}
      className="bg-white"
      onClose={() => {
        setIsExpireToken(false);
        logout();
      }}
    >
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full">
        <ShieldX className="w-8 h-8 text-red-600" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 text-center mb-2">
        Session Expired
      </h2>
      <p className="text-gray-600 text-center max-w-md">
        Your session has expired for security reasons. Please log in again to
        continue.
      </p>
      {/* <ExpireTokenLogin /> */}
    </Modal>
  );
};

export default ExpireTokenModal;
