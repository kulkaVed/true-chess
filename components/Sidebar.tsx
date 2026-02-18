"use client";
import MoveList from "./MoveList";
import Controls from "./Controls";
import Timer from "./Timer";

interface SidebarProps {
  moves: string[];
  depth: number;
  onDepthChange: (d: number) => void;
  onRestart: () => void;
  onResign: () => void;
  gameOver: boolean;
  isPlayerTurn: boolean;
  timerReset: boolean;
  onTimerExpire: () => void;
}

export default function Sidebar(props: SidebarProps) {
  const {
    moves, depth, onDepthChange, onRestart, onResign,
    gameOver, isPlayerTurn, timerReset, onTimerExpire,
  } = props;

  return (
    <aside className="w-72 flex flex-col gap-6 pt-2">
      <div>
        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Your Time</p>
        <Timer running={isPlayerTurn && !gameOver} onExpire={onTimerExpire} reset={timerReset} />
      </div>
      <div>
        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Moves</p>
        <MoveList moves={moves} />
      </div>
      <Controls
        depth={depth}
        onDepthChange={onDepthChange}
        onRestart={onRestart}
        onResign={onResign}
        gameOver={gameOver}
      />
    </aside>
  );
}