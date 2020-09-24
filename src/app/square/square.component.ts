import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent {

  @Input() square: 'X' | 'O';
  @Input() winner: string;
  @Input() isLastMoveOfHistory: boolean;


}
