"use client";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <section id="home" className="relative h-[90vh] w-full flex flex-col justify-center items-center overflow-hidden">
      <Particles
        id="droplets"
        init={particlesInit}
        options={{
          background: { color: "#0a0f0f" },
          fpsLimit: 60,
          particles: {
            number: { value: 80 },
            color: { value: ["#00f5ff", "#00ff95"] },
            shape: { type: "circle" },
            opacity: { value: 0.6 },
            size: { value: { min: 1, max: 3 } },
            move: {
              enable: true,
              speed: 0.6,
              direction: "bottom",
              outModes: { default: "out" },
              gravity: { enable: true, acceleration: 0.6 }
            }
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 80, duration: 0.3 } }
          }
        }}
        className="absolute inset-0"
      />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center text-5xl md:text-6xl font-extrabold text-hackerBlue drop-shadow-glow"
      >
        Another Level Cleaning Services
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 2.5 }}
        className="text-center text-lg md:text-xl text-hackerGreen mt-4"
      >
        Jonesboro, Arkansas • Serving all of Northeast Arkansas
      </motion.p>
      <div className="mt-8 flex gap-4">
        <a href="#services" className="btn btn-primary">Our Services</a>
        <a href="/estimator" className="btn btn-outline">AI Estimator</a>
      </div>
    </section>
  );
}
