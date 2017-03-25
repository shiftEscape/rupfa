import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import Makes from './makes/makes'
import Models from './models/models'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

@Injectable()
export class DataService {
  private url: string = 'https://autosure.mybluemix.net/api/makes'
  private url2: string = 'https://autosure.mybluemix.net/api/models'
  private url3: string = 'https://autosure.mybluemix.net/api/compute'
  constructor(private http: Http) { }

  getMakes(): Observable<Makes[]> {
    return this.http.get(this.url)
    .map(x => x.json());
  }

  getModels(...args): Observable<Models[]> {
    const [make] = args
    const data = {where:{car_make:make}}
    const where: string = (args.length > 0) ? `?filter=${JSON.stringify(data)}` : ''
    return this.http.get(this.url2.concat(where)).map(x => x.json());
  }

  getCompute(...args): Observable<any> {
    const [year, value] = args
    const where: string = `{"year":"${year}","value":"${value}"}`
    return this.http.get(this.url3.concat("?data=").concat(where)).map(x => x.json());
  }

}
