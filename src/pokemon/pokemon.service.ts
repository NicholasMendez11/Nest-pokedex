import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) //Aqui se inyecta el modelo de mongoose
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    //Grabar en base de dato
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto); // como el createPokemonDto ya esta validado, se puede crear el pokemon en la base de datos
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(search: string) {
    let pokemon: Pokemon;
    if (!isNaN(+search))
      pokemon = await this.pokemonModel.findOne({ no: +search });

    //Mongo ID
    if (!pokemon && isValidObjectId(search))
      pokemon = await this.pokemonModel.findById(search);

    //Nombre
    if (!pokemon)
      pokemon = await this.pokemonModel.findOne({
        name: search.toLowerCase().trim(),
      });
    //Not found
    if (!pokemon) throw new NotFoundException(`Pokemon ${search} not found`); //Si no se encontro el pokemon, se lanza una excepcion

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term); //Si esto no lanza una excepcion, quiere decir que el pokemon existe
    updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    try {
      if (updatePokemonDto.name)
        await pokemon.updateOne(updatePokemonDto, { new: true }); //Se actualiza el pokemon y el new:true es para que devuelva el pokemon actualizado
    } catch (error) {
      this.handleExceptions(error);
    }

    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }

  async remove(id: string) {
    const { acknowledged, deletedCount } = await this.pokemonModel.deleteOne({
      _id: id,
    });

    if (deletedCount === 0)
      throw new NotFoundException(`Pokemon ${id} not found`);

    return acknowledged;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      //Si el error es de duplicidad
      throw new BadRequestException(
        `El pokemon ${JSON.stringify(error.keyValue)} ya existe`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create pokemon - Check server logs`,
    );
  }
}
