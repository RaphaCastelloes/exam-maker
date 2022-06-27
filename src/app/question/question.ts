import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export class Question {
    emailColaborador: string = "";
    number: number;
    title: string;
    answer: string;

    constructor(emailColaborador: string = "", number: number = 0, title: string = "", answer: string = "") {
        this.emailColaborador = emailColaborador;
        this.number = number;
        this.title = title;
        this.answer = answer;
    }
}