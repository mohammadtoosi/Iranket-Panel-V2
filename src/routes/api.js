const base = "https://app.iranket.com/";

export const seller = {
    add: base + "rest/seller",
};

export const dashboard = base + "rest/sellerdashboard";

export const product = {
    index: base + "rest/sellerproduct",
    indexWithUpdate: base + "rest/sellerproduct/?action=update",
    indexWithUpdateDIDProduct:
        base + "rest/sellerproduct/action?=update&id_product=",
    productWithImage: base + "rest/sellerproductimage",
    productPages:
        base +
        "rest/sellerproduct?submitFilter=false&productFilter_name=&productFilter_price=&productFilter_quantity=&productFilter_active=&orderby=&orderway=&page=",
    productId: base + "rest/sellerproduct?action=update&id_product=",
};

export const invoice = base + "rest/sellerinvoice";

export const orders = {
    orders: base + "rest/sellerorder?action=list",
    order: base + "rest/sellerorder?action=view&id_order=",
    sellerOrder: base + "rest/sellerorder",
};

export const carrier = {
    carrier: base + "rest/sellercarrier",
    getAddForm: base + "rest/sellercarrier?action=add",
};
export const profileSeller = base + "rest/sellerprofile?id_seller=";
export const updateSeller = base + "rest/seller";
export const account = base + "rest/accountInfo";
