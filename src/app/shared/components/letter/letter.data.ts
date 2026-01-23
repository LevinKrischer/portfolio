export interface LetterVariant {
  src: string;
  width: number;
}
export interface LetterConfig {
  upper: LetterVariant;
  lower: LetterVariant;
}

export const LETTERS: Record<string, LetterConfig> = {
  F: {
    upper: { src: 'assets/letters/Letter-F.svg', width: 77 },
    lower: { src: 'assets/letters/Letter-f-small.svg', width: 52 }
  },
  r: {
    upper: { src: 'assets/letters/Letter-R.svg', width: 87 },
    lower: { src: 'assets/letters/Letter-r-small.svg', width: 57 }
  },
  o: {
    upper: { src: 'assets/letters/Letter-O.svg', width: 91 },
    lower: { src: 'assets/letters/Letter-o-small.svg', width: 78 }
  },
  n: {
    upper: { src: 'assets/letters/Letter-N.svg', width: 100 },
    lower: { src: 'assets/letters/Letter-n-small.svg', width: 75 }
  },
  t: {
    upper: { src: 'assets/letters/Letter-T.svg', width: 74 },
    lower: { src: 'assets/letters/Letter-t-small.svg', width: 56 }
  },
  e: {
    upper: { src: 'assets/letters/Letter-E.svg', width: 80 },
    lower: { src: 'assets/letters/Letter-e-small.svg', width: 75 }
  },
  d: {
    upper: { src: 'assets/letters/Letter-D.svg', width: 90 },
    lower: { src: 'assets/letters/Letter-d-small.svg', width: 76 }
  },
  v: {
    upper: { src: 'assets/letters/Letter-V.svg', width: 98 },
    lower: { src: 'assets/letters/Letter-v-small.svg', width: 74 }
  },
  D: {
    upper: { src: 'assets/letters/Letter-D.svg', width: 89 },
    lower: { src: 'assets/letters/Letter-d-small.svg', width: 76 }
  },
  E: {
    upper: { src: 'assets/letters/Letter-E.svg', width: 80 },
    lower: { src: 'assets/letters/Letter-e-small.svg', width: 75 }
  },
  V: {
    upper: { src: 'assets/letters/Letter-V.svg', width: 98 },
    lower: { src: 'assets/letters/Letter-v-small.svg', width: 74 }
  },
  L: {
    upper: { src: 'assets/letters/Letter-L.svg', width: 68.5 },
    lower: { src: 'assets/letters/Letter-l-small.svg', width: 30 }
  },
  O: {
    upper: { src: 'assets/letters/Letter-O.svg', width: 91 },
    lower: { src: 'assets/letters/Letter-o-small.svg', width: 78 }
  },
  P: {
    upper: { src: 'assets/letters/Letter-P.svg', width: 84 },
    lower: { src: 'assets/letters/Letter-p-small.svg', width: 82 }
  },
  R: {
    upper: { src: 'assets/letters/Letter-R.svg', width: 89 },
    lower: { src: 'assets/letters/Letter-r-small.svg', width: 56 }
  }
};
