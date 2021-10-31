import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseauthService } from '../services/firebaseauth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginguardGuard implements CanActivate {
  uid=null;
  constructor(private storage:Storage, private router: Router, private firebaseauthService:FirebaseauthService){
    this.firebaseauthService.stateAuth().subscribe(res=>{
        if (res!=null){
          this.uid=res.uid
        }
    })
    

  }


  async validar(){
    
    if (this.uid!=null){
      return true
    }
    else {
      
      this.router.navigate(['/login']);
      
      return false;
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validar();
    

  }
  
}
