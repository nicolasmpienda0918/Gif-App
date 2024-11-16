import { Component, EventEmitter, Input, Output, OnInit, OnDestroy,  } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit,  OnDestroy {


  //implementacion de  debouncer
  private debouncer: Subject<string> = new Subject<string>()
  private debouncerSuscription? : Subscription;

 @Input()
  public placeholder: string= '';

  @Input()
  public initialValue: string= '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();


ngOnInit(): void {
  this.debouncerSuscription = this.debouncer.pipe( debounceTime(300))
  .subscribe( value => {
 this.onDebounce.emit(value)
  })
}

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }


  emitValue( value: string): void {
    this.onValue.emit(value);
  }

  //metodo para buscar sin necesidad de presionar enter
  onKeyPress( searchTerm: string) {
this.debouncer.next(searchTerm);

  }
}