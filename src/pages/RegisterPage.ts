import {Page} from "@playwright/test";
import FrameworkHelpers from "../helpers/FrameworkUtility";
export default class RegisterPage extends FrameworkHelpers{
    textFirstName:string = "#firstname"
    textLastName:string = "#lastname";
    checkBoxIsSubscribed:string = "#is_subscribed";
    textEmailAddress:string = "#email_address";
    textPassword:string = "#password";
    textConfirmPassword:string = "#password-confirmation";
    buttonCreateAccount:string = "//button[@class='action submit primary']";
    textAccountInformation:string = ".block-content>div>div:nth-child(2)";
    textPasswordMeter:string = "#password-strength-meter-label";

    helper = new FrameworkHelpers(this.page);

    constructor(public page: Page){
        super(page);
    }

    async clickCreateAccount(){
        await this.page.click(this.linkCreateAccount);
    }
    async enterFirstName(firstName: string){
        await this.page.type(this.textFirstName,firstName,{delay:100});
    }
    async enterLastName(lastName: string){
        
        await this.page.type(this.textLastName,lastName);
    }
    async isNewsLetterSubscribed(){
        await this.page.setChecked(this.checkBoxIsSubscribed,true);
    }
    async enterMailAddress(mailId: string){
        await this.page.type(this.textEmailAddress,mailId);
    }
        
    async enterPassword(password: string){
        await this.page.type(this.textPassword,password);
    }

    async confirmPassword(confirmPassword:string){
        await this.page.type(this.textConfirmPassword,confirmPassword);
    }
    async clickCreateAccountButton(){
        await this.page.click(this.buttonCreateAccount)
    }
    async  getFormTitle(): Promise<string>{
         
         const title = await this.helper.getInnerTextValue(this.textFormTitle)
         return title;

    }
    async getAccountInformation(): Promise<string>{
        const accountInformation = await this.helper.getInnerTextValue(this.textAccountInformation);
        return accountInformation;
    }
    async getPasswordMeter(): Promise<string>{
        const passwordStrength = await this.helper.getInnerTextValue(this.textPasswordMeter);
        return passwordStrength;
    }
    async getSuccessMessage(): Promise<string>{
        await this.page.waitForSelector(this.textSuccessMessage);
        const successMessage = await this.helper.getInnerTextValue(this.textSuccessMessage)
        return successMessage;
    }

}