import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.dto';
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

  let categoryRepository: Partial<
    Record<keyof Repository<Category>, jest.Mock>
  >;

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
    categoryRepository = module.get(getRepositoryToken(Category));
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

  describe('getCategory', () => {
    const getCategoryResult: Category = {
      id: 1,
      categoryName: '',
    };

    it('should found categories', async () => {
      categoryRepository.find.mockResolvedValue(getCategoryResult);
      const result = await productService.getCategory(getCategoryResult.id);

      expect(categoryRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        ok: true,
        data: getCategoryResult,
      });
    });

    it('should fail if occurred error', async () => {
      categoryRepository.find.mockRejectedValue(new Error());
      const result = await productService.getCategory(getCategoryResult.id);

      expect(categoryRepository.find).toHaveBeenCalled();
      expect(result).toEqual({
        ok: false,
        error: Error(),
      });
    });
  });

  describe('getSearch', () => {
    const getSearchResult = {
      id: 1,
      name: 'user',
      price: '',
      image: '',
      web: '',
    };

    it('should found search product', async () => {
      productRepository.find.mockResolvedValue(getSearchResult);
      const result = await productService.getSearch('test');

      expect(productRepository.find).toHaveBeenCalled();
      expect(result).toEqual({
        ok: true,
        data: getSearchResult,
      });
    });

    it('should fail if occurred error', async () => {
      productRepository.find.mockRejectedValue(new Error());
      const result = await productService.getSearch('test');

      expect(productRepository.find).toHaveBeenCalled();
      expect(result).toEqual({
        ok: false,
        error: Error(),
      });
    });
  });

  describe('create', () => {
    const createProductInput: CreateProductInput = {
      name: '',
      price: 1,
      image: '',
      web: '',
      categoryIds: [1, 2],
    };

    const inputCategoryResult: Category[] = [
      {
        id: 1,
        categoryName: '',
      },
    ];

    it('should create new product', async () => {
      productRepository.create.mockReturnValue(createProductInput);
      productService.inputCategory = jest.fn(async () => inputCategoryResult);
      productRepository.save.mockResolvedValue(createProductInput);

      const result = await productService.create(createProductInput);

      expect(productRepository.create).toHaveBeenCalledTimes(1);
      expect(productRepository.create).toHaveBeenCalledWith(createProductInput);

      expect(productRepository.save).toHaveBeenCalledTimes(1);
      expect(productRepository.save).toHaveBeenCalledWith(createProductInput);

      expect(result).toEqual({
        ok: true,
      });
    });

    it('should fail if ouccrred error', async () => {
      productRepository.create.mockReturnValue(createProductInput);
      productService.inputCategory = jest.fn(async () => inputCategoryResult);
      productRepository.save.mockRejectedValue(new Error());

      const result = await productService.create(createProductInput);

      expect(result).toEqual({
        ok: false,
        error: 'Could not create product',
      });
    });

    it('should fail if not exists category', async () => {
      productRepository.create.mockReturnValue(createProductInput);
      productService.inputCategory = jest.fn(async () => []);

      const result = await productService.create(createProductInput);

      expect(result).toEqual({
        ok: false,
        error: 'Category not found',
      });
    });
  });
});