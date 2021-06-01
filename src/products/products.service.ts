import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Like, Repository } from 'typeorm';
import {
  CreateProductInput,
  CreateProductOutput,
} from './dto/create-product.dto';
import {
  DeleteProductInput,
  DeleteProductOutput,
} from './dto/delete-product.dto';
import {
  CategoriesOutput,
  ProductOutput,
  ProductsOutput,
} from './dto/output.dto';
import {
  UpdateProductInput,
  UpdateProductOutput,
} from './dto/update-product.dto';
import { Category } from './entities/categories.entity';
import { Product } from './entities/products.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly products: Repository<Product>,
    @InjectRepository(Category)
    private readonly categories: Repository<Category>,
  ) {}

  // default page & size
  async getAll(page = 1, pageSize = 15): Promise<ProductsOutput> {
    try {
      let hasNext = true;
      const dataList = await this.products.find();
      if (dataList.length <= page * pageSize) {
        hasNext = false;
      }

      if (!page && !pageSize) {
        return {
          ok: true,
          data: await this.products.find({
            relations: ['categories'],
          }),
          hasNext: hasNext,
        };
      } else {
        return {
          ok: true,
          data: await this.products.find({
            relations: ['categories'],
            skip: (page - 1) * pageSize,
            take: pageSize,
          }),
          hasNext: hasNext,
        };
      }
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

  async getOne(id: number): Promise<ProductOutput> {
    try {
      return {
        ok: true,
        data: await this.products.findOne(id, { relations: ['categories'] }),
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

  // 특정 카테고리에 속한 products들 출력
  async getCategory(id: number): Promise<CategoriesOutput> {
    try {
      return {
        ok: true,
        data: await this.categories.find({
          where: {
            id: id,
          },
          relations: ['products'],
        }),
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

  async getSearch(keyword: string): Promise<ProductsOutput> {
    try {
      return {
        ok: true,
        data: await this.products.find({
          name: Like(`%${keyword}%`),
        }),
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

  async create(
    createProductInput: CreateProductInput,
  ): Promise<CreateProductOutput> {
    try {
      const product = this.products.create(createProductInput);
      if (createProductInput.categoryIds) {
        const arr = await this.inputCategory(createProductInput.categoryIds);
        if (arr.length === 0) {
          return {
            ok: false,
            error: 'Category not found',
          };
        }
        product.categories = arr;
      }
      await this.products.save(product);
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not create product',
      };
    }
  }

  async inputCategory(categoryId: number[]): Promise<Category[]> {
    try {
      const categories = [];
      for (const data of categoryId) {
        const category = await this.categories.findOne(data);
        if (!category) {
          console.log(`category number ${data} is not found`);
          return [];
        }
        categories.push(category);
      }
      return categories;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteOne(
    deleteProductInput: DeleteProductInput,
  ): Promise<DeleteProductOutput> {
    try {
      const product = await this.products.findOne(deleteProductInput);
      if (!product) {
        return {
          ok: false,
          error: 'Product not found',
        };
      }
      await this.products.delete(deleteProductInput);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not delete product',
      };
    }
  }

  async update(
    id: number,
    updateData: UpdateProductInput,
  ): Promise<UpdateProductOutput> {
    try {
      const product = await this.products.findOne(id);
      if (!product) {
        return {
          ok: false,
          error: 'Product not found',
        };
      }
      if (updateData.categoryIds) {
        const arr = await this.inputCategory(updateData.categoryIds);
        if (arr.length === 0) {
          return {
            ok: false,
            error: 'Category not found',
          };
        }
        updateData.categories = arr;
      }
      await this.products.save({
        ...product,
        ...updateData,
      });
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not update product',
      };
    }
  }
}
