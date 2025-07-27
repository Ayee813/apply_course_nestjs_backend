import { IsNotEmpty, IsString } from 'class-validator';

export class StatusDTO {
  @IsString()
  @IsNotEmpty()
  status: string;
}
