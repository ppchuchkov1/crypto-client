const Modal = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center `}>
      <div
        className="absolute inset-0  bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div
        className={`relative rounded-lg mx-4 p-6 z-10 transform transition-all duration-200 scale-100 ${className}`}
        onClick={(e) => e.stopPropagation()} // prevent close when click inside the modal
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
