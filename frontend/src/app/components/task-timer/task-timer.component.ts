import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

const INTERVAL = 1000;
const MINUTES = 30;
const TOTAL_TIME = MINUTES * 60;

const TIMER_START = '30-minute countdown has started!';
const TIMER_STOP = 'Time is up!';
const CANCEL_TIMER = 'Timer has been canceled';

@Component({
  selector: 'app-task-timer',
  templateUrl: './task-timer.component.html',
  styleUrls: ['./task-timer.component.scss']
})
export class TaskTimerComponent implements OnInit {

  @Input() taskTimer: number;
  @Output() timeUp: EventEmitter<any> = new EventEmitter();
  source$: BehaviorSubject<number>;
  countdown: string;

  constructor(private toastService: ToastService) {
    this.source$ = new BehaviorSubject<number>(0);
    setInterval(() => {
      const newVal = this.source$.getValue() + 1;
      this.source$.next(newVal);
    }, INTERVAL);
    this.source$.asObservable().subscribe(val => {
      const timeRemaining = TOTAL_TIME - val;
      if (timeRemaining >= 0) {
        this.countdown = this.getFormattedTime(timeRemaining);
      } else {
        this.toastService.show(TIMER_STOP);
        this.timeUp.emit();
      }
    });
    this.toastService.show(TIMER_START);
  }

  ngOnInit() {
  }

  public cancelTimer(): void {
    this.toastService.show(CANCEL_TIMER);
    this.timeUp.emit();
  }

  private getFormattedTime(val: number): string {
    const minutes = this.toMinutes(val);
    const seconds = this.toSecondsString(val);
    return `${minutes} : ${seconds}`;
  }

  private toMinutes(val: number): number {
    return Math.floor(val / 60);
  }

  private toSeconds(val: number): number {
    return val % 60;
  }

  private toSecondsString(val: number): string {
    const seconds = this.toSeconds(val);
    return seconds < 10 ? `0${seconds}` : seconds.toString();
  }

}
