import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty()
    title: string;

    @ApiProperty({required: false})
    description: string;

    @ApiProperty()
    price: number;
}
