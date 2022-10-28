import { getAllCollections, getProductsForHomePage } from "../lib/shopify";
import ProductList from "../components/ProductList";
import Hero from "../components/Hero";
export default function Home({ homePageProducts, collectionNames }) {
  // console.log(homePageProducts.length)
  return (
    <div className="bg-background-color">
      <Hero collectionNames={collectionNames} />
      <ProductList homePageProducts={homePageProducts} />
    </div>
  );
}

export async function getStaticProps() {
  const homePageProducts = await getProductsForHomePage();
  const collectionNames = await getAllCollections();
  return {
    props: { homePageProducts, collectionNames },
  };
}
