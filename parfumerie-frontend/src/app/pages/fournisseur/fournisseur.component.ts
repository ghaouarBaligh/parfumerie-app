import { Component, OnInit } from '@angular/core';
import { FournisseurDTO } from '../../models/fournisseur.model';
import { FournisseurService } from '../../services/fournisseur.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-fournisseur',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    NgChartsModule
  ],
  templateUrl: './fournisseur.component.html',
  styleUrl: './fournisseur.component.css'
})
export class FournisseurComponent implements OnInit {


  fournisseursVilleChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  fournisseursVilleChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { title: { display: true, text: 'Ville' } },
      y: { title: { display: true, text: 'Nombre de fournisseurs' }, beginAtZero: true }
    }
  };

  fournisseurs : FournisseurDTO[] = [];
  showForm : boolean = false;
  fournisseurForm : FournisseurDTO = {nom : '', email: '', telephone:'', adresse:''};

  constructor(private fournisseurService : FournisseurService){}

  ngOnInit(): void {
    this.getFournisseurs();
    this.loadFournisseursChart();
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

  loadFournisseursChart() {
    this.fournisseurService.consulter().subscribe(data => {
      this.fournisseurs = data;

      // Extraire les villes depuis l'adresse
      const cityCount: { [key: string]: number } = {};
      this.fournisseurs.forEach(f => {
        // ici je suppose que la ville est le dernier mot dans l'adresse
        const parts = f.adresse.split(',');
        const ville = parts[parts.length - 1].trim();
        cityCount[ville] = (cityCount[ville] || 0) + 1;
      });

      // Préparer les données du graphe
      this.fournisseursVilleChartData = {
        labels: Object.keys(cityCount),
        datasets: [{
          data: Object.values(cityCount),
          label: 'Nombre de fournisseurs',
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'blue',
          borderWidth: 1
        }]
      };
    });
  }


}
