import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from './question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question = new Question();
  @Output() answerChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onAnswerChange(answer: string) {
    this.question.answer = answer;
    this.answerChange.emit(this.question);
  }
}
