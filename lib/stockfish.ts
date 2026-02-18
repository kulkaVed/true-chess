export function resetWorker(): void {}

export function getBestMove(fen: string, depth: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const w = new Worker("/stockfish.js");
    let responded = false;

    const timeout = setTimeout(() => {
      if (!responded) {
        responded = true;
        w.terminate();
        reject(new Error("Stockfish timeout"));
      }
    }, 30000);

    w.addEventListener("message", (e: MessageEvent) => {
      const msg: string = typeof e.data === "string" ? e.data : JSON.stringify(e.data);
      console.log("SF:", msg);

      if (msg.includes("uciok")) {
        w.postMessage("ucinewgame");
        w.postMessage(`position fen ${fen}`);
        w.postMessage(`go depth ${depth}`);
      }
      if (msg.includes("bestmove")) {
        if (!responded) {
          responded = true;
          clearTimeout(timeout);
          const parts = msg.split(" ");
          const bmIndex = parts.indexOf("bestmove");
          const move = parts[bmIndex + 1];
          w.terminate();
          resolve(move);
        }
      }
    });

    w.postMessage("uci");
  });
}