import { useEffect, useRef } from "react";

const FireflyEffect = ({
    circleCount = 1500,
    speedFactor = 0.8,
    minRadius = 1,
    maxRadius = 10,
    focusRadius = 150,
    glowIntensity = 15,
    maxOpacity = 0.9,
    minOpacity = 0.05,
    intensityPower = 2.5,
    backgroundColor = "#000000",
    color1 = "#fbf8cc",
    color2 = "#fdd835",
    color3 = "#fff176",
    color4 = "#ffeb3b",
}) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({
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
            x;
            y;
            baseRadius;
            baseDx;
            baseDy;
            ctx;
            color;
            noiseOffsetX;
            noiseOffsetY;
            randomFactor;

            constructor(
                x,
                y,
                radius,
                context
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
            }

            draw(mouseX, mouseY) {
                // Calculate mouse proximity boost (0 if no mouse, otherwise based on distance)
                let mouseBoost = 0;

                if (mouseX !== null && mouseY !== null) {
                    const dx = mouseX - this.x;
                    const dy = mouseY - this.y;
                    const distanceSquared = dx * dx + dy * dy;
                    const focusRadiusSquared = focusRadius * focusRadius;

                    if (distanceSquared < focusRadiusSquared * 1.5) {
                        const distance = Math.sqrt(distanceSquared);
                        const noiseOffset =
                            Math.sin(this.noiseOffsetX + this.noiseOffsetY) * 30 +
                            Math.cos(this.noiseOffsetX * 2 - this.noiseOffsetY * 1.5) * 25;
                        const adjustedDistance = distance + noiseOffset;

                        if (adjustedDistance < focusRadius) {
                            const proximity = 1 - adjustedDistance / focusRadius;
                            mouseBoost = Math.pow(proximity, intensityPower) * this.randomFactor;
                        }
                    }
                }

                // Always render at base level, with optional mouse boost
                const baseOpacity = 0.15;  // Always visible at this minimum
                const baseGlow = 3;        // Subtle base glow

                const renderRadius = this.baseRadius + (maxRadius * mouseBoost);
                const opacity = Math.min(maxOpacity, baseOpacity + (mouseBoost * 0.75));
                const glow = baseGlow + (glowIntensity * mouseBoost) + Math.random() * 5;

                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.shadowBlur = glow;
                this.ctx.shadowColor = this.color;
                this.ctx.globalAlpha = opacity;
                this.ctx.fillStyle = this.color;
                this.ctx.arc(this.x, this.y, renderRadius, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            }

            update(width, height, mouseX, mouseY) {
                this.x += this.baseDx * speedFactor;
                this.y += this.baseDy * speedFactor;

                // Bounce off walls
                if (this.x + this.baseRadius > width || this.x - this.baseRadius < 0) {
                    this.baseDx = -this.baseDx;
                }

                if (this.y + this.baseRadius > height || this.y - this.baseRadius < 0) {
                    this.baseDy = -this.baseDy;
                }

                this.draw(mouseX, mouseY);
            }
        }

        let animationFrameId;
        let circles = [];

        const resizeCanvas = () => {
            const dpi = window.devicePixelRatio || 1;
            const width = canvas.offsetWidth;
            const height = canvas.offsetHeight;

            canvas.width = width * dpi;
            canvas.height = height * dpi;

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.scale(dpi, dpi);
        };

        const init = () => {
            circles = [];
            for (let i = 0; i < circleCount; i++) {
                const radius = Math.random() * 2 + minRadius;
                const x = Math.random() * (window.innerWidth - radius * 2) + radius;
                const y = Math.random() * (window.innerHeight - radius * 2) + radius;
                circles.push(new Circle(x, y, radius, ctx));
            }
        };

        const animate = () => {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

            const width = window.innerWidth;
            const height = window.innerHeight;

            const { x: mouseX, y: mouseY } = mouseRef.current;

            for (let i = 0; i < circles.length; i++) {
                circles[i].update(width, height, mouseX, mouseY);
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = event.clientX - rect.left
            mouseRef.current.y = event.clientY - rect.top
        };

        const handleMouseLeave = () => {
            mouseRef.current.x = null;
            mouseRef.current.y = null;
        };

        const handleResize = () => {
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
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -10,
                backgroundColor: backgroundColor,
            }}
        />
    );
};

export default FireflyEffect;
