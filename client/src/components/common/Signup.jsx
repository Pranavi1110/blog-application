import React, { useMemo } from 'react';
import { SignUp } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

function Signup() {
  const words = ['Explore', 'Create', 'Inspire', 'Innovate', 'Discover', 'Express', 'Dream', 'Vision'];

  const leftWords = words.filter((_, index) => index % 2 === 0);
  const rightWords = words.filter((_, index) => index % 2 !== 0);

  const generatePositions = (wordList, isRightSide) => 
    wordList.map((word, index) => {
      const left = isRightSide ? `${Math.random() * 15 + 75}%` : `${Math.random() * 15 + 5}%`;
      const top = `${(index / wordList.length) * 90 + 5}%`;
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
      
      <motion.div 
        className='position-relative z-2' 
        style={{ marginTop: '-240px', marginRight: '-50px', marginBottom: '0' }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      ><div className='signin-container'>
        <p className='text-light login'>Sign up and start your journey today!</p>
        <SignUp />
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;