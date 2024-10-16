import { Time } from "@angular/common";
import { Condutor } from "./condutor.model";
import { Combustivel } from "./combustivel.model";

export class Abastecimento{
  id?: number;
  data?: Date;
  hora?: Time;
  condutor?: Condutor ;
  combustivel?: Combustivel;
  quilometragem?: number;
  placaVeiculo?: string;
  litros?: number;
  preco?: number;
  valorTotal?: number;
}
