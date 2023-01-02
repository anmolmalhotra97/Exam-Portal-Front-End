import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './components/pages/admin/add-question/add-question/add-question.component';
import { AddQuizComponent } from './components/pages/admin/add-quiz/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './components/pages/admin/admin-dashboard/admin-dashboard.component';
import { ShowQuizzesComponent } from './components/pages/admin/show-quizzes/show-quizzes/show-quizzes.component';
import { UpdateCategoryComponent } from './components/pages/admin/update-category/update-category/update-category.component';
import { UpdateQuestionComponent } from './components/pages/admin/update-question/update-question/update-question.component';
import { UpdateQuizComponent } from './components/pages/admin/update-quiz/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './components/pages/admin/view-categories/view-categories.component';
import { ViewQuestionsComponent } from './components/pages/admin/view-queststions/view-questions/view-questions.component';
import { WelcomeComponent } from './components/pages/admin/welcome/welcome.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { LoadQuizComponent } from './components/pages/normal-user/load-quiz/load-quiz.component';
import { QuizInstructionsComponent } from './components/pages/normal-user/quiz-instructions/quiz-instructions/quiz-instructions.component';
import { UserDashboardComponent } from './components/pages/normal-user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { AdminGuard } from './services/guard/admin/admin.guard';
import { NormalUserGuard } from './services/guard/normal-user/normal-user.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: RegisterComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    // canActivate: [AdminGuard],
    // Child is used to load a component within a component
    children: [
      //Welcome Component is loaded within AdminDashboardComponent by "default"
      {
        path: '',
        component: WelcomeComponent,
      },
      //Profile Component is loaded within AdminDashboardComponent
      {
        path: 'profile',
        component: ProfileComponent,
      },
      //View Categories Component is loaded within AdminDashboardComponent
      {
        path: 'view-categories',
        component: ViewCategoriesComponent,
      },
      //Add Category Component is loaded within AdminDashboardComponent
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      //Update Category Component is loaded within AdminDashboardComponent
      {
        path: 'update-category/:categoryId',
        component: UpdateCategoryComponent,
      },
      //View Quizzes Component is loaded within AdminDashboardComponent
      {
        path: 'view-quizzes',
        component: ShowQuizzesComponent,
      },
      //Add Quiz Component is loaded within AdminDashboardComponent
      {
        path: 'add-quiz',
        component: AddQuizComponent,
      },
      //Update Quiz Component is loaded within AdminDashboardComponent
      {
        path: 'update-quiz/:quizId',
        component: UpdateQuizComponent,
      },
      //View Question Component is loaded within AdminDashboardComponent
      {
        path: 'view-questions/:quizId/:quizTitle',
        component: ViewQuestionsComponent,
      },
      //Add Question Component is loaded within AdminDashboardComponent
      {
        path: 'add-question/:quizId/:quizTitle',
        component: AddQuestionComponent,
      },
      //Update Question Component is loaded within AdminDashboardComponent
      {
        path: 'update-question/:quesId/:quizId/:quizTitle',
        component: UpdateQuestionComponent,
      }
    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    // canActivate: [NormalUserGuard]
    children: [
      //Load Quiz Component is loaded within UserDashboardComponent
      {
        path: ':categoryId',
        component: LoadQuizComponent
      },
      //Quiz Instructions Component is loaded within UserDashboardComponent
      {
        path: 'quiz-instructions/:quizId',
        component: QuizInstructionsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
