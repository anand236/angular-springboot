import { Component, inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderService } from '../../../core/services/loader-service';


@Component({
  selector: 'app-loader-component',
  imports: [ProgressSpinnerModule],
  templateUrl: './loader-component.html',
  styleUrl: './loader-component.scss',
})
export class LoaderComponent {

  public loaderService = inject(LoaderService);


}
