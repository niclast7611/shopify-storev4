import { createContext, useState, useEffect } from "react"
import { createCheckout, updateCheckout } from "../lib/shopify"

// access data from different nested components without neccessarily using props 
const CartContext = createContext()

export default function ShopProvider({ children }) {

    const [cart, setCart] = useState([])
    const [cartOpen, setCartOpen] = useState(false)
    const [checkoutId, setCheckoutId] = useState('')
    const [checkoutUrl, setCheckoutUrl] = useState('')
    //first checks to see if local storage has any information in it when the page is loaded up 
    useEffect(() => {
        if (localStorage.checkout_id) {
            const cartObject = JSON.parse(localStorage.checkout_id)
            //if theres nothing in local storage then sets it to 0 
            if (cartObject[0].id) {
                setCart([cartObject[0]])
                //if there is information in local storage sets the cart to whatever was added previously 
            } else if (cartObject[0].length > 0) {
                setCart(...[cartObject[0]])
            }
            //then sets the id and url to the second thing in the cart 
            setCheckoutId(cartObject[1].id)
            setCheckoutUrl(cartObject[1].webUrl)
        }

    }, [])

    // adds new item to cart if theres nothing in cart 
    async function addToCart(newItem) {
        setCartOpen(true)

        if (cart.length === 0) {
            setCart([newItem])
            // calls createCheckout query from shopify.js
            const checkout = await createCheckout(newItem.id, newItem.variantQuantity)
            
            // creates checkout id and url 
            setCheckoutId(checkout.id)
            setCheckoutUrl(checkout.webUrl)

            // (google) localStorage is a web storage object that allows JavaScript sites and apps to keep key-value pairs in a web browser with no expiration date. This means the data survives page refreshes
            //keeps cart from emptying when pages is reloaded or left and returned to 
            localStorage.setItem('checkout_id', JSON.stringify([newItem, checkout]))

        }
        else {
            // spread the cart so we can add new items to the end 
            let newCart = [...cart]
            // maps over cart if theres already an item with the same id in cart increase quantity
            cart.map(item => {
                if (item.id === newItem.id) {
                    item.variantQuantity++
                    newCart = [...cart]
                } else {
                    // catch all add new item to the end of the cart
                    newCart = [...cart, newItem]
                }
            })
            // sets cart state
            setCart(newCart)
            // updates a checkout to have new cart info 
            const newCheckout = await updateCheckout(checkoutId, newCart)
            localStorage.setItem('checkout_id', JSON.stringify([newCart, newCheckout]))
        }
    }

    async function removeCartItem(itemToRemove) {
        // to remove items we use built in js filter method 
        const updatedCart = cart.filter(item => item.id !== itemToRemove)
        //sets updated cart to cart, localstorage, and checkout 
        setCart(updatedCart)
        const newCheckout = await updateCheckout(checkoutId, updatedCart)

        localStorage.setItem('checkout_id', JSON.stringify([updatedCart, newCheckout]))
        //if card is less then one the it closes automatically 
        if (cart.length === 1) {
            setCartOpen(false)
        }
      
    }


    async function removeCartItemQuantity(itemQuantityToRemove) {
       //creating copy of cart to mdify and set
      const newCart = cart.map(item => item);
      //finding the index of product to be evaluating against
      const index = newCart.findIndex(product => product.id === itemQuantityToRemove);
      //if variantQuatity is greater then 1 minus (1)
      //oterwise remove item from array
      if (newCart[index].variantQuantity > 1) {
        newCart[index].variantQuantity =  newCart[index].variantQuantity - 1;

        setCart(newCart);
        const newCheckout = await updateCheckout(checkoutId, newCart)
        localStorage.setItem('checkout_id', JSON.stringify([newCart, newCheckout]))

      } else {
        removeCartItem(itemQuantityToRemove);
      }

    }




    async function addCartItemQuantity(itemQuantityToAdd) {
         //creating copy of cart to mdify and set
         const newCart = cart.map(item => item);
         //finding the index of product to be evaluating against
         const index = newCart.findIndex(product => product.id === itemQuantityToAdd);
   
         //if variantQuatity is greater then 1 minus (1)
         //oterwise remove item from array
   
           newCart[index].variantQuantity =  newCart[index].variantQuantity + 1;
           setCart(newCart);
            const newCheckout = await updateCheckout(checkoutId, newCart)
            localStorage.setItem('checkout_id', JSON.stringify([newCart, newCheckout]))
        
       
    }

    async function clearCartWhenComplete(){
        localStorage.clear()
    }

    return (

        // (google) Every Context object comes with a Provider React component that allows consuming components to subscribe to context changes(all children subscribe to context changes listed in the value object)
        <CartContext.Provider value={{
            cart,
            cartOpen,
            setCartOpen,
            addToCart,
            checkoutUrl,
            removeCartItem,
            addCartItemQuantity,
            removeCartItemQuantity,
            clearCartWhenComplete
        }}>
            {children}
        </CartContext.Provider>
    )
}

// (google) A React component that subscribes to context changes. Using this component lets you subscribe to a context within a function component.
const ShopConsumer = CartContext.Consumer
export { ShopConsumer, CartContext }


