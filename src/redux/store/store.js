import { configureStore } from "@reduxjs/toolkit";

import ConfirmMobileReducer from "../slice/confirm-mobile";
import CategoryModalReducer from "../slice/category-model";
import CategoryEditModalReducer from "../slice/category-edit-modal";
import FilesReducer from "../slice/files";
import ProductEditReducer from "../slice/product-edit";
import OrdersDetailsReducer from "../slice/orders-details";

export const store = configureStore({
    reducer: {
        confirm: ConfirmMobileReducer,
        category: CategoryModalReducer,
        categoryEdit: CategoryEditModalReducer,
        files: FilesReducer,
        productEdit: ProductEditReducer,
        ordersDetails: OrdersDetailsReducer,
    },
});
