const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const royalValues = ["10", "J", "Q", "K", "A"];

function generateRandomCard() {
  const randomSuit = suits[Math.floor(Math.random() * suits.length)];
  const randomValue = values[Math.floor(Math.random() * values.length)];

  return {
    suit: randomSuit,
    value: randomValue,
  };
}
function generateRandomPokerHand() {
  const hand = [];
  while (hand.length < 5) {
    const card = generateRandomCard();
    const isDuplicate = hand.some(
      (existingCard) =>
        existingCard.suit === card.suit && existingCard.value === card.value
    );

    if (!isDuplicate) {
      hand.push(card);
    }
  }
  return hand;
}

// zliczanie wartości kart w danej ręce
function countCardValues(hand) {
  const valueCounts = {};
  for (const card of hand) {
    valueCounts[card.value] = (valueCounts[card.value] ?? 0) + 1;
  }
  return valueCounts;
}

// sprawdzanie układów pokerowych w ręce
function hasPair(hand) {
  const cardValues = countCardValues(hand);
  return Object.values(cardValues).includes(2);
}

function hasTwoPairs(hand) {
  const cardValues = countCardValues(hand);
  const pairs = Object.values(cardValues).filter((count) => count === 2);
  return pairs.length === 2;
}

function hasThreeOfAKind(hand) {
  const cardValues = countCardValues(hand);
  return Object.values(cardValues).includes(3);
}

function hasFlush(hand) {
  const suits = hand.map((card) => card.suit);
  return new Set(suits).size === 1;
}

function hasStraight(hand) {
  const sortedValues = hand
    .map((card) => card.value)
    .sort((a, b) => values.indexOf(a) - values.indexOf(b));
  const uniqueValues = new Set(sortedValues);
  const isConsecutive = Array.from(uniqueValues).every(
    (value, index) =>
      index === 0 ||
      values.indexOf(value) === values.indexOf(sortedValues[index - 1]) + 1
  );
  return isConsecutive;
}

function hasFullHouse(hand) {
  return hasThreeOfAKind(hand) && hasPair(hand);
}

function hasFourOfAKind(hand) {
  const cardValues = countCardValues(hand);
  return Object.values(cardValues).includes(4);
}

function hasStraightFlush(hand) {
  return hasFlush(hand) && hasStraight(hand);
}

function hasRoyalFlush(hand) {
  return (
    hasStraightFlush(hand) &&
    hand.every((card) => royalValues.includes(card.value))
  );
}

function checkPokerHandRank(hand) {
  if (hasRoyalFlush(hand)) {
    return "Poker królewski !!!";
  } else if (hasStraightFlush(hand)) {
    return "Poker w kolorze ! ";
  } else if (hasFourOfAKind(hand)) {
    return "Kareta";
  } else if (hasFullHouse(hand)) {
    return "Full";
  } else if (hasFlush(hand)) {
    return "Kolor";
  } else if (hasStraight(hand)) {
    return "Strit";
  } else if (hasThreeOfAKind(hand)) {
    return "Trójka";
  } else if (hasTwoPairs(hand)) {
    return "Dwie pary";
  } else if (hasPair(hand)) {
    return "Para";
  } else {
    return "Najwyższa karta";
  }
}

// Testowanie
const pokerHand = generateRandomPokerHand();
console.log("Twoja ręka:", pokerHand);
const pokerHand1 = generateRandomPokerHand();
console.log("Twoja ręka:", pokerHand1);

const pokerHandRank = checkPokerHandRank(pokerHand);
console.log("Najlepszy układ pokerowy:", pokerHandRank);

const pokerHandRank1 = checkPokerHandRank(pokerHand1);
console.log("Najlepszy układ pokerowy:", pokerHandRank1);
