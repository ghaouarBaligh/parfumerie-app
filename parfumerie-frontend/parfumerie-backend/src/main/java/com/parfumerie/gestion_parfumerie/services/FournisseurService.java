package com.parfumerie.gestion_parfumerie.services;

import java.util.List;

import com.parfumerie.gestion_parfumerie.dto.FournisseurDTO;


public interface FournisseurService {

	FournisseurDTO creer(FournisseurDTO fournisseurDTO);
	FournisseurDTO modifier(Long id, FournisseurDTO fournisseurDTO);
	FournisseurDTO consulterById(Long id);
	List<FournisseurDTO> consulter();
	void supprimer(Long id);
}
