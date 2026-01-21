import express from "express";
import {
    getMostPurchasedProductsAndQuantitiesInThePreviousYear,
    getWhoPlacedTheMostOrders,
    getWhoHasTheHighestOrderValue,
    getMostProductItemsOrdered,
    get10BestSellingProducts,
    getMonthlySalesProfitOfPreviousYearProducts,
    getMonthlySalesFiguresInPreviousYearForTheProduct,
    getLastYearCustomerMonthlyOrders,
    getMonthlyOrderValuePerCustomerLastYear,
    getNumberOfCashierMonthlyServicesLastYear
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/getMostPurchasedProducts", getMostPurchasedProductsAndQuantitiesInThePreviousYear);
router.get("/getWhoPlacedTheMostOrders", getWhoPlacedTheMostOrders);
router.get("/getWhoHasTheHighestOrderValue", getWhoHasTheHighestOrderValue);
router.get("/getMostProductItemsOrdered", getMostProductItemsOrdered);
router.get("/get10BestSellingProducts", get10BestSellingProducts);
router.get("/getMonthlySalesProfitOfPreviousYearProducts", getMonthlySalesProfitOfPreviousYearProducts);
router.get("/getMonthlySalesFiguresInPreviousYearForTheProduct", getMonthlySalesFiguresInPreviousYearForTheProduct);
router.get("/getLastYearCustomerMonthlyOrders", getLastYearCustomerMonthlyOrders);
router.get("/getMonthlyOrderValuePerCustomerLastYear", getMonthlyOrderValuePerCustomerLastYear);
router.get("/getNumberOfCashierMonthlyServicesLastYear", getNumberOfCashierMonthlyServicesLastYear);
export default router;