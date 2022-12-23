import { Category } from "./category";

export class Products {
    id?: number;
    name: string;
    price: number;
    desc: string;
    isavailable: boolean;
    imgurl: string;
    qty?: number;

    constructor(name: string, price: number, desc: string, isavailable: boolean, imgurl: string, qty?: number, id?: number) {
        this.name = name;
        this.price = price;
        this.desc = desc;
        this.isavailable = isavailable;
        this.imgurl = imgurl;
        this.qty = qty;
        this.id = id;
    }
}
export class ProductsWithCategories {
    id: number;
    name: string;
    price: number;
    desc: string;
    isavailable: boolean;
    imgurl: string;
    category: Category;
    qty: number;

    constructor(name: string, price: number,
        isavailable: boolean, desc?: string,
        imgurl?: string, category?: Category) {
        this.name = name;
        this.price = price;
        this.isavailable = isavailable;
        this.desc = desc;
        this.imgurl = imgurl;
        this.category = category;

    }


}
