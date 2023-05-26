//Interface for order model
interface IOrderModel {
    orderId: String;
    resId: String;
    customerId: String;
    orderDate: Date;
    status: String;
    orderType: String;
    quantity: Number;
    itemIds: String[];
}
export {IOrderModel};