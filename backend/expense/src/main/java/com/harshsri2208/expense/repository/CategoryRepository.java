package com.harshsri2208.expense.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.harshsri2208.expense.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{

	Category findByName(String name);
}
