"use client";
import { useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import Board from "@/components/Board";
import Sidebar from "@/components/Sidebar";
import { getRandomFen } from "@/lib/fens";
import { getBestMove, resetWorker } from "@/lib/stockfish";

type Status = "playing" | "checkmate" | "stalemate" | "draw" | "resigned" | "timeout";

export default function HomePage() {
  const [fen, setFen] = useState("");
  const [moves, setMoves] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("playing");
  const [engineThinking, setEngineThinking] = useState(false);
  const [depth, setDepth] = useState(8);
  const [timerReset, setTimerReset] = useState(false);
  const [turn, setTurn] = useState<"w" | "b">("w");
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | undefined>();
  const statusRef = useRef(status);
  statusRef.current = status;

  useEffect(() => {
    setFen(getRandomFen());
  }, []);

  function runEngine(currentFen: string) {
    setEngineThinking(true);
    getBestMove(currentFen, depth)
      .then((bestMove) => {
        if (!bestMove || bestMove === "(none)") {
          setStatus("draw");
          return;
        }
        const g = new Chess(currentFen);
        const from = bestMove.slice(0, 2);
        const to = bestMove.slice(2, 4);
        const move = g.move({ from, to, promotion: "q" });
        if (!move) return;
        setFen(g.fen());
        setTurn("w");
        setLastMove({ from, to });
        setMoves((prev) => [...prev, move.san]);
        if (g.isCheckmate()) setStatus("checkmate");
        else if (g.isStalemate()) setStatus("stalemate");
        else if (g.isDraw()) setStatus("draw");
      })
      .catch((err) => console.error("Engine error", err))
      .finally(() => setEngineThinking(false));
  }

  function onDrop(source: string, target: string): boolean {
    if (statusRef.current !== "playing" || engineThinking || turn !== "w") return false;
    try {
      const g = new Chess(fen);
      const move = g.move({ from: source, to: target, promotion: "q" });
      if (!move) return false;
      setFen(g.fen());
      setTurn("b");
      setLastMove({ from: source, to: target });
      setMoves((prev) => [...prev, move.san]);
      if (g.isCheckmate()) { setStatus("checkmate"); return true; }
      if (g.isStalemate()) { setStatus("stalemate"); return true; }
      if (g.isDraw()) { setStatus("draw"); return true; }
      runEngine(g.fen());
      return true;
    } catch {
      return false;
    }
  }

  function handleRestart() {
    resetWorker();
    const newFen = getRandomFen();
    setFen(newFen);
    setMoves([]);
    setStatus("playing");
    setEngineThinking(false);
    setTurn("w");
    setLastMove(undefined);
    setTimerReset((r) => !r);
  }

  const isPlayerTurn = !engineThinking && status === "playing" && turn === "w";
  const gameOver = status !== "playing";

  const statusMessage: Record<Status, string> = {
    playing: engineThinking ? "Engine thinking…" : "Your move",
    checkmate: turn === "b" ? "Checkmate — you won!" : "Checkmate — you lost!",
    stalemate: "Stalemate — draw!",
    draw: "Draw!",
    resigned: "You resigned.",
    timeout: "Time's up — you lost!",
  };

  if (!fen) return <div className="min-h-screen bg-slate-800" />;

  return (
    <div className="min-h-screen bg-slate-800 text-white flex flex-col">
      <header className="border-b border-slate-600 bg-slate-900 px-6 py-4 flex items-baseline gap-3">
        <h1 className="text-2xl font-black tracking-tight text-white">TRUE CHESS</h1>
        <span className="text-slate-400 text-sm italic">"No openings. No excuses."</span>
      </header>
      <div className={`text-center py-2 text-sm font-medium ${gameOver ? "bg-slate-700 text-yellow-400" : "bg-slate-900 text-slate-400"}`}>
        {statusMessage[status]}
      </div>
      <main className="flex flex-1 items-start justify-center gap-8 p-6">
        <Board fen={fen} onDrop={onDrop} disabled={!isPlayerTurn} lastMove={lastMove} />
        <Sidebar
          moves={moves}
          depth={depth}
          onDepthChange={setDepth}
          onRestart={handleRestart}
          onResign={() => setStatus("resigned")}
          gameOver={gameOver}
          isPlayerTurn={isPlayerTurn}
          timerReset={timerReset}
          onTimerExpire={() => setStatus("timeout")}
        />
      </main>
    </div>
  );
}