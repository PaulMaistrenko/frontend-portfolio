import { useEffect, useRef } from "react";

export default function SpotlightOverlay() {
  const overlayRef = useRef(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX);
      currentY += (mouseY - currentY);

      if (overlayRef.current) {
        overlayRef.current.style.setProperty("--x", `${currentX}px`);
        overlayRef.current.style.setProperty("--y", `${currentY}px`);
      }

      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div ref={overlayRef} className="spotlight-overlay" />;
}
