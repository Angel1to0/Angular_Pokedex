import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Resultado } from 'src/app/interfaces/pokeapi';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private pokemonService: PokemonService) {}

  /*Esto genera una variable llamadas 'tarjetasElement' que hace referencia al elemento
  tarjetas del home.container.html*/
  @ViewChild('tarjetas') tarjetasElement!: ElementRef;

  listaPokemon: Resultado[] = [];

  pagina: number = 1;
  cargando: boolean = false;
  pokemonSeleccionado?:Pokemon;

  //Esta funcion se ejecuta cuando el componente se carga por primera vez
  ngOnInit(): void {
    this.cargarLista();
    this.pokemonService.getById("1");
  }

  //Funcion
  async cargarLista() {
    this.cargando=true;
    /**Debo acceder al servicio para llamar al metodo get */
    this.listaPokemon = [
      ...this.listaPokemon,
      ...(await this.pokemonService.getByPage(this.pagina)),
    ];
    this.cargando=false;
    this.pagina++;
  }

  onScroll(e: any) {
    if (this.cargando) return;
    console.log(e);
    if (
      Math.round(
        //Si todas las tarjetas, osea 'tarjetasElement',la altura que tiene mas lo que esta scrolleado es igual a la altura de scrolleo total, entonces cargamos la lista
        this.tarjetasElement.nativeElement.clientHeight +
          this.tarjetasElement.nativeElement.scrollTop
      ) === e.srcElement.scrollHeight
    ) {
      this.cargarLista();
    }
  }

  async tarjetaClickeada(id:string){
    this.pokemonSeleccionado = await this.pokemonService.getById(id);
  }
}
