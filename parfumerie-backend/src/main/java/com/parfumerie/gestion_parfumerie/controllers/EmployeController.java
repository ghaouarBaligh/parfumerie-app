package com.parfumerie.gestion_parfumerie.controllers;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parfumerie.gestion_parfumerie.dto.EmployeDTO;
import com.parfumerie.gestion_parfumerie.services.EmployeService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path = "/employe")
public class EmployeController {

	@Autowired
	EmployeService employeService;

	@PostMapping("/create")
    public EmployeDTO create(@RequestBody EmployeDTO employeDto) {
        return employeService.creer(employeDto);
    }
	
	@PutMapping("/update/{id}")
    public EmployeDTO update(@PathVariable Long id, @RequestBody EmployeDTO employeDto) {
        return employeService.modifier(id, employeDto);
    }
    
	@GetMapping("/consult/{id}")
    public EmployeDTO getById(@PathVariable Long id) {
        return employeService.consulterById(id);
    }

	@GetMapping("/consult")
    public List<EmployeDTO> getAll() {
        return employeService.consulter();
    }

	@DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        employeService.supprimer(id);
    }
	
}
