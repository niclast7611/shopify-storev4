// This whole feature was imported from tailwind components
import { Fragment, useContext, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { CartContext } from "../context/shopContext";
import { formatter } from "../utils/helpers";
import Link from "next/link";

export default function MiniCart({ cart }) {
  const cancelButtonRef = useRef();
  const {
    cartOpen,
    setCartOpen,
    checkoutUrl,
    removeCartItem,
    addCartItemQuantity,
    removeCartItemQuantity,
    clearCartWhenComplete,
  } = useContext(CartContext);

  let cartTotal = 0;
  //maps over everything in cart and adds them up
  //if there are multiple quantities then it multiples them

  cart.map((item) => {
    const variantPrice = Number(item?.variantPrice);
    const variantQuantity = Number(item?.variantQuantity);
    cartTotal += variantPrice * variantQuantity;
  });
  return (
    <Transition.Root show={cartOpen} as={Fragment}>
      <Dialog
        initialFocus={cancelButtonRef}
        as="div"
        className="fixed z-50 inset-0 overflow-hidden"
        onClose={() => {
          setCartOpen(!cartOpen);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-background-color shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-primary-color">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            ref={cancelButtonRef}
                            type="button"
                            className="-m-2 p-2 text-primary-color hover:text-gray-300"
                            onClick={() => setCartOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {cart.length > 0 ? (
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-white"
                            >
                              {cart.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className=" relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-white">
                                    <Image
                                      src={product.image}
                                      alt={product.title}
                                      layout="fill"
                                      objectFit="cover"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-primary-color ">
                                        <h3 className="hover:underline">
                                          <Link
                                            href={`/products/${product.handle}`}
                                            passHref
                                          >
                                            <a
                                              onClick={() => setCartOpen(false)}
                                            >
                                              {product.title}
                                            </a>
                                          </Link>
                                        </h3>
                                        <p className="ml-4">
                                          {formatter.format(
                                            product.variantPrice
                                          )}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-primary-color">
                                        {product.variantTitle}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="text-secondary-color">
                                        <div className="flex flex-wrap flex-col max-h-full content-center">
                                          <div className="flex items-center justify-center">
                                            <button
                                              className="px-2 w-8 h-8 appearance-none bg-none text-xl outline-none border-2 border-solid border-transparent text-background-color pb-4 cursor-pointer bg-secondary-color rounded-full transition-all hover:border-2 hover:border-solid  hover:border-primary-color/[0.5] focus:outline-2"
                                              aria-label="Decrement value"
                                              onClick={() =>
                                                removeCartItemQuantity(
                                                  product.id
                                                )
                                              }
                                            >
                                              -
                                            </button>
                                            <span className="text-3xl pl-5 pr-5  mt-1 text-primary-color">
                                              {product.variantQuantity}
                                            </span>
                                            <button
                                              className="px-2 w-8 h-8 appearance-none bg-none text-xl outline-none border-2 border-solid border-transparent text-background-color pb-4 cursor-pointer bg-secondary-color rounded-full transition-all hover:border-2 hover:border-solid  hover:border-primary-color/[0.5] focus:outline-2"
                                              aria-label="Increment value"
                                              onClick={() =>
                                                addCartItemQuantity(product.id)
                                              }
                                            >
                                              +
                                            </button>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="first-line:font-medium text-primary-color hover:text-secondary-color hover:underline disabled:opacity-10 disabled:hover:no-underline"
                                          onClick={() =>
                                            removeCartItem(product.id)
                                          }
                                          disabled={product.variantQuantity > 1}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div>
                              <p className="text-primary-color">
                                Nothing in your cart!
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {cart.length > 0 ? (
                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-primary-color">
                          <p>Subtotal</p>
                          <p>{formatter.format(cartTotal)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-primary-color">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <a
                            onClick={() => clearCartWhenComplete()}
                            href={checkoutUrl}
                            className="flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-background-color shadow-sm bg-secondary-color hover:bg-secondary-color"
                          >
                            Checkout
                          </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-primary-color">
                          <p>
                            or <br />
                            <button
                              type="button"
                              className="font-medium  hover:text-secondary-color"
                              onClick={() => setCartOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
