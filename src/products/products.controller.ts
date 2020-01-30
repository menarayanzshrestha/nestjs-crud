import { Controller, Post, Body, Get, Param, Patch, Delete  } from '@nestjs/common';
import  { ProductService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productService : ProductService) {

    }

    @Post()
    addProduct(
        @Body('title') propTitle : string, 
        @Body('description') prodDesc: string , 
        @Body('price') prodPrice: number 
    ): any{
        const generateId =  this.productService.insertProduct(propTitle, prodDesc, prodPrice);
        return { id : generateId };
    }

    @Get()
    getAllProducts() {
        return this.productService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId : string) {
        return this.productService.getSingleProduct(prodId);
    }
    
    @Patch(':id')
    updateProduct(
        @Param('id') prodId : string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ){
        this.productService.patchData(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    deleteProduct(@Param('id') prodId: string){
        this.productService.deleteProduct(prodId);
        return null;
    }
}