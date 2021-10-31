import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DuocfooterComponent } from './duocfooter/duocfooter.component';
import { HeaderlogComponent } from './headerlog/headerlog.component';




@NgModule({
  declarations: [DuocfooterComponent, HeaderlogComponent],
  exports:[DuocfooterComponent, HeaderlogComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
