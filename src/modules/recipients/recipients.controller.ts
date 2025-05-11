import { Controller, Get, Body, Param } from '@nestjs/common';
import { RecipientsService } from './recipients.service';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';

@Controller('recipients')
export class RecipientsController {
  constructor(private readonly recipientsService: RecipientsService) {}

  create(@Body() createRecipientDto: CreateRecipientDto) {
    return this.recipientsService.create(createRecipientDto);
  }

  @Get()
  findAll() {
    return this.recipientsService.findAll();
  }

  findOne(@Param('id') id: string) {
    return this.recipientsService.findOne(+id);
  }

  update(
    @Param('id') id: string,
    @Body() updateRecipientDto: UpdateRecipientDto,
  ) {
    return this.recipientsService.update(+id, updateRecipientDto);
  }

  remove(@Param('id') id: string) {
    return this.recipientsService.remove(+id);
  }
}
