import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as L from 'leaflet';


import * as t from 'topojson';
import { MapaService } from '../service/mapa.service';
import { TreeNode } from 'primeng/api';
import { tickStep } from 'd3';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-mapa-calles',
  templateUrl: './mapa-calles.component.html',
  styleUrls: ['./mapa-calles.component.scss']
})
export class MapaCallesComponent implements OnInit {
  cat = [];
  map;
  items: TreeNode;
  tipocat: any[] = [];
  cats: any[] = [];
  catSel: any[] = [];
  layers = [];
  tcActivos = [];
  constructor(private mapaService: MapaService) { }

  ngOnInit(): void {
    this.inicializarMapa();
    this.cargarMapa();

    this.items = {
      data:
        [

        ]
    }
  }
  cargarMapa() {
    // Recupero las categorias de los servicios
    this.mapaService.recuperarCategorias().then((resp: any[]) => {
      // La variable cat es la lsita de las categorias
      this.cat = resp;


      const catprincipal = this.cat.filter(resp1 => {
        return resp1.idtipocategoria === '11' && resp1.idcategoria !== '154';
      });

      // recupero los tipos de categoria
      this.mapaService.recuperarTipoCategorias().then((resp1: any[]) => {
        this.tipocat = resp1;

        let n = 0;
        // Creo el array de subcategorias
        for (const tipocat of this.tipocat) {


          this.cats[n] = this.cat.filter(resp1 => {
            return resp1.idtipocategoria == tipocat.idtipocategoria && resp1.idcategoria !== '154';
          });
          n++;
        }
      });
      const cats = this.cat.filter(resp1 => {
        return resp1.idcategoria !== '154';
      });
      for (const key of catprincipal) {

        this.agregarMenus(key);
        //this.graficarCalle1(key.idcategoria);

      }
    });

  }
  nodeSelect(event) {
    // Seleccionar una categoria
    this.graficarCalle1(event.node.idcategoria);
    this.revisarCategoriasPrincipales()
  }
  nodeUnselect(event) {
    //deseleccionar una categoria
    this.map.removeLayer(this.layers[event.node.idcategoria]);
    this.revisarCategoriasPrincipales()

  }
  revisarCategoriasPrincipales() {
    let filtro = this.catSel.filter(resp1 => {
      return resp1.idtipocategoria == 11;
    })
    //console.log(filtro)
    // comparación de tipos de categoria depdendientes de una categoria adicionando un activo = true
    let arrcatdep = [];
    for (const tc of this.tipocat) {
      delete tc.activo;
      if (tc.ct) {

        arrcatdep = arrcatdep.concat(tc.ct.split(','))
        for (const ct of tc.ct.split(',')) {
          for (const ct1 of filtro) {
            if (ct == ct1.idcategoria) {
              tc.activo = true;
            }
          }
        }
      }
    }
    // console.log(this.catSel)
    for (const it of this.tipocat) {
      if (it.idtipocategoria != 11) {
        for (const csel of this.catSel) {
          console.log(it.idtipocategoria)
          if (it.idtipocategoria == csel.idtipocategoria && !it.activo) {

            let index = this.catSel.indexOf(csel);
            let rem = this.catSel.filter(resp1 => {
              return resp1.idtipocategoria == it.idtipocategoria;
            });
            for (const iterator of rem) {
              this.map.removeLayer(this.layers[iterator.idcategoria]);
            }
            this.catSel = this.catSel.filter(resp1 => {
              return resp1.idtipocategoria != it.idtipocategoria;
            });
          }
        }
      }
    }
  }
  agregarMenus(cat) {

    let item = {
      label: cat.categoria,
      data: "Documents Folder",
      expandedIcon: "pi pi-folder-open",
      collapsedIcon: "pi pi-folder",
    };

    this.items.data.push(item)
  }
  inicializarMapa() {
    // Inicializar mapa
    this.map = L.map('map').setView([-2.90055, -79.00453], 13);
    const toolserver = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    );
    const stamen1 = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: 'Universidad de Cuenca- Proyecto Calles',
    }).addTo(this.map);
    const baseLayers = { stamen: stamen1, 'toolserver-mapnik': toolserver };
    // const colors = ['#10B4CC', '#FF3F9E', '#476CDA', '#63EA7A', '#FFD06C', '#FF766C', '#9F3ED9'
    //   , '#FFD200', 'red', '#360DC4', '#9AAFB2', 'darkred'];
  }
  // Método para graficar las calles de una categoría desde un archivo geojson
  graficarCalle1(id) {
    // Recupero el mapa
    this.mapaService.recuperarJSON('json' + id + '.php')
      .then((resp) => {
        // const geojson
        this.layers[id] = L.geoJson(resp, {
          style: {
            className: 'cat' + id
          }
          ,onEachFeature: onEachFeature
        });
        // añado la clase de color a cada elemento
        this.layers[id].setStyle({ className: 'cat' + id });
        this.layers[id].addTo(this.map);



        function onEachFeature(feature, layer) {
          if (feature.properties) {
            layer.bindPopup(
              '<b>' +
              feature.properties.name +
              '</b>  ' +
              feature.properties.prop0 +
              '.'
            );
          }
        }


      });
  }
  // Metodos para la barra lateral
  openNav() {
    // Abrir navegaci'on
    document.getElementById('mySidebar').style.width = '1200px';
    // document.getElementById('main').style.marginLeft = '1200px';
  }

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  closeNav() {
    // Cerrar navegación
    document.getElementById('mySidebar').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }
}
