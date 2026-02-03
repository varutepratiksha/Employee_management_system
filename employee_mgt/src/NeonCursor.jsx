import { useEffect } from "react";
import "./NeonCursor.css";

const NeonCursor = () => {
  useEffect(() => {
    const ring = document.querySelector(".cursor-ring");
    const dot = document.querySelector(".cursor-dot");

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const moveHandler = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";

      // Tail
      const trail = document.createElement("div");
      trail.className = "trail";
      trail.style.left = mouseX + "px";
      trail.style.top = mouseY + "px";
      document.body.appendChild(trail);

      setTimeout(() => trail.remove(), 600);
    };

    const clickHandler = (e) => {
      for (let i = 0; i < 18; i++) {
        const p = document.createElement("div");
        p.className = "burst";
        p.style.left = e.clientX + "px";
        p.style.top = e.clientY + "px";
        document.body.appendChild(p);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 80 + 30;

        p.animate(
          [
            { transform: "translate(0,0)", opacity: 1 },
            {
              transform: `translate(${Math.cos(angle) * distance}px, 
                                   ${Math.sin(angle) * distance}px)`,
              opacity: 0
            }
          ],
          { duration: 600, easing: "cubic-bezier(.17,.67,.45,1)" }
        );

        setTimeout(() => p.remove(), 600);
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";

      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("click", clickHandler);
    animate();

    return () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  return (
    <>
      <div className="cursor-ring"></div>
      <div className="cursor-dot"></div>
    </>
  );
};

export default NeonCursor;
