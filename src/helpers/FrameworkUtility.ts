import { Page } from "@playwright/test";

export default class FrameworkHelpers{

    textFormTitle:string = "//h1[@class='page-title']//span[1]";
    textSuccessMessage: string = "//div[@class='messages']/div/div";
    textGreetMessage:string = ".logged-in";
    linkCreateAccount:string = "//a[text()='Create an Account']";
    linkSignIn:string = ".authorization-link>a";
    linkSignOut: string = ".customer-menu>ul>li:nth-child(3)>a";
    buttonOptionsIcon = ".action switch";
    imgLoader:string = "//img[@class='loading-mask']";
    
    constructor(public page: Page){}

    async getInnerTextValue(selector:string): Promise<string>{
        await this.page.waitForSelector(selector,{state:'visible',strict:false});
        const innerTextValue = await this.page.innerText(selector);
        return innerTextValue.trim();
    }
    async selectItemFromDropDown(selector:string,selectValue:string){
        await this.page.selectOption(selector,{value:selectValue});
    }
    async toggleOnRadioOrCheckBox(selector: string){
        await this.page.check(selector);
    }
    async selectorVisibility(selector: string){
        await this.page.waitForSelector(selector,{state:'visible'});
    }
}