package com.parfumerie.gestion_parfumerie.dto;

import com.parfumerie.gestion_parfumerie.entity.Produit;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProduitDTO {

	private Long id;
    private String nom;
    private double prix;
    private int stock;
    private Long fournisseurId;
    private String fournisseurNom;
	
    public static ProduitDTO toDto(Produit produit) {
    	return ProduitDTO.builder()
    			.id(produit.getId())
    			.nom(produit.getNom())
    			.prix(produit.getPrix())
    			.stock(produit.getStock())
    			.fournisseurId(produit.getFournisseur() != null ? produit.getFournisseur().getId() : null)
    			.fournisseurNom(produit.getFournisseur() != null ? produit.getFournisseur().getNom() : null)
    			.build();
    }
    
    public static Produit toEntity(ProduitDTO dto) {
        if (dto == null) return null;
        return Produit.builder()
                .id(dto.getId())
                .nom(dto.getNom())
                .prix(dto.getPrix())
                .stock(dto.getStock())
                .build();
    }
    
}
