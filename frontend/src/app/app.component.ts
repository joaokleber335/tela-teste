import { MarcaService } from './services/marca.service';
import { SexoService } from './services/sexo.service';
import { CidadeService } from './services/cidade.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  public nomeCidade = new FormControl('');
  public sexo = new FormControl('');
  public marca = new FormControl('');

  public cidades = [];
  public sexos = [];
  public marcas = [];

  public tipoPerguntas: any[] = [
    { value: 1, nome: 'Única' },
    { value: 2, nome: 'Multiplas' },
  ];

  public estruturaPerguntas: any[] = [
    { value: 1, nome: 'Vertival' },
    { value: 2, nome: 'Horizontal' },
  ];

  public listRodizio = [
    { value: 1, nome: 'Linha' },
    { value: 2, nome: 'Coluna' },
    { value: 3, nome: 'Subcapítulo' },
    { value: 4, nome: 'Perguntas capítulo' }
  ];

  public perguntas = [
    { value: 1, nome: 'Q1' },
    { value: 2, nome: 'Q2' },
    { value: 3, nome: 'Q3' },
    { value: 4, nome: 'Q4' },
    { value: 4, nome: 'Q5' }
  ];

  public marcasFavoritas = [];


  @ViewChild('accordion') accordion?: MatAccordion;

  constructor(
    private formBuilder: FormBuilder,
    private cidadeService: CidadeService,
    private sexoService: SexoService,
    private marcaService: MarcaService,
  ) {
    this.openAllPanels();
  }
  ngOnInit(): void {
    this.getCidades();
    this.getSexos();
    this.getMarcas();
  }

  public openAllPanels() {
    if (!this.accordion) { return }
    this.accordion.openAll();
  }

  public dropItem(list: Array<any>, event: CdkDragDrop<string[]>) {
    moveItemInArray(list, event.previousIndex, event.currentIndex);
  }

  public async getCidades() {
    debugger;
    const res = await this.cidadeService.getAllCidades();
    if (res && res.result.length > 0) {
      this.cidades = [];
      for (const cidade of res.result) {
        let obj: any = {};
        obj.value = parseInt(cidade.ID_CIDADE);
        obj.nome = cidade.NOME;
        this.cidades.push(obj);
      }
    }
  }

  public async postCidade() {
    if (this.nomeCidade.value !== '') {
      const body = {
        nome: this.nomeCidade.value
      };
      const res = await this.cidadeService.postCidade(body);
      if (res && res.result.status) {
        this.nomeCidade.setValue('');
        this.getCidades();
      }
    }
  }

  public async deleteCidade(idCidade) {
    const res = await this.cidadeService.deleteCidade(idCidade);
    if (res && res.result.status) {
      this.getCidades();
    }
  }

  public async getSexos() {
    const res = await this.sexoService.getAllSexos();
    if (res && res.result.length > 0) {
      this.sexos = [];
      for (const sexo of res.result) {
        let obj: any = {};
        obj.value = parseInt(sexo.ID_SEXO);
        obj.nome = sexo.NOME;
        this.sexos.push(obj);
      }
    }
  }

  public async postSexo() {
    if (this.sexo.value !== '') {
      const body = {
        nome: this.sexo.value
      };
      const res = await this.sexoService.postSexo(body);
      if (res && res.result.status) {
        this.sexo.setValue('');
        this.getSexos();
      }
    }
  }

  public async deleteSexo(idSexo) {
    const res = await this.sexoService.deleteSexo(idSexo);
    if (res && res.result.status) {
      this.getSexos();
    }
  }

  public async getMarcas() {
    const res = await this.marcaService.getAllMarcas();
    if (res && res.result.length > 0) {
      this.marcas = [];
      for (const marca of res.result) {
        let obj: any = {};
        obj.value = parseInt(marca.ID_MARCA);
        obj.nome = marca.NOME;
        obj.principal = marca.PRINCIPAL;
        obj.favorita = marca.FAVORITA;
        this.marcas.push(obj);
      }
      this.marcasFavoritas = this.marcas.slice();
    }
  }

  public async postMarca() {
    if (this.marca.value !== '') {
      const body = {
        nome: this.marca.value
      };
      const res = await this.marcaService.postMarca(body);
      if (res && res.result.status) {
        this.marca.setValue('');
        this.getMarcas();
      }
    }
  }

  public async setMarcaPrincipal(idMarca, principal) {
    const body = {
      principal: principal === '1' ? '0' : '1'
    };
    const res = await this.marcaService.setMarcaPrincipal(idMarca, body);
    if (res && res.result.status) {
      this.getMarcas();
    }
  }

  public async setMarcaFavorita(idMarca, favorita) {
    const body = {
      favorita: favorita === '1' ? '0' : '1'
    };
    const res = await this.marcaService.setMarcaFavorita(idMarca, body);
    if (res && res.result.status) {
      this.getMarcas();
    }
  }

  public async deleteMarca(idMarca) {
    const res = await this.marcaService.deleteMarca(idMarca);
    if (res && res.result.status) {
      this.getMarcas();
    }
  }
}
