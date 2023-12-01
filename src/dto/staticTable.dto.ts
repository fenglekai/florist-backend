import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class StaticTableDTO {
  @ApiProperty()
  @Rule(RuleType.string().required())
  src: string;
}
