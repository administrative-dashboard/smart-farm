// Products.controller.ts
import {
  Controller,
  Get,
  Put,
  Request,
  Delete,
  Post,
  Res,
  Body,
  Param,
  Query,
  UseGuards,
  NotFoundException,
} from '@nestjs/common'; // Import Logger
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { GoogleService } from 'src/auth/google.service';
import { query } from 'express';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(
    private readonly ProductsService: ProductsService,
    private readonly googleService: GoogleService
  ) {}

  @Get()
  async getProduct(
    @Query('q') searchTerm: any,
    @Query('product_name') productName: any,
    @Query('created_at') date: any,
    @Query('page') page: any,
    @Query('description') description: any,
    @Query('product_type') productType: any,
    @Query('perPage') perPage: any,
    @Query('field') field: any,
    @Query('order') order: any,
    @Request() req
  ) {
    try {
      console.log(typeof page);
      page = parseInt(page);
      perPage = parseInt(perPage);
      console.log('page::::===', page);
      console.log('perPage::::===', perPage);
      console.log('ЗАПРОС ПОЛУЧЕН!!!!!!!!!');
      console.log('searchTerm==', searchTerm);
      console.log('product_type==', productType);
      console.log('description==', description);
      console.log('product_name==', productName);
      console.log('created_at==', date);
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      console.log(email);
      if (searchTerm || productType || productName || date || description) {
        const filteredProducts = await this.ProductsService.searchProducts(
          email,
          searchTerm,
          productName,
          productType,
          description,
          date,
          page,
          perPage,
          field,
          order
        );
        console.log(filteredProducts);
        return filteredProducts;
      } else if (page && perPage) {
        const { data, total } = await this.ProductsService.getProductsByEmail(
          email,
          page,
          perPage,
          field,
          order
        );
        return { data, total };
      }
    } catch (error) {
      throw new NotFoundException('Products not found', 'custom-error-code');
    }
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    try {
      const product = await this.ProductsService.getProductById(id);

      if (!product) {
        return { message: 'Product not found' };
      }

      return product;
    } catch (error) {
      console.log(error);
      return { error: 'An error occurred' };
    }
  }

  @Put(':id')
  async updateProductById(
    @Request() req,
    @Param('id') id: string,
    @Body() productData: any,
    @Res() res
  ) {
    console.log('Product Data: ', productData);
    try {
      console.log('Product Data: ', productData);
      const updatedProduct = await this.ProductsService.updateProductById(
        id,
        productData
      );

      if (!updatedProduct) {
        return { message: 'Product not found' };
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      if (
        error.message ===
        'A product with the same name, description, and type already exists'
      ) {
        res.status(400).json({
          message:
            'A product with the same name, description, and type already exists',
          status: 'error',
        });
      } else {
        res.status(500).json({
          message: 'An error occurred.',
          status: 'error',
        });
      }
    }
  }

  @Post('create')
  async createProduct(@Body() productData: any, @Request() req, @Res() res) {
    try {
      console.log(productData);
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);

      const result = await this.ProductsService.createProduct(
        email,
        productData
      );

      res.status(200).json(result);
    } catch (error) {
      if (error.message === 'USER IS ASSOCIATED WITH THE PRODUCT') {
        // Return a specific response when the error message matches
        res.status(400).json({
          message: 'USER IS ASSOCIATED WITH THE PRODUCT',
          status: 'error',
        });
      } else {
        res.status(500).json({
          message: 'An error occurred.',
          status: 'error',
        });
        console.log(error);
      }
    }
  }

  @Delete(':id')
  async deleteProductById(@Param('id') id: string) {
    try {
      const deleted = await this.ProductsService.deleteProductById(id);

      if (!deleted) {
        return { message: 'Product not found' };
      }

      return { message: 'Product deleted successfully' };
    } catch (error) {
      console.log(error);
      return { error: 'An error occurred' };
    }
  }
}
