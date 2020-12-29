import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http: HttpClient) { }

  async getAllMarcas(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.get(url + '/marca/').subscribe(
        (res: any) => {
          resolve(res);
        }, (err: any) => {
          reject(err);
        })
    })
  };

  async postMarca(body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.post(url + '/marca/', body).subscribe(
        (res: any) => {
          resolve(res);
        }, (err: any) => {
          reject(err);
        })
    })
  };

  async setMarcaPrincipal(id: any, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.put(url + `/marca/principal/${id}`, body).subscribe(
        (res: any) => {
          resolve(res);
        }, (err: any) => {
          reject(err);
        })
    })
  };

  async setMarcaFavorita(id: any, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.put(url + `/marca/favorita/${id}`, body).subscribe(
        (res: any) => {
          resolve(res);
        }, (err: any) => {
          reject(err);
        })
    })
  };

  async deleteMarca(id): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.delete(url + `/marca/${id}`).subscribe(
        (res: any) => {
          resolve(res);
        }, (err: any) => {
          reject(err);
        })
    })
  };
}
