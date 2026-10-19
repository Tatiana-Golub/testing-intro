const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
 describe('по возрастанию', () => {
    test("сортирует все товары по возрастанию цены при направлении 'asc'", () => {
      const result = sortProductsByPrice(products, 'asc');
      expect(result.map((product) => product.id)).toEqual([3, 6, 5, 4, 2, 1]);
    });

    test('сортирует все товары по возрастанию цены, если направление не указано', () => {
      const result = sortProductsByPrice(products);
      expect(result.map((product) => product.id)).toEqual([3, 6, 5, 4, 2, 1]);
    });

    test("сортирует товары с id [1, 3, 4] по возрастанию при направлении 'asc'", () => {
      const selected = products.filter(({ id }) => [1, 3, 4].includes(id));
      const result = sortProductsByPrice(selected, 'asc');
      expect(result.map((product) => product.id)).toEqual([3, 4, 1]);
    });
  });

  describe('по убыванию', () => {
    test("сортирует все товары по убыванию цены при направлении 'desc'", () => {
      const result = sortProductsByPrice(products, 'desc');
      expect(result.map((product) => product.id)).toEqual([1, 2, 4, 5, 6, 3]);
    });

    test("сортирует товары с id [3, 1, 4] по убыванию при направлении 'desc'", () => {
      const selected = products.filter(({ id }) => [3, 1, 4].includes(id));
      const result = sortProductsByPrice(selected, 'desc');
      expect(result.map((product) => product.id)).toEqual([1, 4, 3]);
    });

    test("сортирует товары с id [5, 2, 6] по убыванию при направлении 'desc'", () => {
      const selected = products.filter(({ id }) => [5, 2, 6].includes(id));
      const result = sortProductsByPrice(selected, 'desc');
      expect(result.map((product) => product.id)).toEqual([2, 5, 6]);
    });
  });

  describe('исходный массив не меняется', () => {
    test("не меняет исходный массив [1, 3, 4] при направлении 'asc'", () => {
      const selected = products.filter(({ id }) => [1, 3, 4].includes(id));
      sortProductsByPrice(selected, 'asc');
      expect(selected.map((product) => product.id)).toEqual([1, 3, 4]);
    });

    test("не меняет исходный массив [1, 3, 4] при вызове с 'desc'", () => {
      const selected = products.filter(({ id }) => [1, 3, 4].includes(id));
      sortProductsByPrice(selected, 'desc');
      expect(selected.map((product) => product.id)).toEqual([1, 3, 4]);
    });

    test('не меняет исходный массив всех товаров, если направление не указано', () => {
      sortProductsByPrice(products);
      expect(products.map((product) => product.id)).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
