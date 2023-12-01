import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class CategoryDTO {
  @ApiProperty()
  @Rule(RuleType.string().required())
  name: string;
}
