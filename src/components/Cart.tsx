type CartType = {
  count: number;
  cart: {
    id: number;
    quantity: number;
  }[];
  handleRemoveItemClick: (id: number) => void;
  handleCartConfirmClick: (setOpenCartConfirm: boolean) => void;
};

import "./Cart.css";
import deleteIcon from "../assets/images/icon-remove-item.svg";
import cabonDelivery from "../assets/images/icon-carbon-neutral.svg";
import image from "../assets/images/illustration-empty-cart.svg";
import data from "../../shared/data.json";

const Cart = (props: CartType) => {
  const totalPrice = props.cart.reduce((sum, value) => {
    const found = data.find((d) => d.id === value.id);
    return found ? sum + value.quantity * found.price : sum;
  }, 0);

  return (
    <>
      {props.count == 0 ? (
        <div className="bg-white rounded-lg p-4 xl:p-8">
          <h1 className="text-3xl font-bold text-orange-700">
            Your Cart({props.count})
          </h1>
          <img src={image} alt="empty cart image" className="pt-10 m-auto" />
          <p className="font-bold text-amber-900 text-center">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-4 xl:p-8">
          <h1 className="text-3xl font-bold text-orange-700">
            Your Cart({props.count})
          </h1>
          {props.cart.map((el) => {
            const specificData = data.filter((specific) => {
              return specific.id == el.id;
            });
            return (
              <div className="flex items-center py-4 border-b-1 border-gray-100">
                <div className="w-[90%]">
                  <p className="font-bold mb-2">{specificData[0].name}</p>
                  <div className="flex gap-4">
                    <p className="font-bold text-orange-700">{el.quantity}x</p>
                    <p className="text-gray-400">
                      @${specificData[0].price.toFixed(2)}
                    </p>
                    <p className="font-bold">
                      ${(el.quantity * specificData[0].price).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex w-[10%] justify-end">
                  <img
                    src={deleteIcon}
                    alt="remove item"
                    className="border-1 border-amber-900 p-1 rounded-full cursor-pointer"
                    onClick={() => {
                      props.handleRemoveItemClick(el.id);
                    }}
                  />
                </div>
              </div>
            );
          })}

          <div className="flex justify-between items-center my-10">
            <p className="">Order Total</p>
            <h4 className="text-3xl font-bold">${totalPrice.toFixed(2)}</h4>
          </div>
          <div className="flex justify-center my-10">
            <img src={cabonDelivery} alt="cabon Delivery" />
            <p>
              This is a <span className="font-bold">cabon-neutral</span>{" "}
              Delivery
            </p>
          </div>
          <div>
            <button
              className="rounded-full bg-orange-700 w-full p-4 font-medium text-white cursor-pointer"
              onClick={() => props.handleCartConfirmClick(true)}
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Cart;
