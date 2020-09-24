import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() firstPlayer: string;
  @Input() secondPlayer: string;
  @Input() singlePlayer: boolean = true;
  winner: string = null;
  isXTurn: boolean = true;
  squares: any[];
  isDraw: boolean = false;

  //kalkuloj piket e secilit lojtar
  nrWonPlayerX: number = null;
  nrWonPlayerO: number = null;

  //
  lastRoundMoves: any[] = new Array(9).fill(null);
  movieGameMap = [[]];

  isLastMoveOfHistory: boolean = false;




  possibleWins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  constructor() { }

  ngOnInit(): void {
    this.nrWonPlayerX = 0;
    this.nrWonPlayerO = 0;
    this.newGame();

  }

  get player() {// marr emrin e lojtarit sipas kesaj logjike: lojtariX eshte gjithmone firstPlayer, lojtari O eshte secondPlayer, marr emrin e lojtarit
    let result: string = null;
    if (this.isXTurn) {
      result = this.firstPlayer;
    } else {
      result = this.secondPlayer;
    }
    return result;
  }

  newGame() {//inicializoj nje loje te re
    this.winner = null;
    this.isXTurn = true;
    this.squares = new Array(9).fill(null);// ben 9 kuti bosh
    this.isDraw = false;

    this.lastRoundMoves = new Array(9).fill(null);
    this.movieGameMap = new Array(new Array(9).fill('_')).fill(null);
    this.isLastMoveOfHistory = false;

  }

  makeMove(index: number) {
    if (!this.squares[index]) {//kontrolloj nese butoni  eshte i mbushur X/O nk mund ta mbishkruaj(nk mund te bej asnje levizje per kete buton)

      this.addMoveInGameHstoryMap(index, this.isXTurn ? 'X' : 'O');// mbaj historine e levizjes perpara se te ndryshoj rradhen e lojtarit
      //********SINGLE**** */
      if (this.singlePlayer) {//Logjika per singleplayer
        this.isXTurn = true;  //Gjithmone e ka radhen lojtari 
        this.squares.splice(index, 1, 'X'); // gjen objektin me index qe na ka ardhur nga user dhe e valorizon me x
        this.winner = this.controlWinner();// kontrollojme nese kemi fitues


        this.isDraw = this.contolAllSquareAreFilled();// kontrollojme nqs kemi akoma kuti bosh

        if (this.winner === null && !this.isDraw) {//nqs nk kemi asnje fitues dhe nqs kemi te pakten nje kuti bosh atehere komp mund te beje nje levzje
          const indexCmp = this.makeComputerMove();// make move cmp
          this.addMoveInGameHstoryMap(indexCmp, 'O');// mbaj historine e komjuterit
          this.winner = this.controlWinner();// kontrollo  nqs kemi fitues

        }//*****MULTI***** */
      } else {// nq nk eshte single player
        this.squares.splice(index, 1, this.isXTurn ? 'X' : 'O');// i japim vlere butonit sipas index qe na ka ardhur nga lojtari qe ka radhen
        this.isXTurn = !this.isXTurn;//pas cdo levizje ndryshoj radhen e lojtarit
        this.winner = this.controlWinner();//kontrollo nqs kemi fitues


      }
    }
//******* KONTROLLOJ PER FITUES***** */
    if (this.winner !== null) {// nqs kemi nje fitues 
      if (this.winner === 'X') {//marr emrin e fituesit
        this.winner = this.firstPlayer;
        this.nrWonPlayerX = this.nrWonPlayerX + 1;// shtoj me 1 kur fiton lojtari x
      } else if (this.winner === 'O') {// nqs winner eshte O
        this.winner = this.secondPlayer;
        this.nrWonPlayerO = this.nrWonPlayerO + 1; // shto me 1 nr e fitoreve
      }
    } else {// nqs nk kam fitues kontrolloj nqs ka akoma kuti bosh
      this.isDraw = this.contolAllSquareAreFilled();

    }

   console.log("this.isLastMoveOfHistory:", this.isLastMoveOfHistory);

  }


  controlWinner(): string {
    let result: string = null;
    for (let i = 0; i < this.possibleWins.length; i++) {// iteroj mundesite e fitimit
      const [a, b, c] = this.possibleWins[i];// mbaj ne 3 kostantet index e cdo mundesie
      if (this.squares[a]                     // nqs square me index a ka nje vlere dhe 
        && this.squares[a] === this.squares[b]// vlera e square[a] eshte e njejte me b dhe c
        && this.squares[a] === this.squares[c]) {
        result = this.squares[a];//
      }
    }
    return result;
  }


  makeComputerMove(): number {
    let isMoved = false;
    while (!isMoved) {// nqs comp mk ka zgjedhur asnje kuti 
      let possibleComputerIndex: number = Math.floor(Math.random() * 9);// marr nje nr random deri tek 8
      if (this.squares[possibleComputerIndex] === null) {//i jap vlere index te kutise nqs nk ka akoma nje vlere
        this.squares[possibleComputerIndex] = 'O';// i jap vleren O kutise me index random
        isMoved = true;// comp ben levizjen dhe nk bejm(property) BoardComponent.nrWonPlayerX: numbere me asnje kontroll
        return possibleComputerIndex;
        //break;//dal nga kontrolli
      }
    }
  }


  contolAllSquareAreFilled() {// kontrolloj nqs te gjitha kutite kane vlera
    if (this.winner === null && this.squares.every(square => {
      return (
        square === 'X' || square === 'O'
      );
    })) {
      return true;
    }
  }

  addMoveInGameHstoryMap(index: number, player: string) {

    let newArrayMovie = new Array(9).fill(null);// deklaroj tabeln qe do me mbaje levizet me te fundit

    

     for (let i = 0; i < this.lastRoundMoves.length; i++) {
       newArrayMovie[i] = this.lastRoundMoves[i];// marr te gjitha levizjet qe kane ndodhur
 }

    
    for(let j=0; j < newArrayMovie.length; j++){
      if(j === index){
        newArrayMovie[j] = player;
      }else if(newArrayMovie[j] === null){
        newArrayMovie[j]="_ "
      }
    }
    this.movieGameMap.push(newArrayMovie);// e shtoj te gjithe tabelen ne historik

    this.lastRoundMoves = newArrayMovie;// e mbaj si historik te levizjeve te fundit
  }

  onHistoryItemClick(item: any){
    const newSquare: any =item;

    if(this.movieGameMap[this.movieGameMap.length -1] === item){// nqs historiku i klikuar eshte i fundit qe ka ndodhur 

      for (let i = 0; i < item.length; i++) {
        const element = item[i];
        if(element === "_ "){// i bej null elementet me vlere "_ " ne menyre qe te mund te vazhdoj levizjen
          newSquare[i] = null;
        }
        
      }

    }

    this.squares = newSquare;
  }

}
