import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class UserDTO {
  @ApiProperty({
    type: 'string',
    example: 'test123',
  })
  @Rule(RuleType.string().required())
  username: string;

  @ApiProperty({
    type: 'string',
    example: '123456',
  })
  @Rule(RuleType.string().required())
  password: string;
}
