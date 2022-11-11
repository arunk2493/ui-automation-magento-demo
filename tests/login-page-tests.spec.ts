import test, { expect } from "@playwright/test";
import LoginPage from "../src/pages/LoginPage";
import RegisterPage from "../src/pages/RegisterPage";

test.describe("Login Test suite",()=>{
    test("Login with registered user",async({page,baseURL})=>{

        const loginPage = new LoginPage(page);
        const alreadyUserMail="arunk2493@gmail.com";
        const password = "Welcome@2023";

        await page.goto(`${baseURL}`);

        await loginPage.loginUser();
        expect(await loginPage.getInnerTextValue(loginPage.textFormTitle)).toEqual('Customer Login');
        await loginPage.enterLoginDetails(alreadyUserMail,password);
        expect(await loginPage.getLoginWelcomeMessage()).toEqual('Welcome, ArunKumar Kumaraswamy!');
    });
})