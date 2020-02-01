export default function transformProducts(
  categories: INames
): ICategory[] {
    return categories && Object.keys(categories).map((categoryId: string): ICategory => {
      const categoryIdToNumber = Number(categoryId);

      return {
        id: categoryIdToNumber,
        name: categories[categoryIdToNumber].G,
        products: Object.keys(categories[categoryIdToNumber].B).map(category => parseInt(category, 10))
      };
    });
}
