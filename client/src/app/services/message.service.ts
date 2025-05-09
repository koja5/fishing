import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  public configValue = new Subject<any>();
  public refreshAfterRemoveFile = new Subject<any>();
  public year = new Subject<number>();
  public refreshObservationSheet = new Subject<any>();

  constructor() {}

  sendConfigValueEmit(value: any) {
    this.configValue.next(value);
  }

  getConfigValueEmit(): Observable<any> {
    return this.configValue.asObservable();
  }

  sendRefreshGrid(value?: any) {
    this.refreshAfterRemoveFile.next(value);
  }

  getRefreshGrid(): Observable<any> {
    return this.refreshAfterRemoveFile.asObservable();
  }

  sendRefreshObservationSheet(value?: any) {
    this.refreshObservationSheet.next(value);
  }

  getRefreshObservationSheet(): Observable<any> {
    return this.refreshObservationSheet.asObservable();
  }

  sendYear(year: any) {
    this.year.next(year);
  }

  getYear(): Observable<number> {
    return this.year.asObservable();
  }
}
