"use client";

import { useParallax } from "react-scroll-parallax";

function ParallaxCircle({ speed, className }: { speed: number, className: string }) {
    const parallax = useParallax<HTMLDivElement>({
        speed,
    });

    return <div ref={parallax.ref} className={`absolute rounded-full opacity-20 ${className}`} />;
}

export function ParallaxBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <ParallaxCircle speed={-10} className="w-64 h-64 bg-primary top-20 left-10 blur-3xl" />
            <ParallaxCircle speed={15} className="w-96 h-96 bg-accent top-1/3 right-0 blur-3xl" />
            <ParallaxCircle speed={-5} className="w-48 h-48 bg-secondary bottom-1/4 left-1/4 blur-3xl" />
            <ParallaxCircle speed={20} className="w-72 h-72 bg-purple-600 bottom-0 right-10 blur-3xl" />
        </div>
    );
}
