import { Page } from "@playwright/test";

export default class LoginPage{

    linkSignIn:string = ".authorization-link>a";


    constructor(public page: Page){}

    async  getInnerTextValue(selector:string): Promise<string>{
        await this.page.waitForSelector(selector);
        const innerTextValue = await this.page.innerText(selector);
        return innerTextValue;

   }


}