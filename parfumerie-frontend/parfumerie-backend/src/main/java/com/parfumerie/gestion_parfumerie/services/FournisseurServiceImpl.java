package com.parfumerie.gestion_parfumerie.services;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parfumerie.gestion_parfumerie.dto.FournisseurDTO;
import com.parfumerie.gestion_parfumerie.entity.Fournisseur;
import com.parfumerie.gestion_parfumerie.repository.FournisseurRepo;

@Service
public class FournisseurServiceImpl implements FournisseurService {

	@Autowired
	FournisseurRepo fournisseurRepo;
	
	@Override
	public FournisseurDTO creer(FournisseurDTO dto) {
		Fournisseur fournisseur = FournisseurDTO.toEntity(dto);
		Fournisseur saved = fournisseurRepo.save(fournisseur);
		return FournisseurDTO.toDto(saved);
	}
	
	@Override
    public FournisseurDTO modifier(Long id, FournisseurDTO dto) {
        Fournisseur existing = fournisseurRepo.findById(id).orElse(null);
        if (existing != null) {
            existing.setNom(dto.getNom());
            existing.setEmail(dto.getEmail());
            existing.setTelephone(dto.getTelephone());
            existing.setAdresse(dto.getAdresse());
            Fournisseur updated = fournisseurRepo.save(existing);
            return FournisseurDTO.toDto(updated);
        }
        return null;
    }

	@Override
    public FournisseurDTO consulterById(Long id) {
        return fournisseurRepo.findById(id)
                .map(FournisseurDTO::toDto)
                .orElse(null);
    }
	
	@Override
    public List<FournisseurDTO> consulter() {
        return fournisseurRepo.findAll()
                .stream()
                .map(FournisseurDTO::toDto)
                .collect(Collectors.toList());
    }

	@Override
	public void supprimer(Long id) {
		fournisseurRepo.deleteById(id);
	}

}
