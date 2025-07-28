// Функция за анимация с падащи пари
import { motion } from "framer-motion";
import { memo } from "react";

const WinAnimation = memo(() => {
  const animationCount = 8;

  return (
    <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-30">
      {[...Array(animationCount)].map((_, i) => {
        const startX = 10 + i * 10;
        const endX = startX + (Math.random() * 8 - 4);
        const rotate = Math.random() * 360;
        const duration = 1.0 + Math.random() * 0.3; // Намаляваме duration

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
              top: "85%",
              left: `${endX}%`,
              opacity: 0,
              rotate,
              scale: 1.1, // Намаляваме scale
            }}
            transition={{
              duration,
              ease: "easeIn",
              type: "tween", // Използваме tween за по-добра производителност
            }}
            className="absolute text-2xl sm:text-3xl select-none"
            style={{
              pointerEvents: "none",
              willChange: "transform, opacity", // Оптимизация за GPU
            }}
          >
            <img
              src="https://www.bitcoin.com/images/uploads/home/BTC.webp"
              className="w-16 h-16 sm:w-20 sm:h-20"
              loading="lazy"
            />
          </motion.span>
        );
      })}
    </div>
  );
});

WinAnimation.displayName = "WinAnimation";

export default WinAnimation;
