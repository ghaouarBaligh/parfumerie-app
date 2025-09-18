package com.parfumerie.gestion_parfumerie.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parfumerie.gestion_parfumerie.entity.Produit;

public interface ProduitRepo extends JpaRepository<Produit, Long> {

}
