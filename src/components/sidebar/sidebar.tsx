import { useContext } from "react";
import { CartItem } from "../cart-item/cart-item";
import { Context } from "@/utils/context";
import { IComic } from "@/interfaces/comics";
import { showSuccessToast } from "@/utils/toast";
import { IComicPurchase } from "@/interfaces/purchases";

interface SidebarProps {
  isVisible: boolean;
  toggleVisibility: () => void;
}

export function Sidebar({ isVisible, toggleVisibility }: SidebarProps) {
  const context = useContext(Context);
  const items = context.getCartItems();

  async function buyItems(items: IComic[]) {
    const purchasedItems: IComicPurchase[] = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        src: item.thumbnail.path + "." + item.thumbnail.extension,
      };
    });
    const rawResponse = await fetch("http://localhost:3000/api/my-purchases/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ purchases: purchasedItems }),
    });

    if (rawResponse.status === 200) {
      context.deleteCartItems();
      showSuccessToast("Items are yours now :)");
    }
  }
  return (
    <div
      id="drawer-navigation"
      className={`fixed top-0 right-0 z-20 w-[22vw] h-full pl-8 pr-5 pt-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 h-full ${
        !isVisible ? "translate-x-[22vw]" : ""
      }`}
      aria-labelledby="drawer-navigation-label"
    >
      <button
        type="button"
        onClick={toggleVisibility}
        data-drawer-hide="drawer-navigation"
        aria-controls="drawer-navigation"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 relative top-2.5 start-2.5 mb-[30px] inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <h5
        id="drawer-navigation-label"
        className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        Cart
      </h5>
      <div className="py-4 overflow-y-auto flex flex-col gap-10 h-[80%] pr-3">
        {items.map((cartComic: IComic) => (
          <CartItem
            src={cartComic.thumbnail.path + "." + cartComic.thumbnail.extension}
            author={
              (cartComic.creators &&
                cartComic.creators.items.length > 0 &&
                cartComic.creators.items[0].name) ||
              ""
            }
            year={cartComic.dates[0].date}
            price={
              (cartComic.prices && cartComic.prices[0].price.toString()) || ""
            }
            title={cartComic.title}
            key={cartComic.id}
            id={cartComic.id}
            onDelete={context.removeItemFromCart}
          />
        ))}
      </div>
      <div className="mt-[20px] flex flex-col gap-y-[10px]">
        <div className="flex text-black flex-row justify-between">
          <span>Total</span>
          <span>
            $
            {items.reduce(
              (acc: number, item: IComic) =>
                item.prices ? acc + item.prices[0].price || 0 : acc,
              0
            )}
          </span>
        </div>
        <button
          className="bg-black text-white w-full h-[50px] disabled:bg-gray-500"
          disabled={items.length < 1}
          onClick={() => buyItems(items)}
        >
          Buy
        </button>
      </div>
    </div>
  );
}
