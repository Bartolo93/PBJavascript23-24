function findHeavyBall(balls) {
  if (balls.length === 1) {
    return 0;
  }

  const divideBalls = Math.floor(balls.length / 2);
  const part1 = balls.slice(0, divideBalls);
  const part2 = balls.slice(divideBalls);

  const weight1 = getTotalWeight(part1);
  const weight2 = getTotalWeight(part2);

  if (weight1 === weight2) {
    console.log(" Nie ma cięzkiej kuli !");
    return -1;
  } else if (weight1 > weight2) {
    return findHeavyBall(part1);
  } else {
    const heavyBallIndexPart2 = findHeavyBall(part2);
    if (heavyBallIndexPart2 === -1) {
      return -1;
    } else {
      return heavyBallIndexPart2 + divideBalls; //dodajemy divideBalls , aby znależć właściwy indeks cięzkiej kuli
    }
  }
}
function getTotalWeight(balls) {
  return balls.reduce((total, ball) => total + ball, 0);
}

// Przykładowe użycie
const balls = [1, 1, 1, 1, 2, 1, 1, 1];
const heavyBallIndex = findHeavyBall(balls);
console.log("Indeks ciężkiej kuli:", heavyBallIndex);
