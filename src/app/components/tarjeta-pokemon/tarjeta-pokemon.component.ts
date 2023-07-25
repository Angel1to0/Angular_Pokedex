import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { Resultado } from 'src/app/interfaces/pokeapi';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-tarjeta-pokemon',
  templateUrl: './tarjeta-pokemon.component.html',
  styleUrls: ['./tarjeta-pokemon.component.scss']
})
export class TarjetaPokemonComponent implements OnChanges{

  constructor(private pokemonService: PokemonService){}

  ngOnChanges():void{
    this.extraerInformacion();
  }

  /**Esto permite que este componente reciba informacion desde su padre, osea Home */
  @Input() data?: Resultado;

  @Input() seleccionado:boolean = false;

  @Output() clickeado = new EventEmitter<string>();
  //Variable para obtener el numero del pokemon
  id:string = "0";

  extraerInformacion(){
    if(this.data){
      this.id = this.data.url.substring(34,this.data.url.length-1);
    }
  }
}
