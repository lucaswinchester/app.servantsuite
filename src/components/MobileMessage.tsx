// components/MobileMessage.tsx
import React from 'react';
import style from 'styled-jsx/style';

export function MobileMessage() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        color: 'white',
        padding: '2rem',
        maxWidth: '400px',
        animation: 'fadeInUp 0.6s ease-out'
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '1.5rem'
        }}>📱</div>
        
        <h1 style={{
          fontSize: '2.2rem',
          fontWeight: 700,
          marginBottom: '1rem',
          color: '#ffffff'
        }}>Desktop Only</h1>
        
        <p style={{
          fontSize: '1.1rem',
          lineHeight: 1.6,
          marginBottom: '0.8rem',
          color: 'rgba(255, 255, 255, 0.9)'
        }}>ServantSuite is currently available on desktop only.</p>
        
        <p style={{
          fontSize: '1.1rem',
          lineHeight: 1.6,
          marginBottom: '0.8rem',
          color: '#ffd700',
          fontWeight: 600
        }}>Mobile app coming soon!</p>
        
        <div style={{
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <p style={{
            fontSize: '0.95rem',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '0.3rem'
          }}>Please visit us on a desktop computer</p>
          <p style={{
            fontSize: '0.95rem',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '0.3rem'
          }}>for the full experience.</p>
        </div>
      </div>
    </div>
  );
}
