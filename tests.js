import { it, describe } from "mocha";
import { expect } from "chai";
import * as cd from "./code";

describe("poker test suit", () => {
    describe("read cardvalue", () => {
        it("2 test", () => {
                let number = cd.readCardvalue("2")
                expect(number).to.equal(2);
        });
        it("K test", () => {
                let suit = cd.readCardvalue("K")
                expect(suit).to.equal(13);
        });
        });
    describe("read card", () => {
	    it("2H test", () => {
            let card = "2H";
            expect(cd.readCard(card)).to.deep.equal({value:2,suit:"H"});
	    })
        it("8S test", () => {
            let card = "8S";
            expect(cd.readCard(card)).to.deep.equal({value:8,suit:"S"});
        });
        });
    describe("read hand", () => {
        it("fist hand test", () => {
                let handInput = "2H 3D 5S 9C KD";
                expect(cd.readHand(handInput)).to.deep.equal([
                    {value:2,suit:"H"},
                    {value:3,suit:"D"},
                    {value:5,suit:"S"},
                    {value:9,suit:"C"},
                    {value:13,suit:"D"}]);
        });
        });
    describe("read player", () => {
        it("player1 test", () => {
                let player = "White: 2H 3D 5S 9C KD";
                expect(cd.readPlayer(player)).to.deep.equal(
                    {name:"White",
                    hand:[{value:2,suit:"H"},{value:3,suit:"D"},{value:5,suit:"S"},{value:9,suit:"C"},{value:13,suit:"D"}]});
        });
        });
    describe("read game", () => {
        it("player1 test", () => {
                let gameInput = "White: 2H 3D 5S 9C KD  Black: 2C 3H 4S 8C AH";
                expect(cd.readGame(gameInput)).to.deep.equal(
                    [{name:"White",
                    hand:[{value:2,suit:"H"}, {value:3,suit:"D"}, {value:5,suit:"S"},{value:9,suit:"C"},{value:13,suit:"D"}]},
                    {name:"Black",
                    hand:[{value:2,suit:"C"},{value:3,suit:"H"},{value:4,suit:"S"},{value:8,suit:"C"},{value:14,suit:"H"}]}]);
        });
        });
    describe("str8 test", () => {
        it("not str8 test", () => {
                let handInput = "2H 3D 5S 9C KD";
                expect(cd.isStraight(cd.readHand(handInput))).to.equal(false);
        });
        it("str8 char num test", () => {
                let handInput = "8C 9C JC TC 7C";
                expect(cd.isStraight(cd.readHand(handInput))).to.equal(true);
        });
        it("str8 char test", () => {
                let handInput = "QC KC JC TC AC";
                expect(cd.isStraight(cd.readHand(handInput))).to.equal(true);
        });
        // it("str8 with A test", () => {
        //         let gameInput = "2C 3C 4C KC AC";
        //         expect(cd.isStraight(cd.readHand(gameInput))).to.equal(true);
        // });
        });
        describe("sort test", ()=>{
            it("num+letra test", () => {
                let handInput = "8C 9C JC TC 7C";
                expect(cd.minMaxValues(cd.readHand(handInput))).to.deep.equal({min:7, max:11});
            });
        });
        describe("utilhand test", ()=>{
            it("utilhand test", () => {
                let handInput = "8C 9C JC TC 7C";
                expect(cd.handUtil(cd.readHand(handInput))).to.deep.equal({suits: {C:5},values:{8:1,9:1,11:1,10:1,7:1}});
            });
            it("utilhand mix", () => {
            let handInput = "9D 9C JC TC 7H";
            expect(cd.handUtil(cd.readHand(handInput))).to.deep.equal({suits: {C:3,D:1,H:1},values:{9:2,11:1,10:1,7:1}});
            });
        });
        describe("flush test", ()=>{
            it("is flush ", () => {
                let handInput = "8C 9C JC TC 7C";
                expect(cd.isFlush(cd.handUtil(cd.readHand(handInput)))).to.equal(true);
            });
            it("not flush char", () => {
                let handInput = "8C 9C JH TC 7C";
                expect(cd.isFlush(cd.handUtil(cd.readHand(handInput)))).to.equal(false);
            });
            it("not flush number", () => {
                let handInput = "8C 9C 5C TC 7C";
                expect(cd.isFlush(cd.handUtil(cd.readHand(handInput)))).to.equal(true);
            });
            });
        describe("pair test", ()=>{
            it("is pair char", () => {
                let handInput = "8C 9C JC TC TH";
                expect(cd.isPair(cd.handUtil(cd.readHand(handInput)))).to.equal(true);
            });
            it("not pair", () => {
                let handInput = "8C 9C JC TC AH";
                expect(cd.isPair(cd.handUtil(cd.readHand(handInput)))).to.equal(false);
            });
            it("is pair", () => {
                    let handInput = "8C 9C JC TC 8H";
                    expect(cd.isPair(cd.handUtil(cd.readHand(handInput)))).to.equal(true);
            });
        }); 
        describe("two pair test", ()=>{
            it("is 2pair char", () => {
                let handInput = "8C JC JC TC TH";
                expect(cd.isTwoPairs(cd.handUtil(cd.readHand(handInput)))).to.equal(true);
            });
            it("not two pair", () => {
                let handInput = "JH JD JC TC AH";
                expect(cd.isTwoPairs(cd.handUtil(cd.readHand(handInput)))).to.equal(false);
            });
            it("is 2pair number", () => {
                    let handInput = "2C 2C 8C TC 8H";
                    expect(cd.isTwoPairs(cd.handUtil(cd.readHand(handInput)))).to.equal(true);
            });
        });
        describe("Full test", ()=>{
            it("is full char", () => {
                let handInput = "AC JC JC JC AH";
                expect(cd.isFullHouse(cd.handUtil(cd.readHand(handInput)))).to.equal(true);
            });
            it("not full", () => {
                let handInput = "JH JD JC TC JH";
                expect(cd.isFullHouse(cd.handUtil(cd.readHand(handInput)))).to.equal(false);
            });
            it("is full number", () => {
                    let handInput = "2C 2C 8C 8C 8H";
                    expect(cd.isFullHouse(cd.handUtil(cd.readHand(handInput)))).to.equal(true);
            });
        });
        describe("four  test", ()=>{
            it("is four char", () => {
                let handInput = "JC JC JC TC JH";
                expect(cd.isFour(cd.handUtil(cd.readHand(handInput)))).to.equal(true);
            });
            it("not four", () => {
                let handInput = "JH JD JC TC TH";
                expect(cd.isFour(cd.handUtil(cd.readHand(handInput)))).to.equal(false);
            });
            it("is four number", () => {
                    let handInput = "2C 2C 2C 2C 8H";
                    expect(cd.isFour(cd.handUtil(cd.readHand(handInput)))).to.equal(true);
            });
        });
        describe("Three  test", ()=>{
            it("is Three char", () => {
                let handInput = "JC 7C JC TC JH";
                expect(cd.isThree(cd.handUtil(cd.readHand(handInput)))).to.equal(true);
            });
            it("not Three", () => {
                let handInput = "JH 4D JC TC TH";
                expect(cd.isThree(cd.handUtil(cd.readHand(handInput)))).to.equal(false);
            });
            it("is Three but full ", () => {
                    let handInput = "2C 2C 2C 8C 8H";
                    expect(cd.isThree(cd.handUtil(cd.readHand(handInput)))).to.equal(false);
            });
        })
        describe("what player have  test", ()=>{
            it("have a four", () => {
                let playerObject = {name:"White",
                hand:[{value:2,suit:"H"}, {value:2,suit:"D"}, {value:2,suit:"S"},{value:2,suit:"C"},{value:13,suit:"D"}]};
                expect(cd.whatIHave(playerObject)).to.equal("four of a kind");
            });
            it("have a full", () => {
                let playerObject = {name:"White",
                hand:[{value:3,suit:"H"}, {value:3,suit:"D"}, {value:13,suit:"S"},{value:13,suit:"C"},{value:13,suit:"D"}]};
                expect(cd.whatIHave(playerObject)).to.equal("full house");
            });
            it("have a 2pairs", () => {
                let playerObject = {name:"White",
                hand:[{value:2,suit:"H"}, {value:2,suit:"D"}, {value:5,suit:"S"},{value:9,suit:"C"},{value:5,suit:"D"}]};
                expect(cd.whatIHave(playerObject)).to.equal("two pairs");
            });
            it("have a str flush", () => {
                let playerObject = {name:"White",
                hand:[{value:2,suit:"D"}, {value:3,suit:"D"}, {value:5,suit:"D"},{value:4,suit:"D"},{value:6,suit:"D"}]};
                expect(cd.whatIHave(playerObject)).to.equal("straight flush");
            });
            it("have nothing", () => {
                let playerObject = {name:"White",
                hand:[{value:2,suit:"H"}, {value:3,suit:"D"}, {value:5,suit:"D"},{value:10,suit:"D"},{value:6,suit:"D"}]};
                expect(cd.whatIHave(playerObject)).to.equal("high card");
            });
            }); 
            describe("rankeando ", ()=>{
                it("pair test", () => {
                    let winningHand = {method:"pair",
                    hand:[{value:2,suit:"H"}, {value:3,suit:"D"}, {value:5,suit:"D"},{value:10,suit:"D"},{value:2,suit:"D"}]};
                    expect(cd.getRank(winningHand.method,winningHand.hand)).to.deep.equal([3,5,10,2]);
                });
                it(" two pair test", () => {
                    let winningHand = {method:"two pairs",
                    hand:[{value:2,suit:"H"}, {value:3,suit:"D"}, {value:5,suit:"D"},{value:5,suit:"D"},{value:2,suit:"D"}]};
                    expect(cd.getRank(winningHand.method,winningHand.hand)).to.deep.equal([3,2,5]);
                });
                it("full test", () => {
                    let winningHand = {method:"full house",
                    hand:[{value:3,suit:"H"}, {value:3,suit:"D"}, {value:5,suit:"D"},{value:5,suit:"D"},{value:5,suit:"D"}]};
                    expect(cd.getRank(winningHand.method,winningHand.hand)).to.deep.equal([5]);
                });
                it("four test", () => {
                    let winningHand = {method:"four of a kind",
                    hand:[{value:5,suit:"H"}, {value:3,suit:"D"}, {value:5,suit:"D"},{value:5,suit:"D"},{value:5,suit:"D"}]};
                    expect(cd.getRank(winningHand.method,winningHand.hand)).to.deep.equal([5]);
                });
                it("high test", () => {
                    let winningHand = {method:"high card",
                    hand:[{value:2,suit:"H"}, {value:3,suit:"D"}, {value:5,suit:"D"},{value:10,suit:"D"},{value:11,suit:"D"}]};
                    expect(cd.getRank(winningHand.method,winningHand.hand)).to.deep.equal([2,3,5,10,11]);
                });
                it("three test", () => {
                    let winningHand = {method:"three of a kind",
                    hand:[{value:10,suit:"H"}, {value:3,suit:"D"}, {value:10,suit:"D"},{value:10,suit:"D"},{value:11,suit:"D"}]};
                    expect(cd.getRank(winningHand.method,winningHand.hand)).to.deep.equal([10]);
                });
                
            });
            describe("select winner test", ()=>{ 
            it("1st test", () => {
                    let gameInput = "Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH";
                    expect(cd.selectWinner(cd.readGame(gameInput))).to.deep.equal(
                        {name:"White",
                        hand:[{value:2,suit:"C"}, {value:3,suit:"H"}, {value:4,suit:"S"},{value:8,suit:"C"},{value:14,suit:"H"}],
                        win:{method:"high card",rank:[2,3,4,8,14]}},
                        );
            });
            it("tie pair test", () => {
                let gameInput = "Black: 2H 3D 5S 8C KD  White: 2C 3H 5S 8C KH";
                expect(cd.selectWinner(cd.readGame(gameInput))).to.equal(
                   null
                    );
                });
            it("tie pair test", () => {
                let gameInput = "Black: 9H 3S 4C 9D 5H  White: 9C 3S 5S 4D 9S";
                expect(cd.selectWinner(cd.readGame(gameInput))).to.equal(
                   null
                    );
                });
            it("tie full test", () => {
                let gameInput = "Black: 2H 4S 4C 2D 4H  White: 2C 2S 4S 4S 4S";
                expect(cd.selectWinner(cd.readGame(gameInput))).to.equal(null
                    );
                });
            it("full test", () => {
                let gameInput = "Black: 2H 4S 4C 2D 4H  White: 2C 8S AS QS 3S";
                expect(cd.selectWinner(cd.readGame(gameInput))).to.deep.equal(
                    {name:"Black",
                        hand:[{value:2,suit:"H"}, {value:4,suit:"S"},{value:4,suit:"C"},{value:2,suit:"D"},{value:4,suit:"H"},],
                        win:{method:"full house",rank:[4]},}
                    );
                });
            
            it("two pairs comparing rank test", () => {
                let gameInput = "Black: 2H 3S 4C 2D 4H  White: 2C 3S AS AD 3S";
                expect(cd.selectWinner(cd.readGame(gameInput))).to.deep.equal(
                    {name:"White",
                        hand:[{value:2,suit:"C"}, {value:3,suit:"S"},{value:14,suit:"S"},{value:14,suit:"D"},{value:3,suit:"S"},],
                        win:{method:"two pairs",rank:[2,3,14]},}
                    );
                });
            it("pair  test", () => {
                let gameInput = "Black: 9H 3S 4C 9D 5H  White: 2C 3S 5S AD 5S";
                expect(cd.selectWinner(cd.readGame(gameInput))).to.deep.equal(
                    {name:"Black",
                    hand:[{value:9,suit:"H"}, {value:3,suit:"S"},{value:4,suit:"C"},{value:9,suit:"D"},{value:5,suit:"H"},],
                    win:{method:"pair",rank:[3,4,5,9]},}
                    );   
                });
           
            it("pair2  test", () => {
                let gameInput = "Black: 9H 3S 4C 9D 5H  White: 2C 3S 5S AD 5S";
                expect(cd.selectWinner(cd.readGame(gameInput))).to.deep.equal(
                    {name:"Black",
                    hand:[{value:9,suit:"H"}, {value:3,suit:"S"},{value:4,suit:"C"},{value:9,suit:"D"},{value:5,suit:"H"},],
                    win:{method:"pair",rank:[3,4,5,9]},}
                    );   
                });
            });
        describe("Parsing winner test", ()=>{ 
            it("pair test", () => {
                    let gameInput = "Black: 9H 3S 4C 9D 5H  White: 2C 3S 5S AD 5S";
                    expect(cd.parseResult(cd.selectWinner(cd.readGame(gameInput)))).to.equal(
                        "Black wins. - with pair: 9"
                        );  
            });
            it("full test", () => {
                    let gameInput = "Black: 2H 4S 4C 2D 4H  White: 2C 8S AS QS 3S";
                    expect(cd.parseResult(cd.selectWinner(cd.readGame(gameInput)))).to.equal(
                        "Black wins. - with full house: 3"
                        );  
            });
            it("almost pair test", () => {
                    let gameInput = "Black: 9H 3S 4C 9D 5H  White: 2C 3S 9S AD 9S";
                    expect(cd.parseResult(cd.selectWinner(cd.readGame(gameInput)))).to.equal(
                        "White wins. - with pair: 9"
                        );  
            });
        });
           
});
