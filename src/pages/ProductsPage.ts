import { Page } from "@playwright/test";
import FrameworkHelpers from "../helpers/FrameworkUtility";

export default class ProductPage extends FrameworkHelpers{

    linkBackPackCategory:string = ".filter-options-content>ol>li>a:nth-child(1)";
    linkBagMenu:string = "//ol[@class='items']/li/a";
    linkClearAll: string = ".action clear filter-clear>a";
    linkSortAscending: string = "a[title='Set Ascending Direction']";
    linkSortDescending: string = "a[title='Set Descending Direction']";
    linkToLists: string = "//div[@class='messages']/descendant::a";
    backPackCount: string = ".filter-options-content>ol>li>a:nth-child(1)>span";
    dropDownSortOrder: string = "#sorter";
    textProductDescription:string = "//div[@class='product attribute description']/div/p";
    buttonAddToCart:string = "#product-addtocart-button";
    iconAddToWishList:string = "//span[text()='Add to Wish List']/..";
    iconAddToCompare: string = "//span[text()='Add to Compare']/..";
    iconShowCart: string = "//a[@class='action showcart']";
    inputQuantity:string = "#qty";
    textCartQuantity:string = ".counter qty>span:nth-child(1)";
    buttonProceedToCheckOut: string = "#top-cart-btn-checkout";
    textItemCount: string = ".count";
    textItemPrice: string = ".price";
    textCartCount: string = ".counter-number";
    viewCartSection: string = "#minicart-content-wrapper";



    helper = new FrameworkHelpers(this.page);
    constructor(public page: Page) {
        super(page);  
    }

    async clearFilterIfExists(){

        const exists:boolean = await this.page.isVisible(this.linkClearAll);
        if(exists){
            await this.page.click(this.linkClearAll);
        }
    }

    async clickAscendingOrderSort(){
        await this.page.click(this.linkSortAscending);
    }

    async clickDescendingOrderSort(){
        await this.page.click(this.linkSortDescending);
    }

    async selectMenu(menu:string){

        const menuItem:string = "//span[text()='"+menu+"']/..";
        await this.page.click(menuItem);       
    }
    async selectSubMenu(){
        await this.page.click(this.linkBagMenu);  
    }
    async selectShoppingOptions(option:string){
        const optionMenu:string = "//div[text()='"+option+"']/..";
        await this.clearFilterIfExists();
        await this.page.click(optionMenu);
    }
    async selectCategory(){
        await this.page.click(this.linkBackPackCategory);
    }
    async sortBy(sortOrder:string){
        await this.page.click(this.dropDownSortOrder);
        await this.helper.selectItemFromDropDown(this.dropDownSortOrder,sortOrder);
        await this.page.waitForNavigation({waitUntil:'networkidle'});
    }
    async selectProduct(index:string){
        const productName = "//ol[@class='products list items product-items']/li["+index+"]";
        await this.page.click(productName);
    }
    async getProductDescription(): Promise<string>{
        const productDescription = await this.helper.getInnerTextValue(this.textProductDescription);
        return productDescription;
    }
    async clickAddToCart(){
        await this.page.click(this.buttonAddToCart,{delay:2});
    }
    async clickGoToCart(){
        await this.page.locator(this.iconShowCart).scrollIntoViewIfNeeded();
        await this.page.waitForSelector(this.iconShowCart,{state:'visible'});
        await this.page.click(this.iconShowCart);
    }
    async getCartSuccessMessage(): Promise<string>{
        const cartMessage = await this.helper.getInnerTextValue(this.textSuccessMessage)
        return cartMessage;
    }
    async getCartCount(): Promise<string>{
        const cartCount = await this.helper.getInnerTextValue(this.textCartCount);
        return cartCount;
    }
    async getWishListHeader(): Promise<string>{
        return await this.helper.getInnerTextValue(this.textFormTitle);  
    }
    async getCompareListSuccessMessage(): Promise<string>{
        return await this.helper.getInnerTextValue(this.textFormTitle);  
    }
    async clickToShoppingCart(){
        await this.page.click(this.linkToLists);
        await this.page.waitForLoadState('networkidle');
    }
    async clickToCompareList(){
        await this.page.click(this.linkToLists);
        await this.page.waitForLoadState('networkidle');
    }
    async getCheckoutItemCount(){
        const checkoutCount = await this.helper.getInnerTextValue(this.textItemCount);
        return checkoutCount;
    }
    async getCheckoutPrice(){
        const checkoutPrice = await this.helper.getInnerTextValue(this.textItemPrice);
        return checkoutPrice;
    }
    async clickProceedToCheckOut(){
        await this.page.locator(this.viewCartSection).waitFor({state:'visible'});
        await this.page.click(this.buttonProceedToCheckOut,{strict:true});
    }
    async clickAddToWishList(){
        await Promise.all([
            await this.page.locator(this.iconAddToWishList).waitFor({state:'visible'}),
            await this.page.click(this.iconAddToWishList)
        ]);
        await this.page.waitForLoadState('networkidle');
    }
    async clickAddToCompareList(){
        await Promise.all([
            await this.page.locator(this.iconAddToCompare).waitFor({state:'visible'}),
            await this.page.click(this.iconAddToCompare)
        ]);
        await this.page.waitForLoadState('networkidle');
    }
    async getWishListSuccessMessage(): Promise<string>{
        await Promise.all([
            await this.page.waitForSelector(this.textFormTitle,{state:'visible'})
        ]);
        return await this.helper.getInnerTextValue(this.textSuccessMessage);
        
    }
    async enterQuantity(quantity:string){
        const quantityField = this.page.locator(this.inputQuantity);
        quantityField.click();
        await quantityField.evaluate(node=>node.setAttribute('value','null'));
        await this.page.type(this.inputQuantity,quantity);
    }
}