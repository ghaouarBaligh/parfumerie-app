import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ProduitService } from '../../services/produit.service';
import { FournisseurService } from '../../services/fournisseur.service';
import { EmployeService } from '../../services/employe.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgChartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {


  totalProduits: number = 0;
  totalFournisseurs: number = 0;
  totalEmployes: number = 0;

  constructor(
    private produitService: ProduitService,
    private fournisseurService: FournisseurService,
    private employeService: EmployeService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.produitService.getAll().subscribe(data => this.totalProduits = data.length);
    this.fournisseurService.consulter().subscribe(data => this.totalFournisseurs = data.length);
    this.employeService.consulter().subscribe(data => this.totalEmployes = data.length);
  }



}
