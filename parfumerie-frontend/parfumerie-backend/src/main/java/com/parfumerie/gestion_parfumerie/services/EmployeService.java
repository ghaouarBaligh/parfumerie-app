package com.parfumerie.gestion_parfumerie.services;

import java.util.List;

import com.parfumerie.gestion_parfumerie.dto.EmployeDTO;

public interface EmployeService {
	
	
	void supprimer(Long id);
	EmployeDTO consulterById(Long id);
	List<EmployeDTO> consulter();
	EmployeDTO modifier(Long id, EmployeDTO dto);
	EmployeDTO creer(EmployeDTO dto);
	
}
