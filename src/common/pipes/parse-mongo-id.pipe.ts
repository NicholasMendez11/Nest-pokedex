import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
//? LOS PIPS TRANSFORMAN LA DATA
@Injectable()
//Todos los pips deben implementar el PipeTransform
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: any) {
    if (!isValidObjectId(value))
      throw new BadRequestException(`${value} is not a valid Mongo id`);
    return value;
  }
}
