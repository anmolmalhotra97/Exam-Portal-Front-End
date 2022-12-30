import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { QuizService } from 'src/app/services/quiz-service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  quiz: any =
    {
      title: '',
      description: '',
      numberOfQuestions: 0,
      maxMarks: 0,
      active: false,
      category: {
        categoryId: ''
      }
    };

  categories: any = [];

  constructor(
    private quizService: QuizService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    //Fetch and Load the quiz to be updated

    //Fetch all the categories "FIRST" in order to show the current category of the quiz
    this.categories = this.categoryService.getAllCategories().subscribe(
      (categories: any) => {
        this.categories = categories;
        console.log("Categories received from Backend: " + this.categories);
      },
      (error: any) => {
        console.log(error);
        Swal.fire('Error', 'Error while fetching categories', 'error');
      });

    //Here we are fetching the quizId from the URL
    this.quizService.getQuizById(this.activatedRoute.snapshot.paramMap.get('quizId')).subscribe(
      (quiz: any) => {
        if (quiz == null || quiz == undefined) {
          Swal.fire('Error', 'Quiz not found in Database', 'error');
          this.router.navigate(['/admin/view-quizzes']);
          return;
        }
        this.quiz = quiz;
      },
      (error: any) => {
        Swal.fire('Error', 'Error while fetching quiz', 'error');
        console.log(error);
      }
    );
  }

  // Update the quiz
  public updateQuiz() {
    if (this.quiz.title.trim() == '' || this.quiz.description.trim() == '' || this.quiz.numberOfQuestions == 0 || this.quiz.maxMarks == 0 || this.quiz.category.categoryId == '') {
      Swal.fire('Error', 'Please fill all the fields', 'error');
      return;
    }

    this.quizService.updateQuiz(this.quiz).subscribe(
      (quiz: any) => {
        Swal.fire('Success', 'Quiz updated successfully', 'success').then(() => {
          this.router.navigate(['/admin/view-quizzes']);
        });
      },
      (error: any) => {
        Swal.fire('Error', 'Error while updating quiz', 'error');
        console.log(error);
      });
  }
}
