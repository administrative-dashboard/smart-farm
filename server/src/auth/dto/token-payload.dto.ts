// token-payload.dto.ts
import { IsString, IsEmail, IsInt } from 'class-validator';

export class TokenPayloadDto {
  @IsString()
  readonly email: string;

  @IsInt() 
  readonly id: number; 

  @IsString()
  readonly role: string;

}
