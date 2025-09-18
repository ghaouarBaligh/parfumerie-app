import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeComponent } from './pages/employe/employe.component';
import { FournisseurComponent } from './pages/fournisseur/fournisseur.component';
import { ProduitComponent } from './pages/produit/produit.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent }, 
    { path: 'dashboard', component: DashboardComponent },
    { path: 'employes', component: EmployeComponent },
    { path: 'fournisseurs', component: FournisseurComponent },
    { path: 'produits', component: ProduitComponent },

];
