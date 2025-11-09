"use client";

import { useState } from "react";
import { motion, PanInfo } from "framer-motion";
import { useEffect } from "react";
interface Card {
  id: number;
  name: string;
  bio: string;
  image?: string[] | string;
}

interface SwipeCardProps {
  card: Card;
  onSwipe: (direction: "left" | "neutral" | "right") => void;
  active: boolean;
}
//
export default function SwipeCard({ card, onSwipe, active }: SwipeCardProps) {
  const [dragDirection, setDragDirection] = useState<
    "left" | "right" | "neutral" | null
  >(null);

  const swipeThreshold = 100;
  const velocityThreshold = 500;

  const isDragged = (event: any, info: PanInfo) => {
    if (info.offset.x > swipeThreshold) {
      setDragDirection("right");
    } else if (info.offset.x < -swipeThreshold) {
      setDragDirection("left");
    } else {
      setDragDirection("neutral");
    }
  };

  const dragEnded = (
    event: MouseEvent | PointerEvent | TouchEvent,
    info: PanInfo
  ) => {
    if (!active) return;

    const swiped =
      Math.abs(info.offset.x) > swipeThreshold ||
      Math.abs(info.velocity.x) > velocityThreshold;

    if (swiped) {
      const direction = info.offset.x > 0 ? "right" : "left";
      const update = () => {
        onSwipe(direction);
        setDragDirection("neutral");
      };
      update();
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <motion.div
        className={`
        absolute
        w-100 h-[600px]
        bg-white
        rounded-2xl
        border-black
        border-3
        shadow-2xl
        cursor-grab
        overflow-hidden
        ${active ? `cursor-grab active:cursor-grabbing` : `cursor-auto`}
        `}
        drag={active ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.6}
        dragDirectionLock
        onDrag={isDragged}
        onDragEnd={dragEnded}
        dragListener={true}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        exit={{
          x: dragDirection === "left" ? -1000 : 1000,
          rotate: dragDirection === "left" ? -30 : 30,
          opacity: 0,
          transition: { duration: 0.5 },
        }}
      >
        <div className="bg-white-300 w-full h-1/10 flex justify-center items-center ">
          {active && (
            <>
              <motion.div
                className="
            absolute
            pointer-events-none
            top-4
            left-3
            border-2
            border-green-400
            text-black
            font-bold
            py-2
            px-4
            rounded-xl
            shadow-lg
            transform -rotate-6
            bg-white/90
            z-10
            "
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: dragDirection === "left" ? 1 : 0.3,
                  scale: dragDirection === "left" ? 1.1 : 0.8,
                }}
              >
                Smash
              </motion.div>
              <motion.div
                className="
            absolute
            top-4
            right-3
            border-2
            border-red-400
            text-black
            pointer-events-none
            font-bold
            py-2
            px-4
            rounded-xl
            shadow-lg
            transform rotate-6
            bg-white/90
            z-10
            "
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: dragDirection === "right" ? 1 : 0.3,
                  scale: dragDirection === "right" ? 1.1 : 0.8,
                }}
              >
                Pass
              </motion.div>
            </>
          )}
        </div>
        <div className="flex justify-center mt-10 items-center flex-col">
          <div className="w-64 h-64 rounded-full border-3 overflow-hidden">
            <motion.img
              draggable={false}
              src={card.image}
              alt={card.name}
              className=" w-full h-full  z-0"
            />
          </div>
          <div className="flex items-center flex-col ">
            <motion.h2
              className="text-2xl mt-10 font-bold text-gray-800"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {card.name}
            </motion.h2>
            <div className="p-6">
              <motion.p
                className="text-gray-600 mt-2 line-clamp-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {card.bio}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}