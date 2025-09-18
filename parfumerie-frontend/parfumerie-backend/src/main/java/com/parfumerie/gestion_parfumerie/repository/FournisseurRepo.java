package com.parfumerie.gestion_parfumerie.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parfumerie.gestion_parfumerie.entity.Fournisseur;

public interface FournisseurRepo extends JpaRepository<Fournisseur,Long> {

}
