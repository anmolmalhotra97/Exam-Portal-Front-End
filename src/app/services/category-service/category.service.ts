import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClient: HttpClient
  ) { }

  // Get all categories
  public getAllCategories() {
    return this.httpClient.get(`${baseUrl}/category/`);
  }

  // Get category by id
  public getCategoryById(categoryId: any) {
    return this.httpClient.get(`${baseUrl}/category/${categoryId}`);
  }

  // Add new category
  public addCategory(category: any) {
    return this.httpClient.post(`${baseUrl}/category/`, category);
  }

  // Update category
  public updateCategory(category: any) {
    return this.httpClient.put(`${baseUrl}/category/`, category);
  }

  // Delete category
  public deleteCategory(categoryId: any) {
    return this.httpClient.delete(`${baseUrl}/category/${categoryId}`);
  }
}
