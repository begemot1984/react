const URL_ROOT = "http://localhost:7070/api";

export const URL_TOP_SALES = `${URL_ROOT}/top-sales`;
export const URL_CATEGORIES = `${URL_ROOT}/categories`;
export const URL_CATALOG = `${URL_ROOT}/items`;
export const URL_ITEM = (id: number) => `${URL_ROOT}/items/${id}`;
export const URL_ORDER = `${URL_ROOT}/order`;

export const PARAM_OFFSET = "offset";
export const PARAM_QUERY = "q";
export const PARAM_CATEGORY = "categoryId";

export const MENU_ITEM_INDEX = "index";
export const MENU_ITEM_CATALOG = "catalog";
export const MENU_ITEM_ABOUT = "about";
export const MENU_ITEM_CONTACTS = "contacts";

export const PAGE_INDEX = "/";
export const PAGE_CATALOG = "/catalog.html";
export const PAGE_ITEM = (id: string | number) => `/catalog/${id}.html`;
export const PAGE_ABOUT = "/about.html";
export const PAGE_CONTACTS = "/contacts.html";
export const PAGE_CART = "/cart.html";
