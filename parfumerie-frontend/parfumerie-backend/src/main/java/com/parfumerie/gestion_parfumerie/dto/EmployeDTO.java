package com.parfumerie.gestion_parfumerie.dto;

import com.parfumerie.gestion_parfumerie.entity.Employe; 

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeDTO {

	private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private String role;
    private String username;
    private String password;
	
    public static EmployeDTO toDto(Employe employe) {
    	return EmployeDTO.builder()
    			.id(employe.getId())
    			.nom(employe.getNom())
    			.prenom(employe.getPrenom())
    			.email(employe.getEmail())
    			.telephone(employe.getTelephone())
    			.role(employe.getRole())
    			.username(employe.getUsername())
    			.password(employe.getPassword())
    			.build();
    }
    
    public static Employe toEntity(EmployeDTO dto) {
        if (dto == null) return null;
        return Employe.builder()
                .id(dto.getId())
                .nom(dto.getNom())
                .prenom(dto.getPrenom())
                .email(dto.getEmail())
                .telephone(dto.getTelephone())
                .role(dto.getRole())
                .username(dto.getUsername())
                .password(dto.getPassword())
                .build();
    }
    
    
}
