import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { DataStorageService } from '../shared/datastorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false

  constructor(private dataStorage: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.user.subscribe(
      user => {
        this.isAuthenticated = user ? true : false
      }
    )
  }

  onSaveData() {
    this.dataStorage.storeRecipes()
  }

  onFetchData() {
    this.dataStorage.fetchRecipes().subscribe()
  }

  onLogout() {
    this.authService.logout()
  }
}
