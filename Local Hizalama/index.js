// LOCAL ALIGNMENT
// İki diziyi, eşleşme, yanlış eşleşme ve açıklık(gap) puanlarını alarak
// en optimize edilmiş dizi hizalamasını hesaplama
const localAlignment = (sequence1, sequence2, match, mismatch, gap) => {
  let matrix = [];
  for (let i = 0; i <= sequence1.length; i++) {
    matrix[i] = [];
    for (let j = 0; j <= sequence2.length; j++) {
      matrix[i][j] = 0;
    }
  } 

  // en yüksek skor
  let maxScore = 0;
  let maxI = 0;
  let maxJ = 0;
  // matrix'in doldurulması
  for (let i = 1; i <= sequence1.length; i++) {
    for (let j = 1; j <= sequence2.length; j++) {
      let diagonal =
        matrix[i - 1][j - 1] +
        (sequence1[i - 1] === sequence2[j - 1] ? match : mismatch);
      let up = matrix[i - 1][j] + gap;
      let left = matrix[i][j - 1] + gap;
      // yeni skorun hesaplanması
      matrix[i][j] = Math.max(0, diagonal, up, left); 
      // en yüksek skorun belirlenmesi
      if (matrix[i][j] > maxScore) {
        maxScore = matrix[i][j];
        maxI = i;
        maxJ = j;
      }
    }
  }

  let alignedSequence1 = "";
  let alignedSequence2 = "";
  let i = maxI;
  let j = maxJ;
  while (matrix[i][j] !== 0) {
    if (matrix[i][j] === matrix[i - 1][j] + gap) {
      alignedSequence1 = sequence1[i - 1] + alignedSequence1;
      alignedSequence2 = "-" + alignedSequence2;
      i--;
    } else if (matrix[i][j] === matrix[i][j - 1] + gap) {
      alignedSequence1 = "-" + alignedSequence1;
      alignedSequence2 = sequence2[j - 1] + alignedSequence2;
      j--;
    } else {
      alignedSequence1 = sequence1[i - 1] + alignedSequence1;
      alignedSequence2 = sequence2[j - 1] + alignedSequence2;
      i--;
      j--;
    }
  }
  // hizalama puanı 
  // ve biçimlendirilmiş hizalama dizelerini gösterme
  var separator = "";
  for (var k = 0; k < alignedSequence1.length; k++) {
    separator +=
      alignedSequence1.charAt(k) == "-" || alignedSequence2.charAt(k) == "-" ? " " : "|";
  }
  console.log(alignedSequence1 + "\n" + separator + "\n" + alignedSequence2);
  console.log("   Score=" + maxScore);
}

// match:4 mismatch:-2 gap:-1
// KVLEFGY
// EQLLKALEFKL
// dizilimi icin local hizalama
localAlignment("KVLEFGY", "EQLLKALEFKL", 4, -2, -1);

