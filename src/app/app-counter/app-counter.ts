import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: false,
  templateUrl: './app-counter.html',
  styleUrl: './app-counter.scss'
})
export class AppCounter {
   count: number = 0;

   get calculated() {
      return this.count*2;
   }

   increment() {
    this.count++
   }

   decrement() {
    this.count--
   }
}
