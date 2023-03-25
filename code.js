//this script are goint to receive a line of players with 5 cards of poker and it will return the winner, with the method
// -----------------------read input-------------------------------
function readCard(card) {
  return {
    value: readCardvalue(card[0]),
    suit: card[1],
  };
}

function readCardvalue(value) {
  switch (value) {
    case "T":
      return 10;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    case "A":
      return 14;
    default:
      return Number.parseInt(value);
  }
}

function readHand(hand) {
  return hand.split(" ").map(readCard);
}

function readPlayer(player) {
  player = player.split(": ");
  return {
    name: player[0].trim(),
    hand: readHand(player[1].trim()),
  };
}

function readGame(game) {
  return (game = game.split("  ").map(readPlayer));
}

// ----------------------------- verifying what game the player have--------------------------
//helper functions
function handUtil(hand) {
  let utilHand = { suits: {}, values: {} };
  for (let card of hand) {
    utilHand.values.hasOwnProperty(card.value)
      ? utilHand.values[card.value]++
      : (utilHand.values[card.value] = 1);
    utilHand.suits.hasOwnProperty(card.suit)
      ? utilHand.suits[card.suit]++
      : (utilHand.suits[card.suit] = 1);
  }
  return utilHand;
}

function listSort(list) {
  return list.sort((a, b) => a - b);
}
function handValuesSort(hand) {
  return listSort(hand.map((x) => x.value));
}

function minMaxValues(hand) {
  let values = handValuesSort(hand);
  return { min: values[0], max: values.pop() };
}

function consecutiveSum(min, max, length) {
  let consecutivesum = Math.floor((length * (min + max)) / 2);
  if (consecutivesum == Math.floor((length * (min * 2 + length - 1)) / 2))
    return true;
  return false;
}

function isInObject(object, value) {
  return Object.values(object).indexOf(value);
}

function isFlush(utilhand) {
  return Object.keys(utilhand.suits).length == 1;
}

function isStraight(hand) {
  let handEdges = minMaxValues(hand);
  if (consecutiveSum(handEdges.min, handEdges.max, hand.length)) return true;
  return false;
}

function isTwoPairs(utilhand) {
  return (
    Object.keys(utilhand.values).length == 3 &&
    isInObject(utilhand.values, 2) != -1
  );
}
function isThree(utilhand) {
  return (
    Object.keys(utilhand.values).length == 3 &&
    isInObject(utilhand.values, 3) != -1
  );
}
function isFullHouse(utilhand) {
  return (
    Object.keys(utilhand.values).length == 2 &&
    isInObject(utilhand.values, 3) != -1
  );
}
function isFour(utilhand) {
  return (
    Object.keys(utilhand.values).length == 2 &&
    isInObject(utilhand.values, 4) != -1
  );
}
function isPair(utilhand) {
  return (
    Object.keys(utilhand.values).length == 4 &&
    isInObject(utilhand.values, 2) != -1
  );
}
//--------------------- Process best game for a player-------------------------
function whatIHave(player) {
  //saco el mejor juego que tengo
  let utilhand = handUtil(player.hand);
  let hand = player.hand;
  if (isStraight(hand) && isFlush(utilhand)) return "straight flush";
  if (isFour(utilhand)) return "four of a kind";
  if (isFullHouse(utilhand)) return "full house";
  if (isFlush(utilhand)) return "flush";
  if (isStraight(hand)) return "straight";
  if (isThree(utilhand)) return "three of a kind";
  if (isTwoPairs(utilhand)) return "two pairs";
  if (isPair(utilhand)) return "pair";
  return "high card";
}
function getKeyByValue(object, value) {
  return Object.keys(object)
    .filter((key) => object[key] == value)
    .map((x) => Number.parseInt(x));
}
function removeSubarray(arr, subarr) {
  return arr.filter(function (item) {
    return subarr.indexOf(item) === -1;
  });
}
function rankN_Kind(hand, n_kind) {
  return getKeyByValue(handUtil(hand).values, n_kind);
}

function rankPairs(hand) {
  let trueRank = handValuesSort(hand);
  let pairRank = listSort(getKeyByValue(handUtil(hand).values, 2));
  return removeSubarray(trueRank, pairRank).concat(pairRank);
}
function getRank(method, hand) {
  // rankea mi mejor juego
  let rank;
  switch (method) {
    case "high card":
    case "flush":
      return handValuesSort(hand);

    case "straight flush":
    case "straight":
      return [handValuesSort(hand).pop()];

    case "pair":
    case "two pairs":
      return rankPairs(hand);

    case "three of a kind":
    case "full house":
      return rankN_Kind(hand, 3);

    case "four of a kind":
      return rankN_Kind(hand, 4);
  }
}
function bestGame(player) {
  let method = whatIHave(player);
  return {
    method: method,
    rank: getRank(method, player.hand),
  };
}
//---------------select who won-------------------------
function playersGameSort(playerlist) {
  playerlist.forEach((player) => {
    player["win"] = bestGame(player);
  });
  return playerlist.sort((player1, player2) => winComparison(player1, player2));
}
function selectWinner(playerlist) {
  playerlist = playersGameSort(playerlist);
  if (isTie(playerlist)) return null;
  return playerlist.pop();
}
function winComparison(player1, player2) {
  let comparisson = compareWinByMethod(player1, player2);
  if (comparisson == 0) {
    comparisson = compareWinByRank(player1, player2);
  }
  return comparisson;
}
function compareWinByMethod(player1, player2) {
  return (
    tableOfMethods(player1.win.method) - tableOfMethods(player2.win.method)
  );
}
function compareWinByRank(player1, player2) {
  let rank1 = player1.win.rank;
  let rank2 = player2.win.rank;
  for (let i = rank1.length - 1; i > -1; i--) {
    if (rank1[i] - rank2[i] != 0) {
      return rank1[i] - rank2[i];
    }
  }
  return 0;
}
function tableOfMethods(method) {
  switch (method) {
    case "high card":
      return 1;
    case "pair":
      return 2;
    case "two pairs":
      return 3;
    case "three of a kind":
      return 4;
    case "straight":
      return 5;
    case "flush":
      return 6;
    case "full house":
      return 7;
    case "four of a kind":
      return 8;
    case "straight flush":
      return 9;
  }
}
function isTie(sortedPlayerlist) {
  let bestplayer1 = sortedPlayerlist[sortedPlayerlist.length - 1];
  let bestplayer2 = sortedPlayerlist[sortedPlayerlist.length - 2];
  return winComparison(bestplayer1, bestplayer2) == 0;
}
//----------Main Game-------------------
function Game(input) {
  game = readGame(input);
  // la casa
  game.forEach((player) => {
    player[win] = bestGame(player);
  });
  console.log(parseResult(selectWinner(game)));
}
//--------------put results--------------------
function parseCardValue(cardValue) {
  switch (cardValue) {
    case 10:
      return Ten;
    case 11:
      return Jack;
    case 12:
      return Queen;
    case 13:
      return King;
    case 14:
      return Ace;
    default:
      return String(cardValue);
  }
}
function parseRankResult(win) {
  switch (win.method) {
    case "two pairs":
    case "three of a kind":
    case "full house":
    case "four of a kind":
      return parseCardValue(win.rank.pop()) + " over " + parseCardValue(win.rank.pop());
    default:
      return parseCardValue(win.rank.pop());
  }
}
function parseResult(winner) {
  if (winner == null) {
    return "Tie."
  }
  let prompt =
    winner.name +
    " wins. - with " +
    winner.win.method +
    ": " +
    parseRankResult(winner.win);
  return prompt;
}

export {
  readCard,
  readCardvalue,
  readHand,
  readPlayer,
  readGame,
  isFlush,
  isStraight,
  minMaxValues,
  handUtil,
  isPair,
  isFullHouse,
  isFour,
  isTwoPairs,
  whatIHave,
  isThree,
  getRank,
  bestGame,
  selectWinner,
  parseRankResult,
  Game,
  parseResult,
};

//think into the desition
// think 'bout the response
