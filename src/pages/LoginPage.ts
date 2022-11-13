import { expect, Page } from "@playwright/test";
import FrameworkHelpers from "../helpers/FrameworkUtility";

export default class LoginPage extends FrameworkHelpers{
    inputEmailId:string = "#email";
    inputPassword:string = "#pass";
    buttonSignIn:string = "#send2";

    helpers = new FrameworkHelpers(this.page);

    constructor(public page: Page){
        super(page);
    }

    async loginUser(){
        await this.page.click(this.linkSignIn);
    }
    async enterLoginDetails(emailId:string,password:string){
        await this.page.type(this.inputEmailId,emailId,{delay:100});
        await this.page.type(this.inputPassword,password);
        await this.page.click(this.buttonSignIn);
    }
    async enterExistingLoginDetails(emailId:string,password:string){
        await this.loginUser();
        await this.page.type(this.inputEmailId,emailId,{delay:100});
        await this.page.type(this.inputPassword,password);
        await this.page.click(this.buttonSignIn);
    }
    async getLoginWelcomeMessage():Promise<string>{
        const welcomeMessage = await this.helpers.getInnerTextValue(this.textGreetMessage);
        return welcomeMessage;
    }

    


}