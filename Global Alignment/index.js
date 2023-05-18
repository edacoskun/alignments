// GLOBAL ALIGNMENT
// İki diziyi, eşleşme-yanlış eşleşme ve boşluğa göre global hizalama
const globalAlignment = (sequence1, sequence2, match, mismatch, gap) => {
  let length1 = sequence1.length;
  let length2 = sequence2.length;
  let score = 0;

  let table_cell = [];
  for (let i = 0; i <= length2; i++) {
    let arr = [];
    for (let j = 0; j <= length1; j++) {
      arr.push(0);
    }
    table_cell.push(arr);
  }
  for (let i = 0; i < length2 + 1; i++) {
    table_cell[i][0] = -i;
  }
  for (let j = 0; j < length1 + 1; j++) {
    table_cell[0][j] = -j;
  }
  for (let i = 1; i < length2 + 1; i++) {
    for (let j = 1; j < length1 + 1; j++) {
      if (sequence1[j - 1] == sequence2[i - 1]) {
        score = match;
      } else {
        score = mismatch;
      }
      table_cell[i][j] = Math.max(
        table_cell[i - 1][j] - 1,
        table_cell[i][j - 1] - 1,
        table_cell[i - 1][j - 1] + score
      );
    }
  }

  let sequence1_GA = "";
  let sequence2_GA = "";
  let GAMatch = "";
  let i = length2;
  let j = length1;
  // En yüksek skora sahip yolu takip ederek hizalamayı oluşturma
  while (i > 0 && j > 0) {
    let up = table_cell[i - 1][j] - 1;
    let left = table_cell[i][j - 1] - 1;
    if (sequence1[j - 1] === "-" || sequence2[i - 1] === "-") {
      score = gap;
    } else if (sequence1[j - 1] != sequence2[i - 1]) {
      score = mismatch;
    } else {
      score = match;
    } 
    let diagonal = table_cell[i - 1][j - 1] + score;
    if (table_cell[i][j] == diagonal) {
      sequence1_GA += sequence1[j - 1];
      sequence2_GA += sequence2[i - 1];
      if (score == 1) {
        GAMatch += "|";
      } else {
        GAMatch += " ";
      }
      i -= 1;
      j -= 1;
    } else if (table_cell[i][j] == up) {
      sequence1_GA += "-";
      GAMatch += " ";
      sequence2_GA += sequence2[i - 1];
      i -= 1;
    } else if (table_cell[i][j] == left) {
      sequence1_GA += sequence1[j - 1];
      sequence2_GA += "-";
      GAMatch += " ";
      j -= 1;
    } 
  }
  while (i > 0) {
    sequence1_GA += "-";
    sequence2_GA += sequence2[i - 1];
    GAMatch += " ";
    i -= 1;
  }
  while (j > 0) {
    sequence1_GA += sequence1[j - 1];
    sequence2_GA += "-";
    GAMatch += " ";
    j -= 1;
  }

  sequence1_GA = reverseString(sequence1_GA);
  GAMatch = reverseString(GAMatch);
  sequence2_GA = reverseString(sequence2_GA);
  console.log(sequence1_GA);
  console.log(GAMatch);
  console.log(sequence2_GA);

  console.log("  Score=" + table_cell[length2][length1]);
};

function reverseString(str) {
  var splitString = str.split("");
  var reverseArray = splitString.reverse();
  var joinArray = reverseArray.join("");
  return joinArray;
}

// match:1 mismatch:-1 gap:-1
// GATTACA
// GCATGCU
// örnek dizilim icin global hizalama
globalAlignment("GATTACA", "GCATGCU", 1, -1, -1);
