import ingredient from './Ingredient';

export default interface Item_Menu {
    dish_name : string;
    cuisine: string;
    ingredients : ingredient[],
    price: number;
    quantity?: number;
    available?: boolean;
    image_links: string[]
}