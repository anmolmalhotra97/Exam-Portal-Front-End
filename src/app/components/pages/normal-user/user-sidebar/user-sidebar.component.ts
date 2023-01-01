import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category-service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  categories: any = [];
  constructor(
    private categoryService: CategoryService
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

}
