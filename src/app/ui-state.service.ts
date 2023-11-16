import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {
  private isHeaderFooterVisible = true;
  getHeaderFooterVisibility() {
    return this.isHeaderFooterVisible;
  }
  toggleHeaderFooterVisibility() {
    this.isHeaderFooterVisible = !this.isHeaderFooterVisible;
  }

  private isHeaderVisible = new BehaviorSubject<boolean>(true);
  headerVisible$ = this.isHeaderVisible.asObservable();
  toggleHeaderVisibility() {
    this.isHeaderVisible.next(!this.isHeaderVisible.value);
  }

}
