/* eslint-disable prettier/prettier */
//Este archivo se encarga de obtener los valores de las variables de entorno y exportarlos 
export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'development', //Se obtiene el valor de la variable de entorno NODE_ENV, si no existe, se asigna el valor de development
  mongodb: process.env.MONGODB, //Se obtiene el valor de la variable de entorno MONGODB
  port: process.env.PORT || 3000, //Se obtiene el valor de la variable de entorno PORT, si no existe, se asigna el valor de 3000
});


//Seee JOI VALIDATION SCHEMA IS BETTER