function mix(s1, s2) {
  const count_letters = s => {
    const letters = [...s.match(/[a-z]/g)];

    let counter = new Map();

    letters.forEach(letter => {
      counter.set(letter[0], (counter.has(letter[0]) ? counter.get(letter[0])+1 : 1));
    });
    
    return counter;
  }
  
  let c1 = count_letters(s1);
  let c2 = count_letters(s2);
  
  let letters = new Set(Array.from(c1.keys()).concat(Array.from(c2.keys())));
  
  let counter = new Map();

  letters.forEach(letter => {
    let n1 = c1.has(letter) ? c1.get(letter) : 0;
    let n2 = c2.has(letter) ? c2.get(letter) : 0;
    
    let max = Math.max(n1, n2);
    
    if (max>1) {
      if (n1 > n2) counter.set(letter.repeat(max), 1);
      else if (n2 > n1) counter.set(letter.repeat(max), 2);
      else counter.set(letter.repeat(max), 3);
    }
  });
  
  return [...counter.entries()].sort((a, b) => {
    let a1 = a[0].length;
    let b1 = b[0].length;
    if (a1>b1) return -1;
    if (b1>a1) return 1;
    if (a[1] > b[1]) return 1;
    if (a[1] < b[1]) return -1;
    if (a[0][0] > b[0][0]) return 1;
    if (a[0][0] < b[0][0]) return -1;
    return 0;
  }).map(v => `${(v[1] === 3) ? '=' : v[1].toString()}:${v[0]}`).join('/');
}
