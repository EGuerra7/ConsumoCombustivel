import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import {  MatInputModule  } from '@angular/material/input';
import {  MatSelectModule } from '@angular/material/select';
import {  MatFormFieldModule  } from '@angular/material/form-field';
import {  MatDividerModule  } from '@angular/material/divider';
import {  provideNativeDateAdapter  } from '@angular/material/core';
import { Abastecimento } from '../model/abastecimento.model';
import { AbastecimentoService } from '../service/abastecimento.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CombustivelService } from '../service/combustivel.service';
import { CondutorService } from '../service/condutor.service';
import { VeiculoService } from '../service/veiculo.service';
import { Condutor } from '../model/condutor.model';
import { Veiculo } from '../model/veiculo.model';
import { Combustivel } from '../model/combustivel.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-abastecimento',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatDividerModule, CommonModule, ReactiveFormsModule],
  templateUrl: './abastecimento.component.html',
  styleUrl: './abastecimento.component.css'
})
export class AbastecimentoComponent implements OnInit{

  listaDeAbastecimentos: Abastecimento[] = [];
  listaDeCondutores: Condutor[] = [];
  listaDeVeiculos: Veiculo[] = [];
  listaDeCombustivel: Combustivel[] = [];

  abastecimentoForm: FormGroup = new FormGroup({
    data: new FormControl(null, Validators.required),
    hora: new FormControl(null, Validators.required),
    condutor: new FormControl(null, Validators.required),
    placaVeiculo: new FormControl("", Validators.required),
    combustivel: new FormControl(null, Validators.required),
    quilometragem: new FormControl("", Validators.required),
    preco: new FormControl(0.0, Validators.required),
    valorTotal: new FormControl(0, Validators.required),
  })

  constructor(
    private abastecimentoService: AbastecimentoService,
    private condutorService: CondutorService,
    private veiculoService: VeiculoService,
    private combustivelService: CombustivelService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
      this.listarAbastecimentos();
      this.listarCondutores();
      this.listarVeiculos();
      this.listarCombustiveis();
  }

  registrarAbastecimento(){

    if(this.abastecimentoForm.valid){

      const abastecimento: Abastecimento = this.abastecimentoForm.value;

      console.log(abastecimento.data);

      this.abastecimentoService.registrarAbastecimento(abastecimento).subscribe(response => {
        this.cdr.detectChanges();
        this.listarAbastecimentos();
        this.abastecimentoForm.reset();
        let msg = "Veículo: " + abastecimento.placaVeiculo;
        this.showSuccess(msg);
      }, erro => {
        this.showError('Erro ao enviar o abastecimento!');
      })
    } else {
      this.showError("Preencha todos os campos corretamente.");
    }
  }

  listarAbastecimentos() {
    this.abastecimentoService.listarAbastecimentos().subscribe(data => {
      this.listaDeAbastecimentos = data;
    })
  }

  listarCondutores(){
    this.condutorService.listarCondutor().subscribe(response => {
      this.listaDeCondutores = response.filter(condutor => condutor.ativo);
    })
  }

  listarVeiculos(){
    this.veiculoService.listarVeiculo().subscribe(response => {
      this.listaDeVeiculos = response;
    })
  }

  listarCombustiveis(){
    this.combustivelService.listarCombustivel().subscribe(response => {
      this.listaDeCombustivel = response;
    })
  }

  showSuccess(msg: string) {
    this.toastr.success(msg, 'Abastecimento Registrado!');
  }

  showError(msg: string) {
    this.toastr.error(msg, "Erro");
  }
}
