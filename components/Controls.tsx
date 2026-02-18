"use client";

const LEVELS = [
  { label: "Level 1 (~400)", depth: 1 },
  { label: "Level 2 (~600)", depth: 2 },
  { label: "Level 3 (~800)", depth: 3 },
  { label: "Level 4 (~1000)", depth: 4 },
  { label: "Level 5 (~1200)", depth: 5 },
  { label: "Level 6 (~1400)", depth: 6 },
  { label: "Level 7 (~1600)", depth: 7 },
  { label: "Level 8 (~1800)", depth: 8 },
  { label: "Level 9 (~2000)", depth: 10 },
  { label: "Level 10 (~2200+)", depth: 13 },
];

interface ControlsProps {
  depth: number;
  onDepthChange: (d: number) => void;
  onRestart: () => void;
  onResign: () => void;
  gameOver: boolean;
}

export default function Controls({
  depth,
  onDepthChange,
  onRestart,
  onResign,
  gameOver,
}: ControlsProps) {
  const currentLevel = LEVELS.findIndex((l) => l.depth === depth) ?? 7;
  const levelIndex = currentLevel === -1 ? 7 : currentLevel;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-slate-400 text-xs uppercase tracking-widest mb-2 block">
          Engine Strength
        </label>
        <div className="text-white font-bold text-sm mb-2">
          {LEVELS[levelIndex].label}
        </div>
        <input
          type="range"
          min={0}
          max={9}
          value={levelIndex}
          onChange={(e) => onDepthChange(LEVELS[Number(e.target.value)].depth)}
          className="w-full accent-indigo-500"
        />
        <div className="flex justify-between text-slate-500 text-xs mt-0.5">
          <span>Beginner</span><span>Master</span>
        </div>
      </div>
      <button
        onClick={onRestart}
        className="w-full py-2 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-500 transition"
      >
        ↺ New Game
      </button>
      <button
        onClick={onResign}
        disabled={gameOver}
        className="w-full py-2 border border-slate-500 text-slate-300 rounded hover:border-red-500 hover:text-red-400 transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ⚑ Resign
      </button>
    </div>
  );
}