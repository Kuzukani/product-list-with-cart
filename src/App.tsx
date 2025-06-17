type CartStateType = {
  id: number;
  quantity: number;
};

import "./App.css";
import menu from "../shared/data.json";
import MenuCard from "./components/MenuCard";
import Cart from "./components/Cart";
import CartConfirm from "./components/CartConfirm";
import { useEffect, useState } from "react";

function App() {
  const [eachMenu, setEachMenu] = useState<CartStateType[]>([]);
  useEffect(() => {
    const eachMenuObject: CartStateType[] = menu.map((el) => ({
      id: el.id,
      quantity: 0,
    }));
    setEachMenu(() => eachMenuObject);
  }, []);

  const [cart, setCart] = useState<CartStateType[]>([]);
  const [openCartConfirm, setOpenCartConfirm] = useState<boolean>(false);

  //sumMenu for cart all item
  let sumMenu: number = 0;
  eachMenu.forEach((count) => {
    sumMenu += count.quantity;
  });

  const findId = (id: number): number => {
    let fountAtIndex = 0;
    eachMenu.forEach((el, i) => {
      if (el.id == id) {
        fountAtIndex = i;
      }
    });
    return fountAtIndex;
  };

  const handlePlusClick = (id: number) => {
    const previous = [...eachMenu];
    const index = findId(id);
    previous[index].quantity += 1;
    setEachMenu(() => previous);
  };

  const handleMinusClick = (id: number) => {
    const previous = [...eachMenu];
    const index = findId(id);
    previous[index].quantity -= 1;
    setEachMenu(() => previous);
  };

  const handleAddToCartClick = (id: number) => {
    let isInCart = false;
    let fountAtIndex = 0;
    cart.forEach((el, i) => {
      if (id == el.id) {
        isInCart = true;
        fountAtIndex = i;
      }
    });

    if (isInCart) {
      const previous = [...cart];
      previous[fountAtIndex].quantity++;
      setCart(() => previous);
    } else {
      setCart(() => [...cart, { id, quantity: 1 }]);
    }
  };

  const handleMinusToCartClick = (id: number) => {
    let fountAtIndex = 0;
    cart.forEach((el, i) => {
      if (id == el.id) {
        fountAtIndex = i;
      }
    });
    if (cart[fountAtIndex].quantity == 1) {
      const previous = cart.filter((el) => {
        return el.id != id;
      });
      setCart(() => previous);
    } else {
      const previous = [...cart];
      previous[fountAtIndex].quantity--;
      setCart(() => previous);
    }
  };

  const handleRemoveItemClick = (id: number) => {
    const index = findId(id);
    const before = eachMenu;
    before[index].quantity = 0;
    setEachMenu(() => before);

    const previous = cart.filter((el) => {
      return el.id != id;
    });
    setCart(() => previous);
  };

  const handleCartConfirmResetClick = () => {
    setTimeout(() => {
      const resetQuantity = eachMenu.map((el) => {
        return { id: el.id, quantity: 0 };
      });
      setEachMenu(resetQuantity);
      setCart([]);
    }, 250);
  };

  return (
    <>
      <main className="flex flex-col xl:flex-row mt-20 mx-10 lg:mx-20">
        <div className="menu">
          <h1 className="text-4xl font-bold mb-5">Desserts</h1>
          <div className="container-menu">
            {menu.map((el, i) => {
              return (
                <MenuCard
                  key={i}
                  id={el.id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  //above is from json. below is for track count each menu

                  value={eachMenu[i]?.quantity ?? 0}
                  handlePlusClick={handlePlusClick}
                  handleMinusClick={handleMinusClick}
                  handleAddToCartClick={handleAddToCartClick}
                  handleMinusToCartClick={handleMinusToCartClick}
                />
              );
            })}
          </div>
        </div>
        <div className="cart">
          <Cart
            count={sumMenu}
            cart={cart}
            handleRemoveItemClick={handleRemoveItemClick}
            handleCartConfirmClick={setOpenCartConfirm}
          />
        </div>
        <CartConfirm
          open={openCartConfirm}
          setOpen={setOpenCartConfirm}
          cart={cart}
          handleCartConfirmResetClick={handleCartConfirmResetClick}
        />
      </main>
    </>
  );
}

export default App;
