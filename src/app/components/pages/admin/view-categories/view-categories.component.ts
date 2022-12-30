import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category-service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categoryList: any = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (category: any) => {
        console.log(category);
        this.categoryList = category;
      },
      (error: any) => {
        console.log(error);
        Swal.fire('Error!!', 'Error in Loading Categories Data', 'error');
      }
    );
  }

}
