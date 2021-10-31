import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginguardGuard implements CanActivate {

  constructor(private storage:Storage, private router: Router){

  }


  async validar(){
    let activo= await this.storage.get('activo');
    if (activo!=null){
      return true
    }
    // else {
    //   // start a new navigation to redirect to login page
    //   // this.router.navigate(['/login']);
    //   // abort current navigation
    //   return false;
    // }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validar();
    

  }
  
}
