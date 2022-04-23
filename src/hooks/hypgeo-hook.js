import { useEffect, useState } from 'react';

export const useHypGeo = (N, type, n, x) => {
  const [typeOdds, setTypeOdds] = useState(0);

  useEffect(() => {
    const choose = (n, x) => {
      let r = 1;
      for (let i = 1; i <= x; i++) {
        r = (r * (n - (x - i))) / i;
      }
      return r;
    };

    /*
     * N - library size
     * M - desired cards in library
     * n - number of cards to draw in one event
     * x - number of the desired cards in the draw event
     */

    const pmf = (N, type, n, x) => {
      return (choose(type, x) * choose(N - type, n - x)) / choose(N, n);
    };

    const ucdf = (N, type, n, x) => {
      let r = 0;
      for (let i = 0; i < x; i++) {
        r = r + pmf(N, type, n, i);
      }
      return (1 - r) * 100;
    };
    const numM = parseFloat(type);
    const numN = parseFloat(N);
    const numn = parseFloat(n);
    const numx = parseFloat(x);
    setTypeOdds(+ucdf(numN, numM, numn, numx).toFixed(2));
  }, [N, type, n, x]);

  return typeOdds;
};
