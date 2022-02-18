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
  model = {
    id: 123123,
    firstname: 'Juri',
    age: 34,
    nationId: 1,
    cityId: 1,
    ip: null
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'id'
    },
    {
      key: 'nationId',
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
      expressionProperties: {
        'templateOptions.disabled': model => !model.nationId,
        'model.cityId': '!model.nationId ? null : model.cityId'
      },
      hideExpression: model => !model.nationId,
      hooks: {
        onInit: (field: FormlyFieldConfig) => {
          field.templateOptions.options = field.form
            .get('nationId')
            .valueChanges.pipe(
              startWith(this.model.nationId),
              switchMap(nationId => this.dataService.getCities(nationId))
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

  getCities(v: any = null) {



    const arr =  [
      {
        value: null,
        label: ' -- ',
        nationId: null
      },
      {
        value: 1,
        label: 'BOTANAS Y FRITOS',
        nationId: "Comercio"
      },
      {
        value: 12,
        label: 'PAPELERÍA',
        nationId: "Comercio"
      },
      {
        value: 2,
        label: 'Berlin',
        nationId: 2
      },
      {
        value: 21,
        label: 'Munich',
        nationId: 2
      },
      {
        value: 3,
        label: 'San Francisco',
        nationId: 3
      }
    ]

    return of(arr
     .filter(entry => {
        if (v) {
          return entry.nationId === v;
        } else {
          return true;
        }
      })
    );
  }
}
