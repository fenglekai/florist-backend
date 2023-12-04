import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class StaticTableDTO {
  @ApiProperty()
  @Rule(RuleType.string().required())
  src: string;
}

export class UploadDTO {
  @ApiProperty()
  @Rule(RuleType.string().required())
  user: string;

  @ApiProperty({
    type: 'array',
    items: { type: 'file', format: 'binary' },
  })
  files: any[];
}

export interface FileItem {
  filename: string;
  data: string;
  fieldName: string;
  mimeType: string;
}
