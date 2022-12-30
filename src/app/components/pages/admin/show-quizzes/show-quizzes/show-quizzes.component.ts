import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz-service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-quizzes',
  templateUrl: './show-quizzes.component.html',
  styleUrls: ['./show-quizzes.component.css']
})
export class ShowQuizzesComponent implements OnInit {

  quizzes = [
    {
      quizId: '',
      title: '',
      description: '',
      numberOfQuestions: 0,
      maxMarks: 0,
      active: false,
      category: {
        title: '',
      }
    }
  ]

  constructor(
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe(
      (quizzes: any) => {
        console.log(quizzes);
        this.quizzes = quizzes;
      },
      (error: any) => {
        console.log(error);
        Swal.fire('Error', 'Error while fetching quizzes', 'error');
      }
    );
  }

}
