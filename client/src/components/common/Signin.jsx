import React, { useMemo } from 'react';
import { SignIn } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

function Signin() {
  const words = ['Stories', 'Ideas', 'Thoughts', 'Creativity', 'Inspiration', 'Writing', 'Imagination', 'Perspective'];

  const leftWords = words.filter((_, index) => index % 2 === 0); // Even index words -> Left side
  const rightWords = words.filter((_, index) => index % 2 !== 0); // Odd index words -> Right side

  // Generate positions for words on left and right sides
  const generatePositions = (wordList, isRightSide) => 
    wordList.map((word, index) => {
      const left = isRightSide ? `${Math.random() * 15 + 75}%` : `${Math.random() * 5 + 5}%`; // Right (75-90%) or Left (5-20%)
      const top = `${(index / wordList.length) * 90 + 5}%`; // Evenly spaced from top to bottom
      return { word, left, top };
    });

  const leftWordPositions = useMemo(() => generatePositions(leftWords, false), [leftWords]);
  const rightWordPositions = useMemo(() => generatePositions(rightWords, true), [rightWords]);

  return (
    <div 
      className='sign d-flex justify-content-center align-items-center position-relative overflow-hidden' 
      style={{ 
        background: 'linear-gradient(135deg, rgba(17,2,33,1) 0%, rgba(36,11,54,1) 50%, rgba(17,2,33,1) 100%)',
        minHeight: '100vh', 
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0 
      }}
    >
      {/* Floating words - Left Side */}
      {leftWordPositions.map(({ word, left, top }, index) => (
        <motion.span
          key={`left-${index}`}
          className='position-absolute text-light fw-bold back'
          style={{
            fontSize: '',
            opacity: 0.3,
            left,
            top,
            zIndex: 0, 
          }}
          animate={{ 
            opacity: [0, 0.6, 0], 
            y: [-10, 10, -10] 
          }}
          transition={{ duration: 6, repeat: Infinity, delay: index * 1.2 }}
        >
          {word}
        </motion.span>
      ))}

      {/* Floating words - Right Side */}
      {rightWordPositions.map(({ word, left, top }, index) => (
        <motion.span
          key={`right-${index}`}
          className='position-absolute text-light fw-bold back'
          style={{
            fontSize: '',
            opacity: 0.3,
            left,
            top,
            zIndex: 0, 
          }}
          animate={{ 
            opacity: [0, 0.6, 0], 
            y: [-10, 10, -10] 
          }}
          transition={{ duration: 6, repeat: Infinity, delay: index * 1.2 }}
        >
          {word}
        </motion.span>
      ))}
      
      {/* Content container */}
      <motion.div 
        className='position-relative z-2' 
        style={{ marginTop: '-240px', marginRight: '-50px', marginBottom: '0' }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      > 
      <div className='signin-container'>
        <p className='text-light  login'>Log in and pick up right where you left off!</p>
        <SignIn />
        </div>
      </motion.div>
    </div>
  );
}

export default Signin;
