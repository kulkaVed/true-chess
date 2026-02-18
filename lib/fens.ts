export const MIDDLEGAME_FENS: string[] = [
  "r1bq1rk1/pp2ppbp/2np1np1/3p4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 1",
  "r2q1rk1/ppp1bppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 1",
  "r1bqk2r/ppp2ppp/2np1n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQR1K1 w kq - 0 1",
  "r2qr1k1/ppp2ppp/2n2n2/3p4/3P4/2PB1N2/PP3PPP/R1BQR1K1 w - - 0 1",
  "r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bBPP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 1",
  "r2q1rk1/pp1bppbp/2np1np1/8/2BNP3/2N1BP2/PPP3PP/R2Q1RK1 w - - 0 1",
  "r1bqr1k1/pp1n1ppp/2pb1n2/3pp3/3PP3/2PB1NN1/PP3PPP/R1BQR1K1 w - - 0 1",
  "r1b2rk1/ppq1bppp/2np1n2/4p3/2B1P3/2NP1N2/PPP1QPPP/R1B2RK1 w - - 0 1",
  "r1bq1rk1/1pp1ppbp/p1np1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1",
  "r2qr1k1/1pp1bppp/p1np1n2/4p3/PPB1P3/2NP1N2/2P2PPP/R1BQR1K1 w - - 0 1",
  "rn1q1rk1/pb2ppbp/1p1p1np1/2p5/2PPP3/2N2NB1/PP2BPPP/R2Q1RK1 w - - 0 1",
  "r1bqr1k1/2p1bppp/p1np1n2/1p2p3/3PP3/1BN2N2/PPP1BPPP/R2QR1K1 w - - 0 1",
  "r2q1rk1/pp2bppp/2p2n2/3pn3/3P4/2NB1N2/PPP2PPP/R2QR1K1 w - - 0 1",
  "r2qkb1r/ppp1pppp/2n2n2/3p4/3P4/2N1PN2/PPP2PPP/R1BQKB1R w KQkq - 0 1",
  "r1bqr1k1/pp2ppbp/2np1np1/3p4/3PP3/2N1BN2/PPP1BPPP/R2Q1RK1 w - - 0 1",
  "r2q1rk1/ppp1bppp/2np1n2/4p3/4P3/2NP1N2/PPP1BPPP/R2Q1RK1 w - - 0 1",
  "r1bq1rk1/1pp1bppp/p1np4/4pp2/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 1",
  "rnbq1rk1/ppp1ppbp/3p1np1/8/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 1",
  "r1bq1rk1/pp3ppp/2npbn2/4p3/2BpP3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 1",
  "r1b2rk1/ppq1nppp/2n1p3/3pP3/3P4/2NB1N2/PPP2PPP/R1BQR1K1 w - - 0 1",
];

export function getRandomFen(): string {
  return MIDDLEGAME_FENS[Math.floor(Math.random() * MIDDLEGAME_FENS.length)];
}