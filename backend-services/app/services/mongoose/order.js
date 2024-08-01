const Order = require("../../api/v1/orders/model");
const Users = require("../../api/v1/users/model");

const getOrders = async (req) => {
    const { id } = req.user;
    const orders = await Order.findOne({ customerId: id }).populate(
        "items.product"
    );

    return orders;
};

const createNewOrder = async (req) => {
    const { id } = req.user;
    const { txnId } = req.body;

    const profile = await Users.findById(id).populate("cart.product");

    if (profile) {
        let amount = 0;
        let cartItems = profile.cart;

        if (cartItems.length > 0) {
            // process order
            cartItems.map((item) => {
                amount += parseInt(item.product.price) * parseInt(item.unit);
            });

            const order = new Order({
                customerId: id,
                amount,
                txnId,
                status: "received",
                items: cartItems,
            });

            profile.cart = [];

            // order.populate("items.product").execPopulate();
            const orderResult = await order.save();

            profile.orders.push(orderResult);

            await profile.save();

            return orderResult;
        }
    }

    return {};
};

module.exports = { getOrders, createNewOrder };
