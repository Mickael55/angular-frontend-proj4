import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

//Ce composant obtient l'utilisateur actuel du stockage à l'aide de TokenStorageService et affiche les informations (nom d'utilisateur, jeton, e-mail, rôles)
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }
}

