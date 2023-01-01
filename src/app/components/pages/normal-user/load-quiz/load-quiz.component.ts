import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { QuizService } from 'src/app/services/quiz-service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  categoryId: any = '';
  quizzes: any = [
    {
      quizId: '',
      title: '',
      description: '',
      numberOfQuestions: '',
      maxMarks: '',
      active: '',
      category: {}
    }
  ]

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizSerice: QuizService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (paramMap) => {
        this.categoryId = paramMap.get('categoryId');

        if (this.categoryId == 0) {
          this.quizzes = this.quizSerice.getAllQuizzes().subscribe(
            (quizzes: any) => {
              this.quizzes = quizzes;
            },
            (error: any) => {
              console.log(error);
              Swal.fire('Error', 'Error while fetching quizzes', 'error');
            });
        } else {
          this.quizzes = this.quizSerice.getAllQuizzesByCategory(this.categoryId).subscribe(
            (quizzes: any) => {
              console.log("Quizzes received from Backend" + quizzes);
              this.quizzes = quizzes;
            },
            (error: any) => {
              console.log(error);
              Swal.fire('Error', 'Error while fetching quizzes', 'error');
            });
        }
      });
  }
}