"use client";
import { useEffect, useRef } from "react";

interface MoveListProps {
  moves: string[];
}

export default function MoveList({ moves }: MoveListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [moves]);

  const pairs: [string, string?][] = [];
  for (let i = 0; i < moves.length; i += 2) {
    pairs.push([moves[i], moves[i + 1]]);
  }

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded p-2 h-64 overflow-y-auto text-sm font-mono">
      {pairs.length === 0 && (
        <p className="text-zinc-500 text-xs">No moves yet</p>
      )}
      {pairs.map(([w, b], i) => (
        <div key={i} className="flex gap-2 py-0.5">
          <span className="text-zinc-500 w-6">{i + 1}.</span>
          <span className="text-white w-16">{w}</span>
          <span className="text-zinc-400 w-16">{b ?? ""}</span>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}