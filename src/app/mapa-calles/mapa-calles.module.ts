import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MapaCallesRoutingModule } from './mapa-calles-routing.module';
import { MapaCallesComponent } from './mapa-calles.component';
import {SlideMenuModule} from 'primeng/slidemenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {CheckboxModule} from 'primeng/checkbox';

import {TreeModule} from 'primeng/tree';
import { FormsModule } from '@angular/forms';
import {ListboxModule} from 'primeng/listbox';


@NgModule({
  declarations: [MapaCallesComponent],
  imports: [
    CommonModule,
    FormsModule,
    MapaCallesRoutingModule,
    HttpClientModule,
    SlideMenuModule,
    CheckboxModule,
    TreeModule,
    ListboxModule
  ]
})
export class MapaCallesModule { }
