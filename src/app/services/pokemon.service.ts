/**Aqui se realizan las llamadas al backend osea los servicios necesarios para
 * obtener los datos necesarios.
 */
import { Injectable } from '@angular/core';
import { Resultado } from '../interfaces/pokeapi';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor() {}

  //Esta funcion regresa un array de Resultado, osea de la interface de pokeApi, y como es asincrono se ocupan promesas
  async getByPage(page: number, size: number = 40): Promise<Resultado[]> {
    if(page > 5) return [];
    const offset = size * (page-1)
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${size}&offset=${offset}`
    );
    const resJson = await res.json();
    //Si se esta obteniendo algun dato de la API entonces regresa un resultado real, si no regresa un vacio
    if (resJson.results.length > 0) return resJson.results;
    return [];
  }

  async getById(id:String): Promise<Pokemon> {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${id}`
      );
    return await res.json();
  }

  getDescripcion() {}
}
