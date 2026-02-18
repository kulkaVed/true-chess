"use client";
import { useEffect, useState, useRef } from "react";

interface TimerProps {
  running: boolean;
  onExpire: () => void;
  reset: boolean;
}

const INITIAL_SECONDS = 10 * 60;

export default function Timer({ running, onExpire, reset }: TimerProps) {
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);
  const expiredRef = useRef(false);

  useEffect(() => {
    setSeconds(INITIAL_SECONDS);
    expiredRef.current = false;
  }, [reset]);

  useEffect(() => {
    if (!running || expiredRef.current) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(id);
          expiredRef.current = true;
          onExpire();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, onExpire]);

  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  const urgent = seconds < 60;

  return (
    <div className={`text-2xl font-mono font-bold ${urgent ? "text-red-500" : "text-white"}`}>
      ⏱ {m}:{s}
    </div>
  );
}