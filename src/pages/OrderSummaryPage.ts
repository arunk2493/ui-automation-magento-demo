import { Page } from "@playwright/test";
import FrameworkHelpers from "../helpers/FrameworkUtility";

export default class OrderSummaryPage extends FrameworkHelpers{

    textOrderSummaryTitle: string = ".title";
    textItemCountInSummary: string = ".block items-in-cart active>div>strong>span";
    textItemNameInSummary: string = ".product-item-details>strong>a";
    textQuantityInSummary: string = ".details-qty>span:nth-child(2)";
    textSummaryCartPrice: string = ".cart-price>span";
    textShippingCost: string = ".row>td:nth-child(2)>span>span";
    textShippingMethod: string = ".row>td:nth-child(3)";
    textShippingCarrier: string = ".row>td:nth-child(4)";
    textGrandTotal: string = "//tr[@class='grand totals']/descendant::span";
    textAddressInfo: string = ".shipping-information-content";
    textAddressInfoRegion: string = ".shipping-information-content>span";
    textAddressInfoPhoneNumber: string = ".shipping-information-content>a:nth-child(1)";
    textOrderNumber: string = "//div[@class='checkout-success']/descendant::strong";

    textShippingAddressStreet: string = "div[name='shippingAddress.street.0']";
    textShippingAddressCity: string = "div[name='shippingAddress.city']";
    dropDownShippingAddressRegion: string = "div[name='shippingAddress.region_id']";
    textShippingAddressPincode: string = "div[name='shippingAddress.postcode']";
    textShippingddressPhone: string = "div[name='shippingAddress.telephone']";

    radioButtonShippingMethod: string = ".table-checkout-shipping-method>tbody>tr:nth-child(1)>td>input";

    buttonPlaceOrder: string = "//button[@title='Place Order']";
    buttonNext: string = "//span[text()='Next']/..";
    
    buttonProceedToCheckOut: string = "//span[text()='Proceed to Checkout']/..";
    checkBoxSameBillingShipping: string = "#billing-address-same-as-shipping-checkmo";
    textBillingAddressSame: string = "//div[@class='checkout-billing-address']/descendant::span"


    helper = new FrameworkHelpers(this.page);
    constructor(public page:Page) {   
        super(page);
    }

    async getShoppingSummaryTitle(): Promise<string>{
        return await this.helper.getInnerTextValue(this.textFormTitle);
    }

    async getSummaryItemCount(): Promise<string>{
        return await this.helper.getInnerTextValue(this.textItemCountInSummary);
    }
    async getSummaryItemName(): Promise<string>{
        return await this.helper.getInnerTextValue(this.textItemNameInSummary);
    }
    async getSummaryText(): Promise<string>{
        return await this.helper.getInnerTextValue(this.textOrderSummaryTitle);
    }
    async getSummaryQuantity(): Promise<string>{
        return await this.helper.getInnerTextValue(this.textQuantityInSummary);
    }
    async getSummaryCartPrice(): Promise<string>{
        return await this.helper.getInnerTextValue(this.textSummaryCartPrice);
    }
    async getShippingCost(): Promise<string>{
        return await this.helper.getInnerTextValue(this.textShippingCost);
    }
    async getShippingMethod(): Promise<string>{
        return await this.helper.getInnerTextValue(this.textShippingMethod);
    }
    async getShippingCarrier(): Promise<string>{
        return await this.helper.getInnerTextValue(this.textShippingCarrier);
    }
    async getAddressDetails(): Promise<string>{
        const addressDetails = await this.helper.getInnerTextValue(this.textAddressInfo);
        const addressDetailsRegion = await this.helper.getInnerTextValue(this.textAddressInfoRegion);
        const addressInfo = addressDetails+" "+addressDetailsRegion+" ";
        return addressInfo;
    }
    async getGrandTotal(): Promise<string>{
        return await this.helper.getInnerTextValue(this.textGrandTotal);
    }
    async getOrderSuccessMessage(): Promise<string>{
        await this.page.waitForSelector(this.textFormTitle,{state:'visible'});
        await this.page.waitForLoadState('networkidle');
        return await this.helper.getInnerTextValue(this.textFormTitle);
        
    }
    async getOrderNumber(): Promise<string>{
        await Promise.all([
            await this.page.waitForLoadState('networkidle'),
            await this.page.waitForSelector(this.textOrderNumber,{state:'visible'})
        ]);
        return await this.helper.getInnerTextValue(this.textOrderNumber);
    }
    async getBillingAddressSame(): Promise<string>{
        await Promise.all([
            await this.page.locator(this.textBillingAddressSame).waitFor()
        ])
        return await this.helper.getInnerTextValue(this.textBillingAddressSame);
    }
    async clickNextButton(){

        await Promise.all([
            await this.page.waitForSelector(this.buttonNext,{state:'visible'}),
            await this.page.click(this.buttonNext)
        ]);  
    }
    async clickProceedToCheckOut(){
        await Promise.all([
            await this.page.locator(this.buttonProceedToCheckOut).waitFor(),
            await this.page.click(this.buttonProceedToCheckOut)
        ]);
        await this.page.waitForLoadState('networkidle');
    }
    async clickPlaceOrder(){
        await Promise.all([
            await this.page.locator(this.buttonPlaceOrder).waitFor(),
            await this.page.click(this.buttonPlaceOrder)
        ])
        await this.page.waitForLoadState('networkidle');
    }
    async clickOptions(){
        await this.page.click(this.helper.buttonOptionsIcon);
    }
    async clickSignOut(){
        await this.clickOptions();
        await this.page.click(this.linkSignOut);
    }
    async checkAddressAreSame(): Promise<boolean>{
        return await this.page.isChecked(this.checkBoxSameBillingShipping);  
    }
    async enterStreetValue(value:string){
        await this.page.type(this.textShippingAddressStreet,value);
    }
    async enterCityValue(value:string){
        await this.page.type(this.textShippingAddressCity,value);
    }
    async enterZipCodeValue(value:string){
        await this.page.type(this.textShippingAddressPincode,value);
    }
    async enterTelephoneValue(value:string){
        await this.page.type(this.textShippingddressPhone,value);
    }
    async selectStateDropDown(value:string){
        await this.helper.selectItemFromDropDown(this.dropDownShippingAddressRegion,value);
    }
    async toggleShippingMethod(){
        await this.page.waitForLoadState('networkidle');
        await this.helper.toggleOnRadioOrCheckBox(this.radioButtonShippingMethod);
    }
    async enterAddressDetails(street:string,city:string,state:string,zipcode:string,phone:string){
        await this.enterStreetValue(street);
        await this.enterCityValue(city);
        await this.selectStateDropDown(state);
        await this.enterZipCodeValue(zipcode);
        await this.enterTelephoneValue(phone);
        await this.toggleShippingMethod();
    }
}