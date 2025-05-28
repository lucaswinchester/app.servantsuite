import React from 'react';
import '../../styles/animation.css';

const AnimatedBackground = () => {
  return (
    <>
      <div className="animated-gradient"></div>
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white/5 via-transparent to-black/5"></div>
    </>
  );
};

export default AnimatedBackground;

