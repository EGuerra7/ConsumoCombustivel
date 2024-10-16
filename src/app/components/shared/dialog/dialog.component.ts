import { Veiculo } from './../../model/veiculo.model';
import { CombustivelService } from './../../service/combustivel.service';
import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CondutorService } from '../../service/condutor.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Condutor } from '../../model/condutor.model';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { VeiculoService } from '../../service/veiculo.service';
import { Combustivel } from '../../model/combustivel.model';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {

  isVeiculo!: boolean;
  isCondutor!: boolean;

  condutorForm!: FormGroup;

  veiculoForm!: FormGroup;

  ListaDeCombustivel: Combustivel[] = [];

  combustivelForm: FormGroup = new FormGroup({
    tipo: new FormControl("", Validators.required)
  })

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tipo: string, item?: any, isEdit: boolean },
    private condutorService: CondutorService,
    private veiculoService: VeiculoService,
    private combustivelService: CombustivelService,
    private toastr: ToastrService
  ) {

    this.isVeiculo = this.data.tipo === 'Veículo';
    this.isCondutor = this.data.tipo === 'Condutor';

    const item = this.data.item || {};

    this.condutorForm = new FormGroup({
      nome: new FormControl(this.isCondutor ? item.nome || "" : "", Validators.required),
      ativo: new FormControl(this.isCondutor ? item.ativo : false)
    });

    this.veiculoForm = new FormGroup({
      tipo: new FormControl(this.isVeiculo ? item.tipo || "" : "", Validators.required),
      marca: new FormControl(this.isVeiculo ? item.marca || "" : "", Validators.required),
      placa: new FormControl(this.isVeiculo ? item.placa || "" : "", Validators.required),
      tipoCombustivel: new FormControl(this.isVeiculo ? item.tipoCombustivel || null : null),
      capacidadeTanque: new FormControl(this.isVeiculo ? item.capacidadeTanque || 0 : 0)
    });
  }

  ngOnInit(): void {
    this.listarCombustivel();
  }


  listarCombustivel(){
    this.combustivelService.listarCombustivel().subscribe( data => {
      this.ListaDeCombustivel = data;
    })
  }


  cadastrar(tipo: string){
    if (tipo === 'Condutor') {
      if (this.condutorForm.valid) {
        const condutor: Condutor = this.condutorForm.value;

        if (this.data.isEdit) {

          const condutorAtualizado = {
                ...this.condutorForm.value,
                id: this.data.item.id
          };

          this.condutorService.editarCondutor(condutorAtualizado).subscribe(response => {
            let msg = "Condutor " + condutor.nome + " editado!";
            this.showSuccess(msg);
            this.dialogRef.close();
          }, erro => {
            this.showError("Erro ao editar o condutor!");
          });

        } else {

          this.condutorService.cadastrarCondutor(condutor).subscribe(response => {
            let msg = "Condutor " + condutor.nome + " cadastrado!";
            this.showSuccess(msg);
            this.dialogRef.close();
          }, erro => {
            this.showError("Erro ao cadastrar o condutor!");
          });
        }
      } else {
        this.showError("Preencha todos os campos corretamente.");
      }

    } else if (tipo == 'Veículo') {

      if(this.veiculoForm.valid){
        const veiculo: Veiculo = this.veiculoForm.value;

        if (this.data.isEdit){
          this.veiculoService.editarVeiculo(veiculo).subscribe(response => {
            let msg = "Veículo " + veiculo.marca + " editado!";
            this.showSuccess(msg);
            this.dialogRef.close();
          }, erro => {
            this.showError("Erro ao editar o veículo!");
          })
        } else {
          this.veiculoService.registrarVeiculo(veiculo).subscribe(response => {
            let msg = "Veículo " + veiculo.marca + " cadastrado!";
            this.showSuccess(msg);
            this.dialogRef.close();
          }, erro =>{
            this.showError("Erro ao cadastrar o veículo!");
          })
        }
      } else {
        this.showError("Preencha todos os campos corretamente.");
      }

    } else if (tipo == 'Combustível'){

      if(this.combustivelForm.valid){
        const combustivel: Combustivel = this.combustivelForm.value;

        this.combustivelService.registrarCombustivel(combustivel).subscribe(response => {
          let msg = "Combustível " + combustivel.tipo + " cadastrado!";
          this.showSuccess(msg);
          this.dialogRef.close();
        }, erro => {
          this.showError("Erro ao cadastrar o combustível!");
        })
      } else {
        this.showError("Preencha todos os campos corretamente.");
      }

    }

  }

  ativar(){
    const controleAtivo = this.condutorForm.get('ativo');

  if (controleAtivo) {
    console.log("Valor de ativo alterado para:", controleAtivo.value);
  }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showSuccess(msg: string) {
    this.toastr.success(msg);
  }

  showError(msg: string) {
    this.toastr.error(msg, "Erro");
  }
}
