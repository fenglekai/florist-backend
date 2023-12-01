import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class GoodsDTO {
  @ApiProperty()
  @Rule(RuleType.string().required())
  name: string;

  @ApiProperty()
  @Rule(RuleType.string().required())
  description: string;

  @ApiProperty()
  @Rule(RuleType.number().required())
  price: number;

  @ApiProperty()
  @Rule(RuleType.number().required())
  like_num: number;

  @ApiProperty({ example: 1 })
  @Rule(RuleType.number().required())
  cate: number;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'number',
    },
    example: [1],
  })
  @Rule(RuleType.array().items(RuleType.number()).required())
  static_table: number[];
}

export class IdsDTO {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'number',
    },
    example: [1],
  })
  ids: number[];
}
