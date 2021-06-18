package com.harshsri2208.expense.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name="user")
public class User {

	@Id
	private String id;
	
	private String  name;
	
	private String email;

}
