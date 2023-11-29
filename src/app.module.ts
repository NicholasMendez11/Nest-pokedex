import { join } from 'path'; //Este modulo es de nodejs
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { JoiValidationSchema } from './config/joi.validation';
// import { EnvConfiguration } from './config/env.config';

@Module({
  imports: [
    // Modules are imported always here
    ConfigModule.forRoot({
      // load: [EnvConfiguration], //Se carga el modulo de configuracion para mapear las variables de entorno //!NO ES TAN NECESARIO SI ESTAS USANDO JOI VALIDATION SCHEMA
      validationSchema: JoiValidationSchema, //Se carga el esquema de validacion de las variables de entorno
    }), //Importamos el modulo de configuracion SIEMPRE AL TOP DE LOS IMPORTS
    PokemonModule,
    CommonModule,
    SeedModule,
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: 'pokemonsdb', //?Podriamos poner esto en una variable de entorno para que sea mas configurable
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule {}
