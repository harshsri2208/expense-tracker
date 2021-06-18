package com.harshsri2208.expense.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.harshsri2208.expense.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense,Long> {
	
}