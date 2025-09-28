"use client";
import { useEffect, useRef, useState } from "react";

export default function LazySection({ children, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"} ${className}`}
    >
      {isVisible && children}
    </section>
  );
}
