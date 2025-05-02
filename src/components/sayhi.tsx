import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { useAnimation, motion } from 'framer-motion';
import PaperPlaneIcon from '../assets/paperplane.svg';

interface SayHiProps {
  className?: string;
  size?: number;
}

const MotionWrapper = motion.div;
const MotionA = motion.a;
const MotionDiv = motion.div;
const MotionSpan = motion.span;

const SayHi: React.FC<SayHiProps> = ({ className, size = 100 }) => {
  const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
  const iconControls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [pulseSpeed, setPulseSpeed] = useState(0.5);

  // Shake + heartbeat speed-up
  useEffect(() => {
    if (isHovered) {
      iconControls.start({
        rotate: [0, -15, 15, -10, 10, -5, 5, 0],
        transition: {
          duration: 0.8,
          ease: 'easeInOut',
        },
      });

      let speed = 1.2;
      const interval = setInterval(() => {
        speed = Math.max(0.5, speed - 0.1);
        setPulseSpeed(speed);
      }, 800);

      return () => clearInterval(interval);
    } else {
      setPulseSpeed(1.2);
    }
  }, [isHovered, iconControls]);

  return (
        <MotionWrapper
        className={cn("w-full h-full flex items-center justify-center", className)}
        animate={{
            scale: isHovered ? [1, 1.08, 1] : 1
        }}
        transition={{
            duration: 0.4,
            ease: "easeInOut",
            scale: {
            repeat: isHovered ? Infinity : 0,
            repeatType: 'loop',
            duration: pulseSpeed,
            }
        }}
  style={{
    transformOrigin: 'center',
    willChange: 'transform',
  }}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>

    <MotionA
    href="mailto:charles.lclcq@gmail.com"
    className={cn(
        "w-full h-36 flex flex-col items-center justify-center font-semibold rounded-lg cursor-pointer",
        isHovered
          ? "bg-white"
          : "bg-gray-800 text-gray-400 dark:bg-gray-800 dark:text-gray-400",
        className
      )}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >



        <MotionDiv
          style={{
            width: size * 0.4,
            height: size * 0.4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
            filter: isHovered ? 'drop-shadow(0 0 10px red)' : 'none',
          }}
          animate={
            isHovered
              ? { filter: colors.map(color => `drop-shadow(0 0 10px ${color})`) }
              : {}
          }
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: 'linear'
          }}
        >
          <img
            src={PaperPlaneIcon}
            alt="Paper Plane"
            style={{
              width: '100%',
              height: '100%',
              filter: isHovered ? undefined : 'grayscale(100%)',
            }}
          />
        </MotionDiv>

        <MotionSpan
  className="text-xs sm:text-sm md:text-base text-center"
  animate={isHovered ? { color: colors, scale: [1, 1.2, 1] } : { scale: 1 }}
  style={{ fontSize: '0.65rem'}}
  transition={{
    repeat: isHovered ? Infinity : 0,
    repeatType: 'loop',
    duration: pulseSpeed,
    ease: 'easeInOut',
  }}
>
  SAY HI!
</MotionSpan>

      </MotionA>
    </MotionWrapper>
  );
};

export default SayHi;
