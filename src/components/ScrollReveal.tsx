import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  duration?: number; // ms
  yOffset?: number; // px, default 20
  scale?: number; // default 1
  id?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 600,
  yOffset = 20,
  scale = 1,
  id,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If user prefers reduced motion, reveal immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      id={id}
      ref={domRef}
      className={className}
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed
          ? 'translate3d(0, 0, 0) scale(1)'
          : `translate3d(0, ${yOffset}px, 0) scale(${scale})`,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: isRevealed ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
