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

import com.parfumerie.gestion_parfumerie.dto.FournisseurDTO;
import com.parfumerie.gestion_parfumerie.services.FournisseurService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path = "/fournisseur")
public class FournisseurController {

	@Autowired
    private FournisseurService fournisseurService;

    @PostMapping("/create")
    public FournisseurDTO create(@RequestBody FournisseurDTO dto) {
        return fournisseurService.creer(dto);
    }

    @PutMapping("/update/{id}")
    public FournisseurDTO update(@PathVariable Long id, @RequestBody FournisseurDTO dto) {
        return fournisseurService.modifier(id, dto);
    }

    @GetMapping("/consult/{id}")
    public FournisseurDTO getById(@PathVariable Long id) {
        return fournisseurService.consulterById(id);
    }

    @GetMapping("/consult")
    public List<FournisseurDTO> getAll() {
        return fournisseurService.consulter();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        fournisseurService.supprimer(id);
    }
}
