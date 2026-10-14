const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

describe('searchProducts', () => {
 describe('точное совпадение', () => {
    test("находит товар по запросу 'Наушники'", () => {
      const result = searchProducts(products, 'Наушники');
      expect(result.map((product) => product.id)).toEqual([1]);
    });

    test("находит товар по запросу 'Чистый код'", () => {
      const result = searchProducts(products, 'Чистый код');
      expect(result.map((product) => product.id)).toEqual([6]);
    });

    test("находит товар по запросу 'Настольная лампа'", () => {
      const result = searchProducts(products, 'Настольная лампа');
      expect(result.map((product) => product.id)).toEqual([4]);
    });
  });

  describe('регистр не влияет на поиск', () => {
    test("находит товар по запросу 'javascript'", () => {
      const result = searchProducts(products, 'javascript');
      expect(result.map((product) => product.id)).toEqual([3]);
    });

    test("находит товар по запросу 'ЧЕХОЛ'", () => {
      const result = searchProducts(products, 'ЧЕХОЛ');
      expect(result.map((product) => product.id)).toEqual([5]);
    });

    test("находит товар по запросу 'наушники'", () => {
      const result = searchProducts(products, 'наушники');
      expect(result.map((product) => product.id)).toEqual([1]);
    });
  });

  describe('пустой запрос', () => {
    test('возвращает все товары для пустой строки', () => {
      const result = searchProducts(products, '');
      expect(result.map((product) => product.id)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('возвращает все товары для строки из пробелов', () => {
      const result = searchProducts(products, '   ');
      expect(result.map((product) => product.id)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('возвращает все товары для строки из табуляции и переноса строки', () => {
      const result = searchProducts(products, '\t\n');
      expect(result.map((product) => product.id)).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
