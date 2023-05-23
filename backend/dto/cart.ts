// import { Transform, Type } from "class-transformer";
import { IsArray, IsMongoId, MinLength } from "class-validator";

export class DeleteCartDtos {
  @IsArray()
  @MinLength(1, {
    each: true,
  })
  @IsMongoId({ each: true })
  ids: string[];
}