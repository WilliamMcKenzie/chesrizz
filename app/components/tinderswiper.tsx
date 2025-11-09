'use client'

import SwipeCard from "./swipping"
import { useState } from "react"
import { motion, AnimatePresence } from 'framer-motion';


interface Card {
  id: number;
  name: string;
  bio: string;
  image: string;
}
  
const testCards: Card[] = [
  {
    id: 1,
    name: 'Alex',
    bio: 'Love hiking and coffee. Looking for someone to explore the city with!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
  },
  {
    id: 2,
    name: 'Jordan',
    bio: 'Travel enthusiast and bookworm. Always planning the next adventure.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop',
  },
]

export default function TinderSwiper(props) {
    const emails = props.emails
    const [myCards, setMyCards] = useState<Card[]>(testCards);
    const [swipeHistory, setSwipeHistory] = useState<{id: number, direction: 'left' | 'right'}[]>([]);

    const handleSwipe = (direction: 'left' | 'right') => {
        const currCard = myCards[0];
        if(!currCard) return;
        setSwipeHistory(current => [...current, {id: currCard.id, direction: direction}])
        setMyCards(current => current.slice(1));
    };
    
    const currCard = myCards[0];
    const nextCard = myCards[1];
    const noMore = myCards.length === 0;

    global.smashes = swipeHistory.filter(swipe => swipe.direction === 'right').length;
    global.passes = swipeHistory.filter(swipe => swipe.direction === 'left').length;

    return noMore ? (<div>no more images</div>) :(
        
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        
        <div>
      <SwipeCard card={currCard} active={true} onSwipe={handleSwipe} className="flex " />
      
      </div>

    </div>
  );
    
}