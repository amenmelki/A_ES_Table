import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const LoadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const LoadingImage = styled(motion.img)`
  width: 450px;
  height: 150px;
  margin-bottom: 20px;
`;

const Spinner = styled(motion.div)`
  width: 80px;
  height: 80px;
  border: 8px solid green;
  border-top: 8px solid transparent;
  border-radius: 50%;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingScreen = () => {
  return (
    <LoadingContainer
      initial={{ opacity: 0, scale: 0, backgroundColor: '#90ee90' }}
      animate={{ opacity: 1, scale: [0, 1.2, 1], backgroundColor: '#f0f0f0' }}
      transition={{
        duration: 1,
        ease: "easeIn",
        times: [0, 0.5, 1],
        scale: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      <LoadingImage
        src="/Logo-menu-actia.png"
        alt="Loading"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      />
      <Spinner
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
    </LoadingContainer>
  );
};

export default LoadingScreen;