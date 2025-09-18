package com.parfumerie.gestion_parfumerie.services;

import java.util.List;

import com.parfumerie.gestion_parfumerie.dto.ProduitDTO;


public interface ProduitService {
	
	ProduitDTO creer(ProduitDTO produitDTO);
	ProduitDTO modifier(Long id, ProduitDTO produitDTO);
	ProduitDTO consulterById(Long id);
	List<ProduitDTO> consulter();
	void supprimer(Long id);

}
