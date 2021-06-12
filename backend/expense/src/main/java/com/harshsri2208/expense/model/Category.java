package com.harshsri2208.expense.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Data
@Table(name="category")
public class Category {
	
	@Id
	private Long id;
	
	private String name;

}
