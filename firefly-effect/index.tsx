"use client";

import { useEffect, useRef } from "react";

const FireflyEffect = ({
  circleCount = 230,
  speedFactor = 2,
  minRadius = 5,
  maxRadius = 5,
  focusRadius = 200,
  glowIntensity = 15,
  maxOpacity = 1,
  minOpacity = 0,
  intensityPower = 3.5,
  backgroundColor = "#000000",
  color1 = "#ffffff",
  color2 = "#ffffff",
  color3 = "#ffffff",
  color4 = "#ffffff",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null
  });

  const colors = [color1, color2, color3, color4];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    class Circle {
      x: number;
      y: number;
      baseRadius: number;
      baseDx: number;
      baseDy: number;
      ctx: CanvasRenderingContext2D;
      color: string;
      noiseOffsetX: number;
      noiseOffsetY: number;
      randomFactor: number;
      twinklePhase: number;
      twinkleSpeed: number;
      opacityPhase: number;

      constructor(
        x: number,
        y: number,
        radius: number,
        context: CanvasRenderingContext2D
      ) {
        this.x = x;
        this.y = y;
        this.baseRadius = radius;
        this.baseDx = (Math.random() - 0.5) * 1.5;
        this.baseDy = (Math.random() - 0.5) * 1.5;
        this.ctx = context;

        this.color = colors[Math.floor(Math.random() * colors.length)];

        this.noiseOffsetX = x * 0.01;
        this.noiseOffsetY = y * 0.01;

        this.randomFactor = 0.7 + Math.sin(x * 0.05) * 0.3;
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.twinkleSpeed = 0.65 + Math.random() * 1.2;
        this.opacityPhase = Math.random() * Math.PI * 2;
      }

      draw(mouseX: number | null, mouseY: number | null, time: number): void {
        const noiseOffset =
          Math.sin(this.noiseOffsetX + this.noiseOffsetY) * 30 +
          Math.cos(this.noiseOffsetX * 2 - this.noiseOffsetY * 1.5) * 25;
        const twinkle = (Math.sin(time * this.twinkleSpeed + this.twinklePhase + noiseOffset * 0.02) + 1) * 0.5;
        const ambientIntensity = (0.12 + twinkle * 0.24) * this.randomFactor;

        let hoverIntensity = 0;
        if (mouseX !== null && mouseY !== null) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const adjustedDistance = distance + noiseOffset;

          if (adjustedDistance < focusRadius) {
            const proximity = 1 - adjustedDistance / focusRadius;
            hoverIntensity = Math.pow(proximity, intensityPower) * this.randomFactor;
          }
        }

        const intensity = Math.min(1, ambientIntensity + hoverIntensity);
        const sizeIntensity = Math.min(1, ambientIntensity);
        const renderRadius = this.baseRadius + maxRadius * (0.08 + sizeIntensity * 0.42);
        const movingOpacity = (Math.sin(this.opacityPhase) + 1) * 0.5;
        const opacity = Math.min(maxOpacity, Math.max(minOpacity, movingOpacity * maxOpacity));

        this.ctx.save();
        this.ctx.beginPath();

        this.ctx.shadowBlur = glowIntensity * (0.35 + intensity) + twinkle * 4;
        this.ctx.shadowColor = this.color;
        this.ctx.globalAlpha = opacity;
        this.ctx.fillStyle = this.color;

        this.ctx.arc(this.x, this.y, renderRadius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      }

      update(width: number, height: number, mouseX: number | null, mouseY: number | null, time: number): void {
        // Keep a constant drift speed regardless of cursor position.
        const driftMultiplier = 0.22;
        const stepX = this.baseDx * speedFactor * driftMultiplier;
        const stepY = this.baseDy * speedFactor * driftMultiplier;
        this.x += stepX;
        this.y += stepY;
        // Phase advance is tied to movement distance, so opacity cycles as circles move.
        this.opacityPhase += Math.hypot(stepX, stepY) * 0.22;

        // Bounce off walls
        if (this.x + this.baseRadius > width || this.x - this.baseRadius < 0) {
          this.baseDx = -this.baseDx;
        }

        if (this.y + this.baseRadius > height || this.y - this.baseRadius < 0) {
          this.baseDy = -this.baseDy;
        }

        this.draw(mouseX, mouseY, time);
      }
    }

    let animationFrameId: number;
    let circles: Circle[] = [];

    const resizeCanvas = (): void => {
      const dpi = window.devicePixelRatio || 1;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      canvas.width = width * dpi;
      canvas.height = height * dpi;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpi, dpi);
    };

    const init = (): void => {
      circles = [];
      for (let i = 0; i < circleCount; i++) {
        const radius = Math.random() * 2 + minRadius;
        const x = Math.random() * (window.innerWidth - radius * 2) + radius;
        const y = Math.random() * (window.innerHeight - radius * 2) + radius;
        circles.push(new Circle(x, y, radius, ctx));
      }
    };

    const animate = (): void => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      const width = window.innerWidth;
      const height = window.innerHeight;
      const time = performance.now() * 0.001;

      const { x: mouseX, y: mouseY } = mouseRef.current;

      for (let i = 0; i < circles.length; i++) {
        circles[i].update(width, height, mouseX, mouseY, time);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left
      mouseRef.current.y = event.clientY - rect.top
    };

    const handleMouseLeave = (): void => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    const handleResize = (): void => {
      resizeCanvas();
      init();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    resizeCanvas();
    init();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    circleCount,
    speedFactor,
    minRadius,
    maxRadius,
    focusRadius,
    glowIntensity,
    maxOpacity,
    minOpacity,
    intensityPower,
    color1,
    color2,
    color3,
    color4,
    backgroundColor
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        backgroundColor: backgroundColor,
      }}
    />
  );
};

export default FireflyEffect;
