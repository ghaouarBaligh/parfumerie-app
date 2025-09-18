import { Component, OnInit } from '@angular/core';
import { ProduitDTO } from '../../models/produit.model';
import { ProduitService } from '../../services/produit.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements OnInit {
  
  produits : ProduitDTO[] = [];
  showForm: boolean = false;
  produitForm: ProduitDTO = { nom: '', prix: 0, stock: 0, fournisseurId: 0, fournisseurNom: '' };

  constructor(private produitService: ProduitService){}

  ngOnInit(): void {
    this.getProduits();
  }

  getProduits(){
    this.produitService.getAll().subscribe(data =>{
      this.produits = data;
    })
  }

  deleteProduit(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      this.produitService.delete(id).subscribe(() => {
        this.getProduits(); // rafraîchir la liste
        alert("Produit supprimé avec succès !");
      });
    }
  }

  toggleForm(isAdd: boolean = false) {
  this.showForm = !this.showForm;
  if (isAdd) {
    this.produitForm = { id: undefined, nom: '', prix: 0, stock: 0, fournisseurId: 0, fournisseurNom: '' };
  }
}


  saveProduit() {
    if (this.produitForm.id !==undefined) {
      // update
      this.produitService.update(this.produitForm.id, this.produitForm).subscribe(() => {
        this.getProduits();
        this.toggleForm(); // fermer le formulaire
      });
    } else {
      // create
      this.produitService.create(this.produitForm).subscribe(() => {
        this.getProduits();
        this.toggleForm(); // fermer le formulaire
      });
    }
  }

  editProduit(produit: ProduitDTO) {
    this.produitForm = { ...produit };
    this.showForm = true;
  }


}
