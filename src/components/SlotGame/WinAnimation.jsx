// Функция за анимация с падащи пари
import { motion } from "framer-motion";

export default function WinAnimation() {
  return (
    <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-30">
      {[...Array(12)].map((_, i) => {
        const startX = 8 + i * 7;
        const endX = startX + (Math.random() * 10 - 5);
        const rotate = Math.random() * 360;
        const duration = 1.2 + Math.random() * 0.5;
        return (
          <motion.span
            key={i}
            initial={{
              top: 0,
              left: `${startX}%`,
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            animate={{
              top: "90%",
              left: `${endX}%`,
              opacity: 0,
              rotate,
              scale: 1.2,
            }}
            transition={{ duration, ease: "easeIn" }}
            className="absolute text-3xl sm:text-4xl select-none"
            style={{ pointerEvents: "none" }}
          >
            <img
              src="https://www.bitcoin.com/images/uploads/home/BTC.webp"
              className="w-20 h-20 sm:w-30 sm:h-30"
            />
          </motion.span>
        );
      })}
    </div>
  );
}
