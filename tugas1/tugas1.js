function array(a, m, k) {
    let angka = 0;
  
    for (let i = 0; i < a.length - m + 1; i++) {
      const subArray = a.slice(i, i + m);
      let pasangan = false;
      for (let j = 0; j < subArray.length; j++) {
        for (let l = j + 1; l < subArray.length; l++) {
          if (subArray[j] + subArray[l] === k) {
            pasangan = true;
            break;
          }
        }
        if (pasangan) break;
      }
  
      if (pasangan) {
        angka++;
      }
    }
  
    return angka;
  }
  
  const a1 = [2, 4, 7, 5, 3, 5, 8, 5, 1, 7];
  const m1 = 4;
  const k1 = 10;
  console.log(array(a1, m1, k1));
  
  const a2 = [15, 8, 8, 2, 6, 4, 1, 7];
  const m2 = 2;
  const k2 = 8;
  console.log(array(a2, m2, k2));
  