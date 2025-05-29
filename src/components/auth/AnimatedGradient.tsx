import React from 'react';
import '../../styles/animation.css';

const AnimatedGradient = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="animated-gradient"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5"></div>
    </div>
  );
};

export default AnimatedGradient;
