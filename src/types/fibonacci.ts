export type LoopType = 'for' | 'while' | 'do-while' | 'bigint';

export interface FibonacciStep {
  stepIndex: number; // 1, 2, 3...
  prev1: bigint; // F_{n-2}
  prev2: bigint; // F_{n-1}
  result: bigint; // F_n
  ratio: number | null; // result / prev2
  ratioDiff: number | null; // |ratio - PHI|
}

export interface FibonacciResult {
  n: number;
  sequence: bigint[];
  steps: FibonacciStep[];
  goldenRatio: number;
}

export interface TraceFrame {
  line: number;
  iteration: number;
  variables: {
    n: number;
    i?: number;
    a: string;
    b: string;
    next?: string;
  };
  outputLine?: string;
  explanation: string;
}
