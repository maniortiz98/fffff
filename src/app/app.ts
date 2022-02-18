import { CodigoService } from './core/codigo.service';
export class AppComponentCustom{
constructor(private codigoService:CodigoService){
}

async ejecucionServicio(nationId) {
  let respuesta;
  await this.codigoService.getCnbv(nationId).toPromise().then((response) => {
    respuesta = response;
  }).catch(e => console.error(e));
  return respuesta;
}

}
