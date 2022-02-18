import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CodigoService {

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY3VkSWQiOiJ6WE9WTXBkRENzaGhJaFVnMWZ4MG1rZnEtOW00QXVfWTUxbkQyVF9UUU1hOS11QWNiMWF6c3pMS1JnZ2FrVk1KQ05jN0lqdFQxMzRDb0NidFZ4X085UzdqSjRxcFJmTEJKQjdpamQ1SHBfLXVyY19EdEhqcmstcGxTc3Z1NHZxZyIsInRpbWVzcGFuIjoiNjM3ODA3MzM5OTg0MDQyNzQzIiwiZXhwIjoxNjQ1MjQ1MTk4fQ.U4RC0-2iMghwa041JqQvreAvbo7cQzXqu-zfhZ4j-YE`
    }),
    //observe: "response" as "body",
    params: new HttpParams()
  };

  constructor(
    private http: HttpClient
  ) { }

  getCnbv(cc):Observable<any>{
    const uri = `https://192.168.101.182:6001/IntegrationService/integration/common/catalogCNBV/${cc}/Individual`;
    return this.http.get<any>(uri, this.httpOptions).pipe(map((value:any)=>{
      console.log(value);

      let cp = []
       for (let i = 0; i < value.length; i++) {
         console.log(i+1);
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

    async ejecucionServicio(nationId) {
    let respuesta;
    await this.getCnbv(nationId).toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));
    return respuesta;
  }
}
