import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cards',
  imports: [CardModule, CommonModule, RouterLink],
  templateUrl: './cards.html',
  styleUrl: './cards.scss',
})
export class Cards {

  cardsItems = signal([
    {
      route: 'student',
      operation: 'Crud Operation'
    }
  ])

}
