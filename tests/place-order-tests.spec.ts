import test, { expect } from "@playwright/test";
import LoginPage from "../src/pages/LoginPage";
import OrderSummaryPage from "../src/pages/OrderSummaryPage";
import ProductPage from "../src/pages/ProductsPage";

test.describe("Order Submission",async()=>{
    const alreadyUserMail="arunk2493@gmail.com";
    const password = "Welcome@2023";
    
    test.beforeEach(async({page,baseURL})=>{
        const loginPage = new LoginPage(page);
        await page.goto(`${baseURL}`);
        loginPage.enterExistingLoginDetails(alreadyUserMail,password);
    })

    test("Place order from existing user",async({page})=>{
        const productPage = new ProductPage(page);
        const orderSummaryPage = new OrderSummaryPage(page);
        const quantity = "1";

        await productPage.selectMenu("Gear","Bags");
        await productPage.selectShoppingOptions("Style");
        await productPage.selectCategory();
        await productPage.sortBy("name");
        await productPage.selectProduct("1");
        await productPage.getProductDescription();
        await productPage.clickAddToCart();
        expect(productPage.getCartSuccessMessage()).toContain('You added Crown Summit Backpack');
        expect(productPage.getCartCount()).toEqual(quantity);
        await productPage.clickAddToCart();
        expect(productPage.getCheckoutItemCount()).toEqual(quantity);
        expect(productPage.getCheckoutPrice()).toEqual("$38.00");
        await productPage.clickProceedToCheckOut();
        expect(orderSummaryPage.getSummaryItemCount()).toEqual(quantity);
        expect(orderSummaryPage.getSummaryItemName()).toEqual('Crown Summit Backpack');
        expect(orderSummaryPage.getSummaryQuantity()).toEqual(quantity);
        expect(orderSummaryPage.getSummaryCartPrice()).toEqual('$38.00');
        expect(orderSummaryPage.getShippingCost()).toEqual('$5.00');
        expect(orderSummaryPage.getShippingMethod()).toEqual('Fixed');
        expect(orderSummaryPage.getShippingCarrier()).toEqual('Flat Rate');
        await orderSummaryPage.clickNextButton();
        expect(orderSummaryPage.getGrandTotal()).toEqual('$43.00');
        expect(orderSummaryPage.checkAddressAreSame()).toEqual(true);
        expect(orderSummaryPage.getAddressDetails()).toContain('Arunk'+" "+'132324'+" "+'erode,'+" "+'Tamil Nadu'+" "+'638112'+'India'+" "+'1234567890');
        await orderSummaryPage.clickPlaceOrder();
        expect(orderSummaryPage.getOrderSuccessMessage()).toEqual('Thank you for your purchase!');
        console.log("Order Number is:"+ await orderSummaryPage.getOrderNumber());        
        await orderSummaryPage.clickSignOut();

    });
    test.afterEach(async({page})=>{
        await page.close();
    })
})