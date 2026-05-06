import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  public isLoading = signal(false);

  public showLoader() {
    this.isLoading.set(true);
  }

  public hideLoader() {
    this.isLoading.set(false);
  }

}
