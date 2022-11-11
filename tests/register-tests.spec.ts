import test, { expect } from "@playwright/test";
import RegisterPage from "../src/pages/RegisterPage";

test.describe("Add to Cart Test",async()=>{
    test("Register_User",async({page,baseURL})=>{
        const registerPage = new RegisterPage(page);
        await page.goto(`${baseURL}`);
        await registerPage.clickCreateAccount();
        const a = await registerPage.getFormTitle();
        console.log(a);
    })
})