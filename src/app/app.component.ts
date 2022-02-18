import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig, FormlyField } from '@ngx-formly/core';
import { DataService } from './core/data.service';
import { switchMap, startWith } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  form = new FormGroup({});

  fields: FormlyFieldConfig[] = [
    {
      key: 'id'
    },
    {
      key: 'cat',
      type: 'my-autocomplete',
      // type: 'select', // <select>
      templateOptions: {
        label: 'cataogo',
        options: this.dataService.getNations()
      }
    },
    {
      key: 'cityId',
      type: 'select', // <select>
      templateOptions: {
        label: 'respuesta',
        options: []
      },
      hideExpression: model => !model.s,
      hooks: {
        onInit: (field: FormlyFieldConfig) => {
          field.templateOptions.options = field.form
            .get('cat')
            .valueChanges.pipe(
              switchMap(nationId => this.getCities(nationId))
            );
        }
      }
    },
    {
      key: 'ip',
      type: 'input',
      templateOptions: {
        label: 'IP Address',
        required: true
      },
      validators: {
        // validation: ['ip']
        ip2: {
          expression: c => !c.value || /(\d{1,3}\.){3}\d{1,3}/.test(c.value),
          message: (errorr, field: FormlyFieldConfig) =>
            `"${field.formControl.value}" is not valid`
        }
      }
    }
  ];

  constructor(private dataService: DataService) {}

  onSubmit({ valid, value }) {
    console.log(value);
  }

  ngOnInit(): void {
      this.dataService.getCnbv('Produccion').subscribe(res=>{
       // console.log(res);
      })
  }


  getCities(c: any = null) {


    let oo = this.dataService.ejecucionServicio(c)
    console.log(this.dataService.ejecucionServicio(c));
    console.log(oo['__zone_symbol__value']);





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
