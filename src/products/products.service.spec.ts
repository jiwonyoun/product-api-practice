import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import e from 'express';
import { Repository } from 'typeorm';
import { Category } from './entities/categories.entity';
import { Product } from './entities/products.entity';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';

const mockProductRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

const mockCategoryRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
};

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: Partial<Record<keyof Repository<Product>, jest.Mock>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('getAll', () => {
    const getAllResult = [
      {
        id: 1,
        name: 'user',
        price: '',
        image: '',
        web: '',
      },
      {
        id: 2,
        name: 'user',
        price: '',
        image: '',
        web: '',
      },
    ];

    it('should found products', async () => {
      productRepository.find.mockResolvedValue(getAllResult);
      const result = await productService.getAll();

      expect(productRepository.find).toHaveBeenCalledTimes(2);

      expect(result).toEqual({
        ok: true,
        data: getAllResult,
        hasNext: false,
      });
    });

    it('should fail if occurred error', async () => {
      productRepository.find.mockRejectedValue(new Error());
      const result = await productService.getAll();

      expect(result).toEqual({
        ok: false,
        error: Error(),
      });
    });
  });

  describe('getOne', () => {
    const getOneResult = {
      id: 1,
      name: 'user',
      price: '',
      image: '',
      web: '',
    };

    it('should found product', async () => {
      productRepository.findOne.mockResolvedValue(getOneResult);
      const result = await productService.getOne(getOneResult.id);

      expect(productRepository.findOne).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        ok: true,
        data: getOneResult,
      });
    });

    it('should fail if occurred error', async () => {
      productRepository.findOne.mockRejectedValue(new Error());
      const result = await productService.getOne(1);

      expect(result).toEqual({
        ok: false,
        error: Error(),
      });
    });
  });
});
