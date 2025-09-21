import { Component, OnInit } from '@angular/core';
import { ProduitDTO } from '../../models/produit.model';
import { ProduitService } from '../../services/produit.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FournisseurDTO } from '../../models/fournisseur.model';
import { FournisseurService } from '../../services/fournisseur.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    NgChartsModule
  ],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements OnInit {
  
  prixStockChartData: ChartData<'line'> = { labels: [], datasets: [] };
  prixStockChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: { legend: { display: true } },
    scales: {
      x: { title: { display: true, text: 'Produit (Stock)' } },
      y: { title: { display: true, text: 'Prix (DT)' } }
    }
  };


  fournisseurs: FournisseurDTO[] = [];
  produits : ProduitDTO[] = [];
  showForm: boolean = false;
  produitForm: ProduitDTO = { nom: '', prix: 0, stock: 0, fournisseurId: 0, fournisseurNom: '' };

  constructor(private produitService: ProduitService, private fournisseurService: FournisseurService){}

  ngOnInit(): void {
    this.getProduits();
    this.getFournisseurs();
    this.loadProductsChart();
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
      this.produitForm = { id: undefined, nom: '', prix: undefined as unknown as number, stock: undefined as unknown as number, fournisseurId: undefined as unknown as number, fournisseurNom: '' };
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

  getFournisseurs() {
    this.fournisseurService.consulter().subscribe(data => {
      this.fournisseurs = data;
    });
  }

  updateFournisseurNom(event: any) {
    const selectedId = event.target.value;
    const fournisseur = this.fournisseurs.find(f => f.id == selectedId);
    this.produitForm.fournisseurNom = fournisseur ? fournisseur.nom : '';
  }

  loadProductsChart(){
    this.produitService.getAll().subscribe(data =>{
      this.produits = data;

      // construction dynamique du graphe
      this.prixStockChartData = {
        labels: this.produits.map(p => `${p.nom} (${p.stock})`),
        datasets: [{
          data: this.produits.map(p => p.prix),
          label: 'Prix des produits',
          borderColor: 'blue',
          backgroundColor: 'rgba(0,123,255,0.2)',
          fill: true,
          tension: 0.3
        }]
      };
    })
  }

}
