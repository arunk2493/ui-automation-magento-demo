import test, { expect } from "@playwright/test";
import LoginPage from "../src/pages/LoginPage";
import OrderSummaryPage from "../src/pages/OrderSummaryPage";
import ProductPage from "../src/pages/ProductsPage";

test.describe("Order Submission",async()=>{
    const alreadyUserMail="arunk2493@gmail.com";
    const password = "Welcome@2023";
    
    test.beforeEach(async({page,baseURL})=>{
        await page.goto(`${baseURL}`);
    })

    test("Place order from existing user",async({page})=>{
        const productPage = new ProductPage(page);
        const orderSummaryPage = new OrderSummaryPage(page);
        const quantity = "2";
        const loginPage = new LoginPage(page);
        
        await loginPage.loginUser();
        expect(await loginPage.getInnerTextValue(loginPage.textFormTitle)).toEqual('Customer Login');
        await loginPage.enterLoginDetails(alreadyUserMail,password);
        expect(await loginPage.getLoginWelcomeMessage()).toEqual('Welcome, ArunKumar Kumaraswamy!');

        await productPage.selectMenu("Gear");
        await productPage.selectSubMenu();
        await productPage.clickDescendingOrderSort();
        await productPage.selectProduct("1");
        const description = await productPage.getProductDescription();
        console.log("Product Description:"+description);
        await productPage.enterQuantity(quantity);
        await productPage.clickAddToCart();
        
        expect(await productPage.getCartSuccessMessage()).toContain('You added Push It Messenger Bag to your');
        expect(await productPage.getCartCount()).toEqual(quantity);
        
        await productPage.clickToShoppingCart();
        
        expect(await orderSummaryPage.getSummaryItemName()).toEqual('Push It Messenger Bag');
        expect(await orderSummaryPage.getGrandTotal()).toEqual('$90.00');
        
        await orderSummaryPage.clickProceedToCheckOut();
        await orderSummaryPage.toggleShippingMethod();
        await orderSummaryPage.clickNextButton();
        
        expect(await orderSummaryPage.getBillingAddressSame()).toEqual("My billing and shipping address are the same");
        expect(await orderSummaryPage.checkAddressAreSame()).toBeTruthy();
        
        await orderSummaryPage.clickPlaceOrder();
        const successMessage = await orderSummaryPage.getOrderSuccessMessage(); 
        console.log(successMessage+" : "+" Your order id is: "+await orderSummaryPage.getOrderNumber());        

    });
    test("Add product to wishlist",async({page})=>{
        const productPage = new ProductPage(page);
        const quantity = "2";
        const loginPage = new LoginPage(page);
        
        await loginPage.loginUser();
        expect(await loginPage.getInnerTextValue(loginPage.textFormTitle)).toEqual('Customer Login');
        await loginPage.enterLoginDetails(alreadyUserMail,password);
        expect(await loginPage.getLoginWelcomeMessage()).toEqual('Welcome, ArunKumar Kumaraswamy!');

        await productPage.selectMenu("Gear");
        await productPage.selectSubMenu();
        await productPage.clickDescendingOrderSort();
        await productPage.selectProduct("1");
        const description = await productPage.getProductDescription();
        console.log("Product Description:"+description);
        await productPage.enterQuantity(quantity);
        await productPage.clickAddToWishList();
        
        expect(await productPage.getWishListHeader()).toEqual('My Wish List');
        expect(await productPage.getWishListSuccessMessage()).toContain('Push It Messenger Bag has been added to your Wish List. Click');     

    });
    test("Add products to Compare List",async({page})=>{
        const productPage = new ProductPage(page);
        const quantity = "2";
        const loginPage = new LoginPage(page);
        
        await loginPage.loginUser();
        expect(await loginPage.getInnerTextValue(loginPage.textFormTitle)).toEqual('Customer Login');
        await loginPage.enterLoginDetails(alreadyUserMail,password);
        expect(await loginPage.getLoginWelcomeMessage()).toEqual('Welcome, ArunKumar Kumaraswamy!');

        await productPage.selectMenu("Gear");
        await productPage.selectSubMenu();
        await productPage.clickDescendingOrderSort();
        await productPage.selectProduct("1");
        await productPage.clickAddToCompareList();
        expect(await productPage.getCompareListSuccessMessage()).toContain('Push It Messenger Bag');

        await productPage.selectMenu("Gear");
        await productPage.selectSubMenu();
        await productPage.clickDescendingOrderSort();
        await productPage.selectProduct("2");
        await productPage.clickAddToCompareList();
        expect(await productPage.getCompareListSuccessMessage()).toContain('Overnight Duffle');

        await productPage.clickToCompareList();
        expect(await productPage.getInnerTextValue(productPage.textFormTitle)).toContain('Compare Products');     

    });
    test.afterEach(async({page})=>{
        await page.close();
    })
})