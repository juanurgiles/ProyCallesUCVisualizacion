import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  constructor(private httpclient: HttpClient) { }
  recuperarCategorias() {
    return this.httpclient.get(environment.envUrlWS + 'tcategorias/').toPromise()
  }
  recuperarTipoCategorias() {
    return this.httpclient.get(environment.envUrlWS + 'tipocategoria/').toPromise()
  }
  recuperarJSON(id) {
    return this.httpclient.get(environment.envUrlJson +id).toPromise()
  }

}
