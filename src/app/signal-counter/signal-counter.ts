import { Component, computed, effect, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-signal-counter',
  standalone: false,
  templateUrl: './signal-counter.html',
  styleUrl: './signal-counter.scss'
})
export class SignalCounter {
   count = signal(0);

   calculated = computed(() => this.count()*2);
   
   // Signal → Observable
   calcObs = toObservable(this.calculated);

  // Observable → Signal
  calcSignal = toSignal(
    this.calcObs, 
    { initialValue: 0 } // required so you have a synchronous fallback
  );

   increment() {
    this.count.update(c => c+1);
   }

   decrement() {
    this.count.update(c => c-1);
   }

   constructor() {
    effect(() => console.log(`From effect count change ${this.count()} & ${this.calculated()}`));
   }
}
