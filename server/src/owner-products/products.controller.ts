//owner-Products.controller.ts
import {
  Controller,
  Get,
  Put,
  Request,
  Delete,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  NotFoundException,
} from '@nestjs/common'; // Import Logger
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { GoogleService } from 'src/auth/google.service';

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
      console.log('product_name==', productName);
      console.log('created_at==', date);
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      console.log(email);
      if (searchTerm || productType || productName || date) {
        const filteredProducts = await this.ProductsService.searchProducts(
          email,
          searchTerm,
          productName,
          date,
          page,
          productType,
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
  async updateProductById(@Param('id') id: string, @Body() productData: any) {
    try {
      const updatedProduct = await this.ProductsService.updateProductById(
        id,
        productData
      );

      if (!updatedProduct) {
        return { message: 'Product not found' };
      }

      return updatedProduct;
    } catch (error) {
      console.log(error);
      return { error: 'An error occurred' };
    }
  }

  @Post('create')
  async createProduct(@Body() productData: any, @Request() req) {
    try {
      console.log(productData);
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);

      const result = await this.ProductsService.createProduct(
        email,
        productData
      );

      return result; // If successful, return the created product
    } catch (error) {
      if (error.message === 'User has already associated with this product.') {
        // Return a specific response when the error message matches
        return {
          message: 'User has already associated with this product.',
          status: 'error',
        };
      } else {
        console.log(error);
        // Handle other errors or rethrow if needed
        throw error;
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
