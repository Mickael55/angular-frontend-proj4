import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

//Ce composant est le composant racine de notre application Angular, il définit la balise racine : <app-root></app-root> que nous utilisons dans index.html
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();//verify if isLoggedIn status using TokenStorageService

    if (this.isLoggedIn) {//if true, we get user's roles and set values for showAdminBoard & showModeratorBoard. Ils contrôleront la façon dont la barre de navigation du modèle affiche ses éléments
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
