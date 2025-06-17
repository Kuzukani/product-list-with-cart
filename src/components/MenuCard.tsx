type MenuCardType = {
  id: number;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;

  value: number;
  handlePlusClick: (id: number) => void;
  handleMinusClick: (id: number) => void;
  handleAddToCartClick: (id: number) => void;
  handleMinusToCartClick: (id: number) => void;
};

import "./MenuCard.css";
import svg from "../assets/images/icon-add-to-cart.svg";
import minus from "../assets/images/icon-decrement-quantity.svg";
import plus from "../assets/images/icon-increment-quantity.svg";

const MenuCard = (props: MenuCardType) => {
  return (
    <>
      <div className="container">
        <img
          src={"src/" + props.image.desktop}
          alt={props.name}
          className={
            props.value == 0
              ? "w-full rounded-lg"
              : "w-full rounded-lg outline-3 outline-orange-700 border-orange-700"
          }
        />
        {props.value == 0 ? (
          <button
            className="px-4 py-3 border-1 border-orange-700 rounded-full bg-white flex justify-center font-medium text-sm cursor-pointer menuCard"
            onClick={() => {
              props.handlePlusClick(props.id);
              props.handleAddToCartClick(props.id);
            }}
          >
            <img src={svg} alt="add to cart" className="mr-2" />
            Add to cart
          </button>
        ) : (
          <button className="px-4 py-3 border-1 border-orange-700 rounded-full bg-orange-700 flex justify-between font-medium text-sm cursor-pointer text-white menuCard">
            <img
              src={minus}
              alt="minus"
              className="rounded-full border-1 p-1 w-[20px] h-[20px]"
              onClick={() => {
                props.handleMinusClick(props.id);
                props.handleMinusToCartClick(props.id);
              }}
            />
            {props.value}
            <img
              src={plus}
              alt="plus"
              className="rounded-full border-1 p-1"
              onClick={() => {
                props.handlePlusClick(props.id);
                props.handleAddToCartClick(props.id);
              }}
            />
          </button>
        )}

        <p className="text-sm text-gray-400">{props.category}</p>
        <p className="font-medium">{props.name}</p>
        <p className="text-orange-700 font-medium">${props.price.toFixed(2)}</p>
      </div>
    </>
  );
};
export default MenuCard;
