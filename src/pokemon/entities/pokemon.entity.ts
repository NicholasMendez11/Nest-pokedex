import { Document } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

// Se recomienda que las entidades siempre sea una clase para poder agregar logica de negocio
//Usualmente las entendidades hacen una relacion con las tablas de la base de datos o Collections(Mongo db)

@Schema() // los schema son de mongoose y se usan para definir la estructura de la base de datos
export class Pokemon extends Document {
  //Para que esto sea considerado un documento en mi colleccion tiene que extender de la clase Document que viene de mongoose
  // id:string ya mongoose se encarga de crear el id
  @Prop({ unique: true, index: true }) //Esto es para que el nombre sea unico y que se cree un indice para que las busquedas sean mas rapidas
  name: string;
  @Prop({ unique: true, index: true })
  no: number; //Numero del pokemon
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon); //SchemaFactory es una clase de mongoose que nos permite crear un schema a partir de una clase
