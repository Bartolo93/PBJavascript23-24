function solveSudoku(board) {
  const maximum = 9;

  function isValidNumber(row, col, num) {
    for (let i = 0; i < maximum; i++) {
      // Sprawdzanie wiersza i kolumny
      if (board[row][i] === num || board[i][col] === num) {
        return false;
      }
      // Sprawdzanie małego kwadratu

      const subSquareRow = Math.floor(row / 3);
      const subSquarecol = Math.floor(col / 3);

      const isInSubSquare =
        board[subSquareRow * 3 + Math.floor(i / 3)][
          subSquarecol * 3 + (i % 3)
        ] === num;

      if (isInSubSquare) {
        return false;
      }
    }
    return true;
  }

  // Funkcja znajdująca  puste komórki w planszy
  function findEmptyField() {
    for (let row = 0; row < maximum; row++) {
      for (let col = 0; col < maximum; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
  }

  // Funkcja rekurencyjna rozwiązująca Sudoku
  function solve() {
    const emptyField = findEmptyField();

    if (!emptyField) {
      return true;
    }

    const [row, col] = emptyField;

    // Próba wstawienia liczb od 1 do 9
    for (let num = 1; num <= maximum; num++) {
      if (isValidNumber(row, col, num)) {
        // Jeśli liczba jest możliwa, wstawiamy ją do komórki
        board[row][col] = num;

        // Rekurencyjne wywołanie funkcji solve
        if (solve()) {
          return true;
        }
        // Jeśli rozwiązanie nie jest możliwe zostawiamy 0
        board[row][col] = 0;
      }
    }
    return false;
  }

  solve();
}

const exampleBoard = [
  [7, 0, 4, 8, 0, 0, 3, 0, 1],
  [8, 2, 0, 5, 0, 0, 0, 4, 0],
  [0, 0, 9, 4, 3, 0, 5, 0, 0],
  [3, 1, 0, 0, 0, 0, 8, 0, 7],
  [0, 8, 0, 0, 0, 3, 0, 1, 0],
  [9, 0, 7, 0, 0, 0, 0, 3, 2],
  [0, 0, 6, 0, 1, 5, 4, 0, 0],
  [0, 7, 0, 0, 0, 9, 0, 6, 5],
  [5, 0, 8, 0, 0, 2, 1, 0, 3],
];

solveSudoku(exampleBoard);

// Wyświetlenie rozwiązania Sudoku
exampleBoard.forEach((row) => {
  console.log(row);
});

// Wyświetlanie za pomocą operatora spread -> trochę ładniej wyglada w konsoli :).
// Pytanie , dlaczego przy użyciu spread nie wyswietla się to jednym ciągiem , tylko wciąż zapamiętuje układ tablicy dwuwymiarowej
exampleBoard.forEach((row) => {
  console.log(...row);
});
