import { Component } from '@angular/core';
import { EmployeDTO } from '../../models/employe.model';
import { EmployeService } from '../../services/employe.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-employe',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    NgChartsModule,
  ],
  templateUrl: './employe.component.html',
  styleUrl: './employe.component.css'
})
export class EmployeComponent {

  // Graphique produits par fournisseur - Updated configuration
    public roleChartData: ChartData<'pie'> = {
      labels: [], //rôles
      datasets: [{ data: [] }] // nbre d'employé(e)s
    };
    
    public roleChartType: ChartType = 'pie';
    public roleChartOptions: ChartConfiguration['options'] = {
      responsive: true,
    };

    loadRolesChart(){
      this.employeService.consulter().subscribe(employes => {
        const roles = ['Manager', 'CEO', 'Vendeur']
        const data = roles.map(role => employes.filter(e => e.role === role).length);

        this.roleChartData = {
          labels: roles,
          datasets: [{ data: data, label: 'Nombre d\'employés par rôle' }]
        }
      })
    }



  employes : EmployeDTO[] = [];
  showForm: boolean = false;
  employeForm: EmployeDTO = { nom: '', prenom: '', email: '', telephone: '', role: '', username: '', password: '' };

  constructor(private employeService: EmployeService){}
  
  ngOnInit(): void {
      this.getEmployes();
      this.loadRolesChart();
    }
  
  getEmployes(){
      this.employeService.consulter().subscribe(data =>{
        this.employes = data;
      })
    }
    
  deleteEmploye(employe: EmployeDTO){
    if (confirm("Êtes-vous sûr de vouloir supprimer cet employe ?")){
      this.employeService.supprimer(employe.id!).subscribe(()=>{
        alert(`Employé(e) ${employe.nom} supprimé(e) avec succès !`);
        this.getEmployes();
      });
    }
  }

  toggleForm(isAdd: boolean = false) {
    this.showForm = !this.showForm;
    if (isAdd) {
      this.employeForm = { id: undefined, nom: '', prenom: '', email: '', telephone: '', role: '', username: '', password: '' };
    }
  }

  saveEmploye() {
    if (this.employeForm.id !==undefined) {
      // update
      this.employeService.modifier(this.employeForm.id, this.employeForm).subscribe(() => {
        alert(`Employé(e) ${this.employeForm.nom} modifié(e) avec succès !`);
        this.getEmployes();
        this.toggleForm(); // fermer le formulaire
      });
    } else {
      // create
      this.employeService.creer(this.employeForm).subscribe(() => {
        alert(`Employé(e) ${this.employeForm.nom} créé(e) avec succès !`);
        this.getEmployes();
        this.toggleForm(); // fermer le formulaire
      });
    }
  }

  editEmploye(employe: EmployeDTO) {
      this.employeForm = { ...employe };
      this.showForm = true;
  }


}
