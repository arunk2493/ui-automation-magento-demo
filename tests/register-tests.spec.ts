import test, { expect } from "@playwright/test";
import DataGenerator from "../src/helpers/DataGenerator";
import LoginPage from "../src/pages/LoginPage";
import RegisterPage from "../src/pages/RegisterPage";

/* 
This test suite is used to create a new user and login to the portal
*/
test.describe("Register New User",async()=>{

    const data = new DataGenerator();
    var firstName:string = "";
    var lastName:string = "";
    var password = "";
    var confirmPassword = password;
    var emailId = ""
    var accountInfo = "";

    test.beforeAll(async()=>{
        console.log("----Started Test----")
        firstName = await data.generateName();
        lastName = await data.generateName();
        password = await data.generatePassword();
        confirmPassword = password;
        emailId = firstName+"@mail.com";
        accountInfo = firstName+" "+lastName
    });

    test("Register_User",async({page,baseURL})=>{

        const registerPage = new RegisterPage(page);

        await page.goto(`${baseURL}`);

        await registerPage.clickCreateAccount();
        expect(await registerPage.getFormTitle()).toEqual('Create New Customer Account');

        await registerPage.enterFirstName(firstName);
        await registerPage.enterLastName(lastName);
        await registerPage.isNewsLetterSubscribed();
        await registerPage.enterMailAddress(emailId);
        await registerPage.enterPassword(password);
        await registerPage.confirmPassword(confirmPassword);
        await registerPage.clickCreateAccountButton();
        expect(await registerPage.getAccountInformation()).toContain(accountInfo);
    });

    test("Register_User_Verify_Weak_Password",async({page,baseURL})=>{

        const registerPage = new RegisterPage(page);
        password = await data.generateWeakPassword();
        await page.goto(`${baseURL}`);

        await registerPage.clickCreateAccount();
        expect(await registerPage.getFormTitle()).toEqual('Create New Customer Account');

        await registerPage.enterFirstName(firstName);
        await registerPage.enterLastName(lastName);
        await registerPage.isNewsLetterSubscribed();
        await registerPage.enterMailAddress(emailId);
        await registerPage.enterPassword(password);
        expect(await registerPage.getPasswordMeter()).toEqual('Weak');
    });

    


    test.afterAll(async({page})=>{
        await page.close();
    })

})