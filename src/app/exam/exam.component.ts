import { Component, OnInit } from '@angular/core';
import { Question } from '../question/question';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  questions = new Array<Question>();
  isStarted: boolean = false;
  time: any;
  emailColaborador: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  fillQuestions() {
    this.questions.push(new Question(this.emailColaborador, 1, "Existem 3 branchs permanentes?"));
    this.questions.push(new Question(this.emailColaborador, 2, "Existem 3 branchs permanentes?"));
    this.questions.push(new Question(this.emailColaborador, 3, "Existem 3 branchs permanentes?"));
    this.questions.push(new Question(this.emailColaborador, 4, "Existem 3 branchs permanentes?"));
  }

  startExam(emailColaborador: string) {
    this.emailColaborador = emailColaborador.trim();
    var ticket = localStorage.getItem('ticketProvaGit');
    if (!ticket) {
      if (this.isStarted === false) {
        if (this.emailColaborador === "" || this.emailColaborador.endsWith("@aneel.gov.br") === false) {
          alert("Por favor, informe seu corretamente.");
        }
        else {
          this.createTicket();
          this.setExamtime();
          this.fillQuestions();

          this.isStarted = true;
          this.countDown();
        }
      }
    }
    else {
      alert("Não é possível iniciar o teste novamente.");
    }
  }

  setExamtime() {
    this.time = 30;
  }

  cleanExam() {
    localStorage.removeItem('ticketProvaGit');
    alert("Prova limpa com sucesso.");
  }

  createTicket() {
    // Get the datetime of the current time
    var now = new Date();
    // Format the date in a single number
    localStorage.setItem('ticketProvaGit', now.getDate().toString());
  }

  countDown() {
    setTimeout(() => {
      if (this.time > 0) {
        this.time--;
        this.countDown();
      }
      else {
        this.finishExam();
      }
    }, 60000);
  }

  alertFinishExam() {
    var answer = window.confirm("Confirma o fim da prova?");
    if (answer) {
      this.finishExam();
    }
  }

  finishExam() {
    this.time = 0;
    localStorage.setItem('answersProvaGit', this.questions.map(q => q.answer).join(","));
    saveAs(new Blob([JSON.stringify(this.questions)], { type: 'application/json' }), 'cartao_de_respostas_prova-git.json');
  }
}