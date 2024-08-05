package com.Note.noteApp.service;

import com.Note.noteApp.entity.Category;

import java.util.List;

public interface CategoryService {

    public List<Category> getAllCategories();
    public Category getCategoryById(Long id);
    public void deleteCategoryById(Long id);
    public Category save(Category category);

}
