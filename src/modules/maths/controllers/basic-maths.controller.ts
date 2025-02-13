import { Controller, Get } from '@nestjs/common';
import { BasicMathsService } from '../services/basic-maths.service';

@Controller('api/basic-maths')
export class BasicMathsController {
  constructor(private readonly basicMathsService: BasicMathsService) {}

  @Get('additions')
  async getAdditions() {
    const response = await this.basicMathsService.additions();
    return response;
  }
}
