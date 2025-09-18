package com.parfumerie.gestion_parfumerie.dto;

import com.parfumerie.gestion_parfumerie.entity.Fournisseur;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FournisseurDTO {

	private Long id;
    private String nom;
    private String email;
    private String telephone;
    private String adresse;
	
    public static FournisseurDTO toDto(Fournisseur fournisseur) {
    	return FournisseurDTO.builder()
    			.id(fournisseur.getId())
    			.nom(fournisseur.getNom())
    			.email(fournisseur.getEmail())
    			.telephone(fournisseur.getTelephone())
    			.adresse(fournisseur.getAdresse())
    			.build();
    }
    
    public static Fournisseur toEntity(FournisseurDTO dto) {
        if (dto == null) return null;
        return Fournisseur.builder()
                .id(dto.getId())
                .nom(dto.getNom())
                .email(dto.getEmail())
                .telephone(dto.getTelephone())
                .adresse(dto.getAdresse())
                .build();
    }
    
}
