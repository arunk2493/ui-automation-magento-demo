import { Page } from "@playwright/test";
import FrameworkHelpers from "../helpers/FrameworkUtility";

export default class ProductPage{

    linkBackPackCategory:string = ".filter-options-content>ol>li>a:nth-child(1)";
    backPackCount: string = ".filter-options-content>ol>li>a:nth-child(1)>span";
    dropDownSortOrder: string = "#sorter";
    textProductDescription:string = ".product attribute description>div>p";


    helper = new FrameworkHelpers(this.page);
    constructor(public page: Page) {
        this.page = page;  
    }

    async selectMenu(menu:string,subMenu:string){
        const menuItem:string = "//span[text()="+menu+"]/..";
        const subMenuItem:string = "//span[text()="+subMenu+"]/..";
        await this.page.hover(menuItem).then(async()=>{
            await this.page.click(subMenu);
        });        
    }
    async selectShoppingOptions(option:string){
        const optionMenu:string = "//div[text()="+option+"]/..";
        await this.page.click(optionMenu);
    }
    async selectCategory(){
        await this.page.click(this.linkBackPackCategory);
    }
    async sortBy(sortOrder:string){
        await this.helper.selectItemFromDropDown(this.dropDownSortOrder,sortOrder);
    }
    async selectProduct(index:string){
        const productName = "//ol[@class='products list items product-items']/li["+index+"]";
        await this.page.click(productName);
    }
    async getProductDetails(): Promise<string>{
        const productDescription = await this.helper.getInnerTextValue(this.textProductDescription);
        return productDescription;
    }
}