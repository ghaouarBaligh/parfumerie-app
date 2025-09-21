import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Modules
import { RouterModule } from '@angular/router';
import { ProduitService } from '../../services/produit.service';
import { FournisseurService } from '../../services/fournisseur.service';
import { EmployeService } from '../../services/employe.service';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgChartsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {

  totalProduits: number = 0;
  totalFournisseurs: number = 0;
  totalEmployes: number = 0;

  // Graphique produits par fournisseur - Updated configuration
  public fournisseurChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Nombre de produits' }]
  };
  
  public fournisseurChartType: ChartType = 'bar';
  public fournisseurChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  constructor(
    private produitService: ProduitService,
    private fournisseurService: FournisseurService,
    private employeService: EmployeService
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadFournisseurChart();
  }

  loadStats() {
    this.produitService.getAll().subscribe(data => this.totalProduits = data.length);
    this.fournisseurService.consulter().subscribe(data => this.totalFournisseurs = data.length);
    this.employeService.consulter().subscribe(data => this.totalEmployes = data.length);
  }

  loadFournisseurChart() {
    this.fournisseurService.consulter().subscribe(fournisseurs => {
      this.produitService.getAll().subscribe(produits => {
        // Update chart data with proper structure
        this.fournisseurChartData = {
          labels: fournisseurs.map(f => f.nom),
          datasets: [{
            data: fournisseurs.map(f =>
              produits.filter(p => p.fournisseurId === f.id).length
            ),
            label: 'Nombre de produits'
          }]
        };
      });
    });
  }

}
