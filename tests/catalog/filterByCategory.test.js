const products = require('../../src/data/products');
const { filterByCategory } = require('../../src/catalog');

describe('filterByCategory', () => {
  describe('все категории', () => {
    test("возвращает все товары для категории 'all'", () => {
      const result = filterByCategory(products, 'all');
      expect(result.map((product) => product.id)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('возвращает все товары, если категория undefined', () => {
      const result = filterByCategory(products, undefined);
      expect(result.map((product) => product.id)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('возвращает все товары для пустой строки', () => {
      const result = filterByCategory(products, '');
      expect(result.map((product) => product.id)).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('существующая категория', () => {
    test("возвращает товары категории 'electronics'", () => {
      const result = filterByCategory(products, 'electronics');
      expect(result.map((product) => product.id)).toEqual([1, 2]);
    });

    test("возвращает товары категории 'books'", () => {
      const result = filterByCategory(products, 'books');
      expect(result.map((product) => product.id)).toEqual([3, 6]);
    });

    test("возвращает товары категории 'home'", () => {
      const result = filterByCategory(products, 'home');
      expect(result.map((product) => product.id)).toEqual([4, 5]);
    });
  });

  describe('несуществующая категория', () => {
    test("возвращает пустой массив для 'clothes'", () => {
      const result = filterByCategory(products, 'clothes');
      expect(result.map((product) => product.id)).toEqual([]);
    });

    test("возвращает пустой массив для 'toys'", () => {
      const result = filterByCategory(products, 'toys');
      expect(result.map((product) => product.id)).toEqual([]);
    });

    test("возвращает пустой массив для 'sports'", () => {
      const result = filterByCategory(products, 'sports');
      expect(result.map((product) => product.id)).toEqual([]);
    });
  });
});
