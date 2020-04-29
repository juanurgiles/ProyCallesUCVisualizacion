import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapaCallesComponent } from './mapa-calles.component';

const routes: Routes = [{ path: '', component: MapaCallesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapaCallesRoutingModule { }
