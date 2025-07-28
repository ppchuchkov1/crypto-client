import { motion } from "framer-motion";

const Reel = ({ symbol, spinning }) => {
  return (
    <div className="flex flex-col items-center justify-center mx-2 sm:mx-4 w-30 sm:w-60 h-[95%] sm:h-64 bg-white rounded-lg shadow-inner transition-all duration-500">
      <motion.img
        src={symbol.img}
        alt="symbol"
        className="w-full h-full  object-contain drop-shadow-lg"
        draggable={false}
        animate={
          spinning ? { scale: [1, 1.08, 1.08, 1] } : { rotate: 0, scale: 1 }
        }
      />
    </div>
  );
};

export default Reel;
