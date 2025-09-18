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

import com.parfumerie.gestion_parfumerie.dto.ProduitDTO;
import com.parfumerie.gestion_parfumerie.services.ProduitService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path = "/product")
public class ProduitController {

	@Autowired
    private ProduitService produitService;


    @PostMapping("/create")
    public ProduitDTO create(@RequestBody ProduitDTO dto) {
        return produitService.creer(dto);
    }

    @PutMapping("update/{id}")
    public ProduitDTO update(@PathVariable Long id, @RequestBody ProduitDTO dto) {
        return produitService.modifier(id, dto);
    }

    @GetMapping("/consult/{id}")
    public ProduitDTO getById(@PathVariable Long id) {
        return produitService.consulterById(id);
    }

    @GetMapping("/consult")
    public List<ProduitDTO> getAll() {
        return produitService.consulter();
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable Long id) {
        produitService.supprimer(id);
    }
}
