import Image from "next/image";
import { CartIcon } from "../icons/cart";
import { Sidebar } from "../sidebar/sidebar";
import { useContext } from "react";
import Link from "next/link";
import { Context } from "@/utils/context";
import { useRouter } from "next/router";

export default function Navbar() {
  const context = useContext(Context);
  const router = useRouter();
  return (
    <>
      <Sidebar
        isVisible={context.getSidebarVisibility()}
        toggleVisibility={() => context.toggleSidebarVisibility()}
      />
      <nav className="flex h-16 mt-[80px] w-screen items-center justify-between">
        <div className=" ml-[150px] mr-[150px] flex items-center w-screen justify-between">
          <div className="flex items-center space-x-[150px]">
            <Link href={"/comics"}>
              <Image
                width={100}
                height={10}
                src="/marvel-logo.png"
                alt="logo"
              />
            </Link>
            <div className="space-x-8 tex-lg">
              <Link
                className={`${
                  router.pathname.includes("/comics") && "bg-gray-900"
                } text-white rounded-md px-3 py-2 font-medium`}
                aria-current="page"
                href="/comics"
              >
                Comics
              </Link>
              <Link
                href="/my-comics"
                className={`${
                  router.pathname === "/my-comics" && "bg-gray-900"
                } text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium`}
              >
                My comics
              </Link>
            </div>
          </div>
          <div
            className="cursor-pointer text-white"
            onClick={() => context.toggleSidebarVisibility()}
          >
            <div className="relative h-[30px] w-[30px]">
              <CartIcon
                className="absolute w-full h-full"
                height={30}
                width={30}
              />
              <div className="absolute z-10 bg-gray-500 -right-1 -top-2 text-xs w-[20px] h-[20px] rounded-full">
                <span className="h-full w-full flex items-center justify-center">
                  {context.getCartItems().length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
