'use client'
import { useState } from 'react';
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable'

const images = [
  'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
  'https://images.unsplash.com/photo-1517638851339-a711cfcf3279?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
  'https://images.unsplash.com/photo-1575991487332-995f5e0c4ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80',
  'https://images.unsplash.com/photo-1528033891155-8bfa0f94c5b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [showImage, setShowImage] = useState<boolean>(true);
  const [swipeDirection, setSwipeDirection] = useState<number>(1); // 1 for right, -1 for left

  const handleImageClick = (index: number) => {
    setShowImage(false);
    setCurrentImage(index);
    setTimeout(() => {
      setShowImage(true);
    }, 500);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => { setSwipeDirection(1); handleSwipe(currentImage + 1); },
    onSwipedRight: () => { setSwipeDirection(-1); handleSwipe(currentImage - 1); },
    trackMouse: true
  });

  const handleSwipe = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = images.length - 1;
    } else if (newIndex >= images.length) {
      newIndex = 0;
    }
    handleImageClick(newIndex);
  };

  return (
    <main className="flex flex-col min-h-screen" {...handlers}>
      <div className="m-auto w-full max-w-4xl">
        <div className="min-h-[300px]">
          <AnimatePresence>
            {showImage
              ?
              <motion.div
                key="main-image"
                initial={{ opacity: 0, x: 500 * swipeDirection }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -500 * swipeDirection }}
                transition={{ duration: 0.3 }}
              >
                <Image src={images[currentImage]} width={1920} height={1080} alt="Image" />
              </motion.div>
              : null
            }
          </AnimatePresence>
        </div>
        <div className="grid grid-cols-4">
          {images.map((image, index) => (
            <Image
              className={`transition-all ease-in-out cursor-pointer hover:opacity-70 ${index === currentImage ? 'scale-110' : ''}`}
              src={image}
              width={1920}
              height={1080}
              alt="Image"
              key={`image-thumb-${index}`}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}