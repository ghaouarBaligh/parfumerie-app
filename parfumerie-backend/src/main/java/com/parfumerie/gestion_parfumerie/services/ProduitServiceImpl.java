package com.parfumerie.gestion_parfumerie.services;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parfumerie.gestion_parfumerie.dto.FournisseurDTO;
import com.parfumerie.gestion_parfumerie.dto.ProduitDTO;
import com.parfumerie.gestion_parfumerie.entity.Fournisseur;
import com.parfumerie.gestion_parfumerie.entity.Produit;
import com.parfumerie.gestion_parfumerie.repository.FournisseurRepo;
import com.parfumerie.gestion_parfumerie.repository.ProduitRepo;

@Service
public class ProduitServiceImpl implements ProduitService {

	@Autowired
	ProduitRepo produitRepo;
	@Autowired
	FournisseurRepo fournisseurRepo;
	
	@Autowired
    private FournisseurService fournisseurService;
	
	@Override
	public ProduitDTO creer(ProduitDTO dto) {
	    Produit produit = ProduitDTO.toEntity(dto);
	    // Associer le fournisseur
	    if (dto.getFournisseurId() != null) {
	        Fournisseur fournisseur = fournisseurRepo.findById(dto.getFournisseurId())
	                .orElseThrow(() -> new RuntimeException("Fournisseur introuvable"));
	        produit.setFournisseur(fournisseur);
	    }

	    Produit saved = produitRepo.save(produit);
	    return ProduitDTO.toDto(saved);
	}
	
	@Override
	public ProduitDTO modifier(Long id, ProduitDTO dto) {
		Produit existingProd = produitRepo.findById(id).orElse(null);
	    if (existingProd != null) {
	    	existingProd.setNom(dto.getNom());
	    	existingProd.setPrix(dto.getPrix());
	    	existingProd.setStock(dto.getStock());
	        Fournisseur fournisseur = fournisseurService.consulterById(dto.getFournisseurId()) != null
	                ? FournisseurDTO.toEntity(fournisseurService.consulterById(dto.getFournisseurId()))
	                : null;
	        existingProd.setFournisseur(fournisseur);

	        Produit updated = produitRepo.save(existingProd);
	        return ProduitDTO.toDto(updated);
	    }
	    return null;
	}
	
	@Override
	public ProduitDTO consulterById(Long id) {
	    return produitRepo.findById(id)
	            .map(ProduitDTO::toDto)  // conversion de l'entité en DTO
	            .orElse(null);
	}

	@Override
	public List<ProduitDTO> consulter() {
	    return produitRepo.findAll().stream()
	            .map(ProduitDTO::toDto)  // conversion de chaque entité en DTO
	            .collect(Collectors.toList());
	}

	@Override
	public void supprimer(Long id) {
		produitRepo.deleteById(id);
		
	}

}
