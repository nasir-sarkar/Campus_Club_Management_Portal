import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';
export class PatchMemberDto extends PartialType(CreateMemberDto) {
  name?: string;
  age?: number;
  email?: string;
  phone?: string;
  address?: string;
}
