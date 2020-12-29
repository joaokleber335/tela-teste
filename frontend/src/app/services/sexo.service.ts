import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class SexoService {

  constructor(private http: HttpClient) { }

  async getAllSexos(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.get(url + '/sexo/').subscribe(
        (res: any) => {
          resolve(res);
        }, (err: any) => {
          reject(err);
        })
    })
  };

  async postSexo(body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.post(url + '/sexo/', body).subscribe(
        (res: any) => {
          resolve(res);
        }, (err: any) => {
          reject(err);
        })
    })
  };

  async deleteSexo(id): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.delete(url + `/sexo/${id}`).subscribe(
        (res: any) => {
          resolve(res);
        }, (err: any) => {
          reject(err);
        })
    })
  };
}
