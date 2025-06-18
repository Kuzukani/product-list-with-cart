type CartConfirmType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  cart: {
    id: number;
    quantity: number;
  }[];
  handleCartConfirmResetClick: () => void;
};

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import data from "../../shared/data.json";
import orderConfirmIcon from "../assets/images/icon-order-confirmed.svg";

export default function CartConfirm({
  open,
  setOpen,
  cart,
  handleCartConfirmResetClick,
}: CartConfirmType) {
  const totalPrice = cart.reduce((sum, item) => {
    const found = data.find((d) => d.id === item.id);
    return found ? sum + found.price * item.quantity : sum;
  }, 0);

  return (
    <div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mt-3 text-left sm:mt-0 sm:ml-4">
                  <img
                    src={orderConfirmIcon}
                    alt="confirm order icon"
                    className="mb-2"
                  />
                  <DialogTitle as="h3" className="text-3xl font-bold">
                    Order Confirmed
                  </DialogTitle>
                  <div className="mt-2 mb-4">
                    <p className="text-sm text-gray-500">
                      We hope you enjoy your food!
                    </p>
                  </div>
                  {cart.map((el) => {
                    const specificData = data.filter((specific) => {
                      return specific.id == el.id;
                    });
                    return (
                      <div className="flex items-center justify-between py-4 border-b-1 border-gray-100 mx-4">
                        <div className="flex">
                          <img
                            src={specificData[0].image.thumbnail}
                            className="w-[50px] h-[50px] rounded-sm mr-2"
                            alt={specificData[0].name}
                          />
                          <div>
                            <p className="font-bold">{specificData[0].name}</p>
                            <div className="flex gap-4">
                              <p className="font-bold text-orange-700">
                                {el.quantity}x
                              </p>
                              <p className="text-gray-400">
                                @${specificData[0].price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>

                        <p className="font-bold">
                          ${(el.quantity * specificData[0].price).toFixed(2)}
                        </p>
                      </div>
                    );
                  })}
                  <div className="flex justify-between items-center my-4">
                    <p className="">Order Total</p>
                    <h4 className="text-3xl font-bold">
                      ${totalPrice.toFixed(2)}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    handleCartConfirmResetClick();
                  }}
                  className="w-full rounded-full bg-orange-700 px-3 py-3 my-2 text-sm font-semibold text-white cursor-pointer"
                >
                  Start New Order
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
