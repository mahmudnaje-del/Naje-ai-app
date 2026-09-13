import React from 'react';
import najeThinkingBrain from '../assets/icons/naje-thinking-brain.svg';

// مؤشر تفكير Naje AI — يستعرض تفكير العقول الذكية لـ Naje
export function NajeThinking({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src={najeThinkingBrain}
      width={size}
      height={size}
      alt="ناجي يفكّر"
      className={className}
      style={{ display: 'block' }}
    />
  );
}

export default NajeThinking;
