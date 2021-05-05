import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import {
  CategoriesOutput,
  ProductOutput,
  ProductsOutput,
} from './dto/output.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Categories } from './entities/categories.entity';
import { Product } from './entities/products.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly products: Repository<Product>,
    @InjectRepository(Categories)
    private readonly categories: Repository<Categories>,
  ) { }

  async getAll(page = 1, pageSize = 15): Promise<ProductsOutput> {
    try {
      let hasNext = true;
      const dataList = await this.products.find();
      if (dataList.length <= page * pageSize) {
        hasNext = false;
      }

      if (page === 0 && pageSize === 0) {
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

  async create(productData: CreateProductDto, categoryIds?: number[]) {
    try {

      const product = this.products.create(productData);
      if (categoryIds) {
        const arr = await this.inputCategory(categoryIds);
        product.categories = arr;
      }

      const created = await this.products.save(product);
      return true;
    } catch (e) {
      console.log('error');
      return false;
    }
  }

  async inputCategory(categoryId: number[]): Promise<Categories[]> {
    try {
      const categories = [];
      for (const data of categoryId) {
        const category = await this.categories.findOne(data);
        console.log('length : ' + categoryId.length);
        categories.push(category);
        console.log(category.categoryName);
      }
      return categories;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteOne(id: number): Promise<void> {
    try {
      await this.products.delete(id);
    } catch (e) {
      console.log('error');
    }
  }

  async update(id: number, updateData: UpdateProductDto): Promise<void> {
    try {
      const arr = await this.inputCategory(updateData.categoryIds);
      updateData.categories = arr;
      updateData.id = id;
      console.log(updateData.categories);
      await this.products.save({
        ...updateData,
      });
    } catch (e) {
      console.log(e);
      console.log('service error');
    }
  }
}
