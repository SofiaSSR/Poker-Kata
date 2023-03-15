// read input
function readCard(card){
return {
    value: readCardvalue(card[0]),
    suit: card[1],
}
}
function readPlayer(){

}
function readCardvalue(value){
    switch(value){
        case "T": return 10;
        case "J": return 11;
        case "Q": return 12;
        case "K": return 13;
        case "A": return 14;
        default: return Number.parseInt(value);
    }
    }

function readHand(hand){
return hand.split(" ").map(readCard)    
}
function readPlayer(player){
 player = player.split(": ")
     return {
        name: player[0].trim(),
        hand: readHand(player[1].trim()),
     }
    }
function readGame(game){
    return game = game.split("  ").map(readPlayer)
    }
// ----------------------------- verifying what game the player have--------------------------
function handUtil(hand){
    let utilHand = {suits:{}, values:{} }
    for(let card of hand){
        utilHand.values.hasOwnProperty(card.value)? utilHand.values[card.value]++: utilHand.values[card.value]=1
        utilHand.suits.hasOwnProperty(card.suit)? utilHand.suits[card.suit]++: utilHand.suits[card.suit]=1
    }
   return utilHand
}
function isFlush(utilhand){
    
    return Object.keys(utilhand.suits).length == 1
};
function isStraight(hand){
    let handEdges=  edgesValues(hand);
    if(consecutiveSum(handEdges.min,handEdges.max,hand.length)) return true
    return false
  }
function easySort(list){
 return list.sort((a,b)=> a-b);
}
function handValuesSort(hand){
   return easySort(hand.map(x => x.value));
}
function edgesValues(hand){
    let values =handValuesSort(hand);
    return {min:values[0],max:values.pop()}
}
function consecutiveSum(min,max,length){
    let consecutivesum = Math.floor(length*(min+max)/2);
    if( consecutivesum == Math.floor(length*(min*2+length-1)/2)) return true;
    return false
}
function isTwoPairs(utilhand){
 return Object.keys(utilhand.values).length == 3 && isInObject(utilhand.values,2)!= -1
}
function isThree(utilhand){
    return Object.keys(utilhand.values).length == 3 && isInObject(utilhand.values,3)!= -1
   }
function isInObject(objeto,value){
 return Object.values(objeto).indexOf(value)
}
function isFullHouse(utilhand){
    return Object.keys(utilhand.values).length == 2 && isInObject(utilhand.values,3)!= -1
}
function isFour(utilhand){
    return Object.keys(utilhand.values).length == 2 && isInObject(utilhand.values,4)!= -1
}
function isPair(utilhand){
return Object.keys(utilhand.values).length == 4 && isInObject(utilhand.values,2)!= -1
}
//--------------------- Process best game for a player-------------------------
function whatIHave(player){
    //saco el mejor juego que tengo
    let utilhand = handUtil(player.hand);
    let hand = player.hand;
    if (isStraight(hand) && isFlush(utilhand)) return "straight flush";
    if (isFour(utilhand))  return "four of a kind";
    if (isFullHouse(utilhand))  return "full house";
    if (isFlush(utilhand))  return "flush";
    if (isStraight(hand)) return "straight";
    if (isThree(utilhand)) return "three of a kind";
    if (isTwoPairs(utilhand)) return "two pairs";
    if (isPair(utilhand)) return "pair";
    return "high card" ;
}
function getKeyByValue(object, value) {
    return Object.keys(object).filter(key => object[key] == value).map(x => Number.parseInt(x));
  }
function removeSubarray(arr,subarr){
    return arr.filter(function(item) {
        return subarr.indexOf(item) === -1;
    });
}
function rankN_Kind(hand,n_kind){
    return getKeyByValue(handUtil(hand).values,n_kind)}


function rankPairs(hand){
    let trueRank = handValuesSort(hand);
    let pairRank = easySort(getKeyByValue(handUtil(hand).values,2));
    return removeSubarray(trueRank,pairRank).concat(pairRank)
}
function getRank(method,hand){
    // rankea mi mejor juego
    let rank;
    switch(method){
        case "high card":
        case "flush":
        rank = handValuesSort(hand);
        break;
        case "straight flush":
        case "straight":
        rank = [handValuesSort(hand).pop()];
        break;
        case "pair":
        case "two pairs":
        rank = rankPairs(hand);
        break;
        case "three of a kind":
        case "full house":
        rank = rankN_Kind(hand,3);
        break;
        case "four of a kind":
        rank = rankN_Kind(hand,4);
        break;
    }
    return rank
} 
function bestGame(player){
    let method= whatIHave(player);
return{
    method:method,
    rank:getRank(method,player.hand),
}
}
//---------------who won-------------------------
function selectWinner(playerlist){
    playerlist.forEach(player => {
        player["win"]= bestGame(player);
    });
    let comparisson = compareWinMethod(playerlist[0],playerlist[1]) ;
    if(comparisson<0) return playerlist[1];
    if(comparisson>0) return playerlist[0];
    if(comparisson==0){
        return compareWinRank(playerlist[0],playerlist[1]);
    }
    return "Tie."
}

function compareWinMethod(player1,player2){
    return tableOfMethods(player1.win.method) - tableOfMethods(player2.win.method);
}
function compareWinRank(player1,player2){
    let rank1= player1.win.rank;
    let rank2 = player2.win.rank; 
    for(let i=(rank1.length-1);i>-1;i--){
        if(rank1[i]>rank2[i]) {return player1; break;}
        if(rank1[i]<rank2[i]) {return player2; break;}
    }
    return "Tie."
}
function tableOfMethods(method){
    switch(method){
        case "high card": return 1;
        case "pair": return 2;
        case "two pairs": return 3 ;
        case "three of a kind": return 4 ;
        case "straight": return 5;
        case "flush": return 6;
        case "full house" : return 7 ;
        case "four of a kind": return 8 ;
        case "straight flush": return 9;
    }
}
//----------Main Game-------------------
function Game(input){
game = readGame(input);
    // la casa
game.forEach(player => {
    player[win]= bestGame(player);
});
 parceResult(selectWinner(game));
}
//--------------put results--------------------
function parseCard(card){
    switch(card.value){
        case 10: return Ten;
        case 11: return Jack;
        case 12: return Queen;
        case 13: return King;
        case 14: return Ace ;
        default: return String(value);
    }
}
function parceMethodResult(method){
    switch(method){
    case "high card":
        case "flush":
        rank = handValuesSort(hand);
        break;
        case "straight flush":
        case "straight":
        rank = [handValuesSort(hand).pop()];
        break;
        case "pair":
        case "two pairs":
        rank = rankPairs(hand);
        break;
        case "three of a kind":
        case "full house":
        rank = rankN_Kind(hand,3);
        break;
        case "four of a kind":
        rank = rankN_Kind(hand,4);
        break;
}
}
function parceResult(gameResult){
if(gameResult.length!= 1){ console.log("Tie."); return}
winner = gameResult.pop()
console.log(winner.name," wins. - with",winner.win.method,": ",parceMethodResult(winner.win))
return
}

export { readCard,readCardvalue,readHand,readPlayer,readGame,isFlush,isStraight,edgesValues,handUtil,isPair,isFullHouse,isFour,isTwoPairs,whatIHave, isThree,getRank,bestGame,selectWinner}

//think into the desition
// think 'bout the response