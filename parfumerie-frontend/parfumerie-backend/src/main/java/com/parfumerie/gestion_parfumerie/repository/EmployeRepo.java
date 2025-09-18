package com.parfumerie.gestion_parfumerie.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parfumerie.gestion_parfumerie.entity.Employe;

public interface EmployeRepo extends JpaRepository<Employe, Long> {

}
