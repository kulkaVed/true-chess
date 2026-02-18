"use client";
import { Chessboard } from "react-chessboard";

interface BoardProps {
  fen: string;
  onDrop: (sourceSquare: string, targetSquare: string) => boolean;
  disabled: boolean;
  lastMove?: { from: string; to: string };
}

export default function Board({ fen, onDrop, disabled, lastMove }: BoardProps) {
  const highlightStyles: Record<string, React.CSSProperties> = {};
  if (lastMove) {
    highlightStyles[lastMove.from] = { backgroundColor: "rgba(99, 102, 241, 0.4)" };
    highlightStyles[lastMove.to] = { backgroundColor: "rgba(99, 102, 241, 0.6)" };
  }

  return (
    <div className="w-full max-w-[680px]">
      <Chessboard
        position={fen}
        onPieceDrop={onDrop}
        arePiecesDraggable={!disabled}
        boardOrientation="white"
        customSquareStyles={highlightStyles}
        customBoardStyle={{
          borderRadius: "6px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
        customDarkSquareStyle={{ backgroundColor: "#4a5568" }}
        customLightSquareStyle={{ backgroundColor: "#e2e8f0" }}
      />
    </div>
  );
}