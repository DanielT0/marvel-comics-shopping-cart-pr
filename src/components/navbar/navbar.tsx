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
      <nav className="flex h-fit pt-[80px] items-center justify-center">
        <div className="w-[85%] flex items-center justify-between flex-col sm:flex-row">
          <div className="flex items-center justify-center sm:space-x-[150px] flex-col sm:flex-row ">
            <Link href={"/"}>
              <Image
                className="min-w-[100px]"
                width={100}
                height={10}
                src="/marvel-logo.png"
                alt="logo"
              />
            </Link>
            <div className="justify-center items-center flex sm:space-x-8 tex-lg flex-col sm:flex-row gap-y-4">
              <Link
                className={`${
                  router.pathname === "/comics" && "bg-gray-900"
                } text-white rounded-md px-3 py-2 font-medium`}
                aria-current="page"
                href="/comics"
              >
                Comics SSR
              </Link>
              <Link
                className={`${
                  router.pathname === "/comics/client" && "bg-gray-900"
                } text-white rounded-md px-3 py-2 font-medium`}
                aria-current="page"
                href="/comics/client"
              >
                Comics CSR
              </Link>
              {/* <Link
                href="/my-comics"
                className={`${
                  router.pathname === "/my-comics" && "bg-gray-900"
                } text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium`}
              >
                My comics
              </Link> */}
            </div>
          </div>
          {/* <div
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
          </div> */}
        </div>
      </nav>
    </>
  );
}
