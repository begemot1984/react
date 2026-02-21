import { Route, Routes } from "react-router-dom";
import Footer from "./features/static/Footer";
import Header from "./features/header/Header";
import Index from "./features/index/Index";
import { Catalog } from "./features/catalog/Catalog";
import About from "./features/about/About";
import Contacts from "./features/contacts/Contacts";
import Item from "./features/item/Item";
import NotFound from "./features/static/NotFound";
import Cart from "./features/cart/Cart";
import {
  PAGE_ABOUT,
  PAGE_CART,
  PAGE_CATALOG,
  PAGE_CONTACTS,
  PAGE_INDEX,
  PAGE_ITEM,
} from "./features/common/constants";

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <div className="banner">
              <img
                src="./img/banner.jpg"
                className="img-fluid"
                alt="К весне готовы!"
              />
              <h2 className="banner-header">К весне готовы!</h2>
            </div>
            <Routes>
              <Route path={PAGE_INDEX} element={<Index />} />
              <Route path={PAGE_ITEM(":id")} element={<Item />} />
              <Route path={PAGE_CATALOG} element={<Catalog search={true} />} />
              <Route path={PAGE_ABOUT} element={<About />} />
              <Route path={PAGE_CONTACTS} element={<Contacts />} />
              <Route path={PAGE_CART} element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
