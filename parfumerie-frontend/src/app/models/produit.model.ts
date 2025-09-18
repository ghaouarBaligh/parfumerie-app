export interface ProduitDTO {
  id?: number;
  nom: string;
  prix: number;
  stock: number;
  fournisseurId?: number;   // référence au fournisseur
  fournisseurNom?: string;  // optionnel, pour affichage
}