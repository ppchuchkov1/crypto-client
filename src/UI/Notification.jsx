import useNotificationStore from "../zustang/useNotificationStore";

const icons = {
  success: (
    <div className="inline-flex items-center justify-center w-8 h-8 text-green-500 rounded-lg  ">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
      </svg>
    </div>
  ),
  error: (
    <div className="inline-flex items-center justify-center w-8 h-8 text-red-500 rounded-lg ">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
      </svg>
    </div>
  ),
  warning: (
    <div className="inline-flex items-center justify-center w-8 h-8 text-orange-500 rounded-lg ">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
      </svg>
    </div>
  ),
  info: (
    <div className="inline-flex items-center justify-center w-8 h-8 text-blue-500 rounded-lg ">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 0-2 0 1 1 0 0 0 2 0ZM9 9a1 1 0 0 0 0 2v3a1 1 0 0 0 2 0v-3a1 1 0 0 0-2-2Z" />
      </svg>
    </div>
  ),
};

const Notification = () => {
  const { isVisible, message, type } = useNotificationStore();

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-500">
      <div className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm ">
        {icons[type] || icons.info}
        <div className="ms-1 text-sm font-normal">{message}</div>
      </div>
    </div>
  );
};

export default Notification;
