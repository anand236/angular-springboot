import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { HeaderComponent } from '../shared/components/header-component/header-component';

@Component({
  selector: 'app-dashboard',
  imports: [CardModule, RouterModule, HeaderComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
