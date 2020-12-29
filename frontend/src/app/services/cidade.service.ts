import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(private http: HttpClient) {
  }

  async getAllCidades(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.get(url + '/cidade/').subscribe(
        (res: any) => {
          resolve(res);
        }, (err: any) => {
          reject(err);
        })
    })
  };

  async postCidade(body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.post(url + '/cidade/', body).subscribe(
        (res: any) => {
          resolve(res);
        }, (err: any) => {
          reject(err);
        })
    })
  };

  async deleteCidade(id): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.delete(url + `/cidade/${id}`).subscribe(
        (res: any) => {
          resolve(res);
        }, (err: any) => {
          reject(err);
        })
    })
  };
}
