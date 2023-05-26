interface IMenuItemsModelAngular {
   
    menuId: String
    resId: String
    menu: [ {
            selected: unknown;
            itemId: String;
            category: String;
            name: String;
            price: number;
            is_veg: boolean;
            ingredients: String;
    }];

}
export default IMenuItemsModelAngular;