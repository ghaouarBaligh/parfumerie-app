import { Component, OnInit } from '@angular/core';
import { FournisseurDTO } from '../../models/fournisseur.model';
import { FournisseurService } from '../../services/fournisseur.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fournisseur',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './fournisseur.component.html',
  styleUrl: './fournisseur.component.css'
})
export class FournisseurComponent implements OnInit {

  fournisseurs : FournisseurDTO[] = [];
  showForm : boolean = false;
  fournisseurForm : FournisseurDTO = {nom : '', email: '', telephone:'', adresse:''};

  constructor(private fournisseurService : FournisseurService){}

  ngOnInit(): void {
    this.getFournisseurs();
  }

  getFournisseurs(){
    this.fournisseurService.consulter().subscribe(data => {
      this.fournisseurs = data;
    })
  }

  deleteFournisseur(fournisseur: FournisseurDTO){
      if (confirm("Êtes-vous sûr de vouloir supprimer ce fournisseur ?")){
        this.fournisseurService.supprimer(fournisseur.id!).subscribe(()=>{
          alert(`Fournisseur ${fournisseur.nom} supprimé avec succès !`);
          this.getFournisseurs();
        });
      }
    }

  toggleForm(isAdd: boolean = false) {
    this.showForm = !this.showForm;
    if (isAdd) {
      this.fournisseurForm = { id: undefined, nom: '', email: '', telephone: '', adresse: '' };
    }
  }

  saveFournisseur() {
    if (this.fournisseurForm.id !==undefined) {
      // update
      this.fournisseurService.modifier(this.fournisseurForm.id, this.fournisseurForm).subscribe(() => {
        alert(`Fournisseur ${this.fournisseurForm.nom} modifié avec succès !`);
        this.getFournisseurs();
        this.toggleForm(); // fermer le formulaire
      });
    } else {
      // create
      this.fournisseurService.creer(this.fournisseurForm).subscribe(() => {
        alert(`Fournisseur ${this.fournisseurForm.nom} créé avec succès !`);
        this.getFournisseurs();
        this.toggleForm(); // fermer le formulaire
      });
    }
  }

  editFournisseur(fournisseur: FournisseurDTO) {
        this.fournisseurForm = { ...fournisseur };
        this.showForm = true;
  }

}
