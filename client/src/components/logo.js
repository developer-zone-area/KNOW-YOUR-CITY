import React, { useState, useEffect } from 'react';
import './logo.css'; // For your CSS styles

const NeonTextEffect = () => {
    const words = ['KNOW', 'YOUR', 'CITY'];
    const [glowingWordIndex, setGlowingWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlowingWordIndex(prevIndex => (prevIndex + 1) % words.length);
        }, 1000); // Change glow every 1 second

        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <div className="city-logo-container">
            {/* Your city background and building SVGs/HTML elements would go here */}
            <div className="neon-text-group">
                {words.map((word, index) => (
                    <span
                        key={word}
                        className={`neon-word ${glowingWordIndex === index ? 'glowing' : ''}`}
                    >
                        {word}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default NeonTextEffect;