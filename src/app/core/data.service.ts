import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CodigoService } from './codigo.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  ddd = []
  constructor(
    private http: HttpClient,
    private codigoService:CodigoService
  ) {}

  public inmueblesEncontrados=[]
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY3VkSWQiOiJ6WE9WTXBkRENzaGhJaFVnMWZ4MG1rZnEtOW00QXVfWTUxbkQyVF9UUU1hOS11QWNiMWF6c3pMS1JnZ2FrVk1KQ05jN0lqdFQxMzRDb0NidFZ4X085UzdqSjRxcFJmTEJKQjdpamQ1SHBfLXVyY19EdEhqcmstcGxTc3Z1NHZxZyIsInRpbWVzcGFuIjoiNjM3ODA3MzM5OTg0MDQyNzQzIiwiZXhwIjoxNjQ1MjQ1MTk4fQ.U4RC0-2iMghwa041JqQvreAvbo7cQzXqu-zfhZ4j-YE`
    }),
    //observe: "response" as "body",
    params: new HttpParams()
  };

  getCnbv(cc):Observable<any>{
    const uri = `https://192.168.101.182:6001/IntegrationService/integration/common/catalogCNBV/${cc}/Individual`;
    return  this.http.get<any>(uri, this.httpOptions).pipe(map((value:any)=>{
      console.log(value);

      let cp = []
       for (let i = 0; i < value.length; i++) {

         cp.push({
           "value":i+1,
           "actividad": value[i].actividad,
           "nationId": value[i].value
         })
       }
       console.log(cp);

        return cp;
    }));
  }

  getNations() {
    return of([
      {
        value: null,
        label: ' -- '
      },
      {
        value: "Comercio",
        label: '1'
      },
      {
        value: "Produccion",
        label: '2'
      },
      {
        value: "Servicio",
        label: '3'
      }
    ]);
  }



  async ejecucionServicio(bj) {

    let respuesta;
    await this.getCnbv(bj).toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));
    console.log(respuesta);

    return respuesta;
  }

  getCities(c: any = null) {


    console.log(this.ejecucionServicio(c));




    const arr =  [
      {
        value: null,
        label: ' -- ',
        acti: null
      },
      {
        value: 1,
        label: 'PAPELERÍA',
        acti: "Comercio"
      },
      {
        value: 12,
        label: 'POLLOS / MENUDO',
        acti: "Comercio"
      },
      {
        value: 2,
        label: 'PROD. DE TORTAS Y QUESADILLAS',
        acti: "Produccion"
      },
      {
        value: 21,
        label: 'PROD. Y VENTA DE HORNOS Y VITRINAS',
        acti: "Produccion"
      },
      {
        value: 3,
        label: 'San Francisco',
        acti: "Servicio"
      }
    ]

    return of(arr
     .filter(entry => {
        if (c) {
          return entry.acti === c;
        } else {
          return true;
        }
      })
    );
  }


}



