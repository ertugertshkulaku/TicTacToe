import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  firstPlayer: string;
  secondPlayer: string;
  singlePlayer: boolean = false;
  isStartingGame: boolean = false;
  isChoosedTypeOfGame: boolean =false;

  constructor() { }

  ngOnInit(): void {
    this.firstPlayer = null;// Inicializing the game 
    this.secondPlayer = null;
    this.isStartingGame = false;
    this.isChoosedTypeOfGame = false;
    
  }

  singlePlayerGame(){
    this.isStartingGame = false;
    this.singlePlayer = true;
    this.firstPlayer = null;
    this.secondPlayer = "Computer";
    this.isChoosedTypeOfGame = true;
  }
  multiPlayerGame(){
    this.isStartingGame = false;
    this.singlePlayer = false;
    this.firstPlayer = null;
    this.secondPlayer = null;
    this.isChoosedTypeOfGame = true;
  }
  startGame(){
    this.isStartingGame = true;

  }

}
