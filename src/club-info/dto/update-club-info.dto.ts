import { PartialType } from '@nestjs/mapped-types';

import { CreateClubInfoDto } from './create-club-info.dto';

export class UpdateClubInfoDto extends PartialType(CreateClubInfoDto) {}
