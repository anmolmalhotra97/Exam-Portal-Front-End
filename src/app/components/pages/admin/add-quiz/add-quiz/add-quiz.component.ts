import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { QuizService } from 'src/app/services/quiz-service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

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
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getAllCategories().subscribe(
      (categories: any) => {
        this.categories = categories;
        console.log("Categories received from Backend: " + this.categories);
      },
      (error: any) => {
        console.log(error);
        Swal.fire('Error', 'Error while fetching categories', 'error');
      });
  }

  addQuiz() {
    if (this.quiz.title.trim() == '' || this.quiz.description.trim() == '' || this.quiz.numberOfQuestions == 0 || this.quiz.maxMarks == 0 || this.quiz.category.categoryId == '') {
      this.matSnackBar.open('Please fill all the fields', '', {
        duration: 3000
      });
      return;
    }

    this.quizService.addQuiz(this.quiz).subscribe(
      (quiz: any) => {
        // console.log(quiz);
        this.quiz = {
          title: '',
          description: '',
          numberOfQuestions: 0,
          maxMarks: 0,
          active: false,
          category: {
            categoryId: ''
          }
        };
        Swal.fire('Success', 'Quiz Added Successfully', 'success');
      },
      (error: any) => {
        // console.log(error);
        Swal.fire('Error', 'Error while Adding quizzes', 'error');
      }
    );
  }
}
