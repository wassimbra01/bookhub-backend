import { Body, ConflictException, Controller, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
    @Inject(AuthorService)
    private authService : AuthorService;
    
    @Get('all')
    async recupererTousLesAuteurs() {
        try {
            let tab = await this.authService.getAllAuthors();
            return tab
            
        }
        catch(err) {
            throw new ConflictException();
        }
    }
    
    @Post('add')
    async ajouterAuteur(@Body() body) {
        try {
            let data = this.authService.addAuthor(body);
            return data
            
        }
        catch(err) {
            throw new ConflictException();
        }
    }

     @Put('edit/:id')
  async modifierAuteur(
    @Param('id') id: number,
    @Body() body
  ) {
    try {
      return await this.authService.updateAuthor(id, body);
    } catch (err) {
      throw new ConflictException();
    }
  }
}
