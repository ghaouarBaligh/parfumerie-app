package com.parfumerie.gestion_parfumerie.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parfumerie.gestion_parfumerie.dto.EmployeDTO;
import com.parfumerie.gestion_parfumerie.entity.Employe;
import com.parfumerie.gestion_parfumerie.repository.EmployeRepo;

@Service
public class EmployeServiceImpl implements EmployeService {

	@Autowired
	EmployeRepo employeRepo;
	
	@Override
    public EmployeDTO creer(EmployeDTO dto) {
        Employe employe = EmployeDTO.toEntity(dto);
        Employe saved = employeRepo.save(employe);
        return EmployeDTO.toDto(saved);
    }
	
	@Override
    public EmployeDTO modifier(Long id, EmployeDTO dto) {
        Employe existantEmploy = employeRepo.findById(id).orElse(null);
        if (existantEmploy != null) {
            existantEmploy.setNom(dto.getNom());
            existantEmploy.setPrenom(dto.getPrenom());
            existantEmploy.setEmail(dto.getEmail());
            existantEmploy.setTelephone(dto.getTelephone());
            existantEmploy.setRole(dto.getRole());
            existantEmploy.setUsername(dto.getUsername());
            existantEmploy.setPassword(dto.getPassword());
            Employe updated = employeRepo.save(existantEmploy);
            return EmployeDTO.toDto(updated);
        }
        return null;
    }

	@Override
    public EmployeDTO consulterById(Long id) {
        return employeRepo.findById(id)
                .map(EmployeDTO::toDto)
                .orElse(null);
    }

	@Override
    public List<EmployeDTO> consulter() {
        return employeRepo.findAll()
                .stream()
                .map(EmployeDTO::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void supprimer(Long id) {
        employeRepo.deleteById(id);
    }

}
