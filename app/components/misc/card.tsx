"use client";

import { motion, PanInfo } from "framer-motion"
import { useState } from "react"
import User from "./user";
import Image from "next/image";

interface SwipeCardProps {
  user: User
  onSwipe: (direction: "left" | "right" | "neutral") => void
  active: boolean
}

export default function Card({ user, onSwipe, active }: SwipeCardProps) {
  const [dragDirection, setDragDirection] = useState<"left" | "right" | null>(null);

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
      const direction = info.offset.x > 0 ? "right" : "left"
      const update = () => {
        onSwipe(direction)
        setDragDirection("neutral")
      }
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
                py-2
                px-4
                transform -rotate-20
                z-10
                btn
                btn-success
                "
                initial={{ opacity: 0.3, scale: 0.8 }}
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
                pointer-events-none
                font-bold
                py-2
                px-4
                shadow-lg
                transform rotate-20
                z-10
                btn
                btn-error
                "
                initial={{ opacity: 0.3, scale: 0.8 }}
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
          <div className="w-64 h-64 rounded-xl overflow-hidden">
            <div className={"avatar w-full h-full z-0"}>
                <Image src={user.avatar} width={96} height={96} alt="profile"></Image>
            </div>
          </div>
          <div className="flex items-center flex-col ">
             <motion.h2
            className="text-2xl mt-10 font-bold text-gray-800"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {user.name} <a className="text-gray-600 text-base">[{user.elo} elo]</a>
          </motion.h2>
        <div className="p-6">
          <motion.p
            className="text-gray-600 mt-2 line-clamp-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {user.profile!.bio}
          </motion.p>
        </div>
          </div>
        </div>
           
      </motion.div>
    </div>
  );
}
