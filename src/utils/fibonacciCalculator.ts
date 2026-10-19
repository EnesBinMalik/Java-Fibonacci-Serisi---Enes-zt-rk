import { FibonacciResult, FibonacciStep, TraceFrame, LoopType } from '../types/fibonacci';

export const GOLDEN_RATIO = 1.618033988749895;

/**
 * Calculates Fibonacci sequence up to count elements.
 * Starts with 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 ...
 */
export function calculateFibonacci(count: number): FibonacciResult {
  if (count <= 0) {
    return {
      n: 0,
      sequence: [],
      steps: [],
      goldenRatio: GOLDEN_RATIO,
    };
  }

  if (count === 1) {
    return {
      n: 1,
      sequence: [0n],
      steps: [],
      goldenRatio: GOLDEN_RATIO,
    };
  }

  const sequence: bigint[] = [0n, 1n];
  const steps: FibonacciStep[] = [];

  let a = 0n;
  let b = 1n;

  // For count elements, we need count elements in the sequence.
  // Note: if count is 10, elements are 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 (10 numbers)
  // Step 1: 0 + 1 = 1
  // Step 2: 1 + 1 = 2
  // ...
  for (let i = 2; i < count; i++) {
    const next = a + b;
    sequence.push(next);

    const prev2Num = Number(b);
    const nextNum = Number(next);
    const ratio = prev2Num > 0 ? nextNum / prev2Num : null;
    const ratioDiff = ratio !== null ? Math.abs(ratio - GOLDEN_RATIO) : null;

    steps.push({
      stepIndex: i - 1, // 1-indexed steps: 1, 2, 3...
      prev1: a,
      prev2: b,
      result: next,
      ratio,
      ratioDiff,
    });

    a = b;
    b = next;
  }

  return {
    n: count,
    sequence,
    steps,
    goldenRatio: GOLDEN_RATIO,
  };
}

/**
 * Generate simulated execution trace frames for Java debugger simulator
 */
export function generateJavaTrace(count: number, loopType: LoopType): TraceFrame[] {
  const frames: TraceFrame[] = [];

  if (count < 1) return frames;

  // Setup initial frame
  frames.push({
    line: 7,
    iteration: 0,
    variables: { n: count, a: '0', b: '1' },
    outputLine: `Fibonacci serisinin eleman sayısını giriniz: ${count}`,
    explanation: `Kullanıcıdan eleman sayısı alındı: n = ${count}`,
  });

  if (count === 1) {
    frames.push({
      line: 10,
      iteration: 1,
      variables: { n: count, a: '0', b: '1' },
      outputLine: '0',
      explanation: 'Sadece 1 eleman istendiği için ilk terim (0) ekrana yazdırıldı.',
    });
    return frames;
  }

  // Print first two elements
  frames.push({
    line: 12,
    iteration: 0,
    variables: { n: count, a: '0', b: '1' },
    outputLine: `${count} Elemanlı Fibonacci Serisi:\n0 1`,
    explanation: `İlk iki terim yazdırıldı: a = 0, b = 1`,
  });

  let a = 0n;
  let b = 1n;

  if (loopType === 'for') {
    // For loop simulation
    for (let i = 2; i < count; i++) {
      const next = a + b;
      // Start of iteration: line 15 (for header)
      frames.push({
        line: 15,
        iteration: i - 1,
        variables: { n: count, i, a: a.toString(), b: b.toString() },
        explanation: `Döngü adımı i = ${i} (< ${count}) kontrol edildi ve geçerli.`,
      });

      // Sum calculation: line 16
      frames.push({
        line: 16,
        iteration: i - 1,
        variables: { n: count, i, a: a.toString(), b: b.toString(), next: next.toString() },
        explanation: `Yeni terim hesaplandı: next = ${a} + ${b} = ${next}`,
      });

      // Print: line 17
      frames.push({
        line: 17,
        iteration: i - 1,
        variables: { n: count, i, a: a.toString(), b: b.toString(), next: next.toString() },
        outputLine: ` ${next}`,
        explanation: `${next} ekrana yazdırıldı. Adım ${i - 1}: ${a} + ${b} = ${next}`,
      });

      // Update variables: line 18 & 19
      a = b;
      b = next;
      frames.push({
        line: 19,
        iteration: i - 1,
        variables: { n: count, i, a: a.toString(), b: b.toString() },
        explanation: `Değişkenler kaydırıldı: a yeni değeri ${a}, b yeni değeri ${b}`,
      });
    }
  } else if (loopType === 'while') {
    let i = 2;
    while (i < count) {
      const next = a + b;
      frames.push({
        line: 15,
        iteration: i - 1,
        variables: { n: count, i, a: a.toString(), b: b.toString() },
        explanation: `while koşulu (i < ${count}) sağlandı: i = ${i}`,
      });

      frames.push({
        line: 16,
        iteration: i - 1,
        variables: { n: count, i, a: a.toString(), b: b.toString(), next: next.toString() },
        explanation: `next = ${a} + ${b} = ${next}`,
      });

      frames.push({
        line: 17,
        iteration: i - 1,
        variables: { n: count, i, a: a.toString(), b: b.toString(), next: next.toString() },
        outputLine: ` ${next}`,
        explanation: `${next} yazdırıldı.`,
      });

      a = b;
      b = next;
      i++;
      frames.push({
        line: 20,
        iteration: i - 2,
        variables: { n: count, i, a: a.toString(), b: b.toString() },
        explanation: `a = ${a}, b = ${b}, i 1 artırılarak ${i} yapıldı.`,
      });
    }
  } else {
    // do-while
    let i = 2;
    do {
      if (i >= count) break;
      const next = a + b;
      frames.push({
        line: 16,
        iteration: i - 1,
        variables: { n: count, i, a: a.toString(), b: b.toString(), next: next.toString() },
        explanation: `do bloğu içinde hesaplama: next = ${a} + ${b} = ${next}`,
      });

      frames.push({
        line: 17,
        iteration: i - 1,
        variables: { n: count, i, a: a.toString(), b: b.toString(), next: next.toString() },
        outputLine: ` ${next}`,
        explanation: `${next} yazdırıldı.`,
      });

      a = b;
      b = next;
      i++;
      frames.push({
        line: 21,
        iteration: i - 2,
        variables: { n: count, i, a: a.toString(), b: b.toString() },
        explanation: `Döngü sonu koşulu kontrol edildi: while(i < ${count}) -> i = ${i}`,
      });
    } while (i < count);
  }

  // Completion frame
  frames.push({
    line: 23,
    iteration: count - 1,
    variables: { n: count, a: a.toString(), b: b.toString() },
    outputLine: '\n\nİşlem başarıyla tamamlandı. (Geliştirici: Enes Öztürk)',
    explanation: 'Döngü sona erdi. Tüm Fibonacci sayıları ekrana yazdırıldı!',
  });

  return frames;
}

/**
 * Formats large bigints for display (e.g. with grouping separators)
 */
export function formatBigInt(val: bigint): string {
  const str = val.toString();
  if (str.length <= 15) {
    return Number(val).toLocaleString('tr-TR');
  }
  // For huge numbers, group in chunks of 3 from the right
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
