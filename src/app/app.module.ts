import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { HomeComponent } from './components/pages/home/home.component';
import { MatCardModule } from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { authenticationInterceptorProviders } from './services/auth-interceptor/auth.interceptor';
import { UserDashboardComponent } from './components/pages/normal-user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/pages/admin/admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './components/pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './components/pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './components/pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './components/pages/admin/add-category/add-category.component';
import { ShowQuizzesComponent } from './components/pages/admin/show-quizzes/show-quizzes/show-quizzes.component';
import { AddQuizComponent } from './components/pages/admin/add-quiz/add-quiz/add-quiz.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { UpdateQuizComponent } from './components/pages/admin/update-quiz/update-quiz/update-quiz.component';
import { UpdateCategoryComponent } from './components/pages/admin/update-category/update-category/update-category.component';
import { ViewQuestionsComponent } from './components/pages/admin/view-queststions/view-questions/view-questions.component';
import { AddQuestionComponent } from './components/pages/admin/add-question/add-question/add-question.component';
import { UpdateQuestionComponent } from './components/pages/admin/update-question/update-question/update-question.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    ViewCategoriesComponent,
    AddCategoryComponent,
    ShowQuizzesComponent,
    AddQuizComponent,
    UpdateQuizComponent,
    UpdateCategoryComponent,
    ViewQuestionsComponent,
    AddQuestionComponent,
    UpdateQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule
  ],
  providers: [authenticationInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
