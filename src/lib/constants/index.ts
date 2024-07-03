// Api Endpoints
export const ENDPOINTS = {
  // API_BASE_URL: process.env.NEXT_PUBLIC_BACKEND,
  // API_BASE_URL: "https://brandshopapi.azurewebsites.net/",
  // API_BASE_URL: "https://newfbnbackend.azurewebsites.net/",
  API_BASE_URL:
    "https://fbnbrandshopbackend-api-dev.fbn-devops-dev-asenv.appserviceenvironment.net/",

  // Auth endpoints
  AUTH_VALIDATE_TOKEN: "token-validation",
  AUTH_OPENID_CONFIG: ".well-known/openid-configuration",
  API_RESET_PASSWORD: (token: string) => `/auth/reset-password?token=${token}`,
  VERIFY_SIGNUP_DETAILS: "/auth/verify/signup",
  AUTH_USER: (userName: string, password: string) =>
    `user-authentication?Username=${userName}&Password=${password}`,
  TOKEN_VALIDATION: (userId: string, token: string) =>
    `token-validation?UserId=${userId}&Token=${token}`,
  // Banner
  GET_BANNER_LIST: "admin/banners/list",
  GET_SINGLE_BANNER: (id: string) => `admin/banners/list?id=${id}`,
  CREATE_BANNER: "admin/banners/create",
  UPDATE_BANNER: "admin/banners/update",
  DELETE_BANNER: (id: string) => `admin/banners/delete/${id}`,

  // Cart Endpoints
  GET_CUSTOMER_CART: (customerId: string) => `admin/cart/read/${customerId}`,
  ADD_ITEM_TO_CUSTOMER_CART: (customerId: string) =>
    `admin/cart/${customerId}/add-cart-item`,
  ADD_ITEMS_TO_CUSTOMER_CART: (customerId: string) =>
    `admin/cart/${customerId}/add-cart-items`,
  UPDATE_CUSTOMER_CART_ITEM_QUANTITY: (customerId: string) =>
    `admin/cart/update/quantity?customerId=${customerId}`,
  DELETE_CUSTOMER_CART_ITEM: (customerId: string, itemId: string) =>
    `admin/cart/delete/item/${itemId}?customerId=${customerId}`,
  CLEAR_CUSTOMER_CART: `admin/cart/clear`,

  // Category Endpoint
  GET_CATEGORY_PARENT: "admin/categories/parent-only",
  GET_CATEGORY_LIST: "admin/categories/list",
  GET_SINGLE_CATEGORY: (categoryId: string) =>
    `admin/categories/read/${categoryId}`,
  CREATE_CATEGORY: "admin/categories/create",
  UPDATE_CATEGORY: "admin/categories/update",
  DELETE_CATEGORY: (categoryId: string) =>
    `admin/categories/delete/${categoryId}`,
  ADD_PRODUCT_TO_CATEGORY: (categoryId: string) =>
    `admin/categories/${categoryId}/products`,
  UPDATE_PRODUCT_IN_CATEGORY: (categoryId: string) =>
    `admin/categories/update-product/${categoryId}`,
  UPDATE_CATEGORY_STATUS: "admin/categories/change-status",

  // Coupons
  GET_COUPONS_LIST: (
    pageNumber: number,
    pageSize: number,
    search?: string,
    sort?: string
  ) =>
    `admin/coupons/search?Pagination.RequestedPage=${pageNumber}&Pagination.PageSize=${pageSize}${
      sort ? `&Search.PredicateObject.Parameter=${sort}` : ""
    }${search ? `&Search.PredicateObject.Query=${search}` : ""}`,

  GET_COUPON: (couponId: string) => `admin/coupons/read/${couponId}`,
  CREATE_COUPON: "admin/coupons/create",
  DELETE_COUPON: (couponId: string) => `admin/coupons/delete/${couponId}`,
  UPDATE_COUPON: (couponId: string) => `admin/coupons/update/${couponId}`,

  // Invoice
  GET_TRANSACTION_INVOICE: (invoiceId: string) =>
    `admin/invoices/print/${invoiceId}`,

  // Orders
  GET_ORDER_HISTORY: (orderId: string) => `admin/orders/read/${orderId}`,
  GET_ORDER_STATUS: "admin/orders/order-status",
  GET_ORDER_SEARCH_OPTION: "admin/orders/search-options",
  UPDATE_ORDER_STATUS: (orderId: string) =>
    `admin/orders/change-order-status/${orderId}`,
  GET_ORDER_LIST: (
    pageNumber: number,
    pageSize: number,
    startDate?: string,
    endDate?: string,
    search?: string,
    sort?: string
  ) =>
    `admin/orders/search?Pagination.RequestedPage=${pageNumber}&Pagination.PageSize=${pageSize}${
      startDate ? `&startDate=${startDate}` : ""
    }${endDate ? `&endDate=${endDate}` : ""}${
      sort ? `&Search.PredicateObject.Parameter=${sort}` : ""
    }${search ? `&Search.PredicateObject.Query=${search}` : ""}`,
  // Products Endpoints
  GET_PRODUCT_BY_SEARCH: (name: string) =>
    `admin/products/basic-search/${name}`,
  GET_PRODUCT_BY_ID: (productId: number | string) =>
    `admin/products/read/${productId}`,
  GET_PRODUCTS_BY_SEARCH: (
    page: number,
    parameter: string,
    search: string,
    pageSize: number
  ) =>
    `admin/products/search?Pagination.RequestedPage=${page}&Pagination.PageSize=${pageSize}${
      parameter ? `&Search.PredicateObject.parameter=${parameter}` : ""
    }${search ? `&Search.PredicateObject.query=${search}` : ""}`,
  // `admin/products/search?Pagination.RequestedPage=${page}&Pagination.PageSize=10&Sort.Predicate=BestSelling&Sort.Reverse=false`,
  CREATE_PRODUCTS: "admin/products/create",
  UPDATE_PRODUCT: "admin/products/update",
  UPDATE_PRODUCT_STATUS: "admin/products/change-status",
  DELETE_PRODUCT: (productId: number) =>
    `admin/products/hard-delete/${productId}`,
  GET_PRODUCTS_SEARCH_OPTIONS: "admin/products/search-options",
  GET_PRODUCTS_ORDERBY: "admin/products/product-orderby",

  // Tax Endpoints
  GET_TAX_RATE_LIST: "admin/tax-rates/list",
  GET_SINGLE_TAX: (taxId: string) => `admin/tax-rates/read/${taxId}`,
  CREATE_TAX_RATE: "admin/tax-rates/create",
  UPDATE_TAX_RATE: "admin/tax-rates/update",
  DELETE_TAX: (taxId: string) => `admin/tax-rates/delete/${taxId}`,
  GET_TAX_PER_COUNTRY: (countryId: string) =>
    `admin/tax-rates/export/${countryId}`,
  TAX_IMPORT_POST: "admin/tax-rates/import",

  // State Endpoint
  GET_STATE_LIST: "admin/statesndpr/list",
  GET_SINGLE_STATE: (stateId: string) => `admin/statesndpr/read/${stateId}`,
  UPDATE_STATE_DETAILS: "admin/statesndpr/update",
  DELETE_STATE: (stateId: string) => `admin/statesndpr/delete/${stateId}`,
  GET_STATES_BY_SEARCH: "admin/statesndpr/search",
  CREATE_STATE: "admin/statesndpr/create",
  IMPORT_STATES_BY_COUNTRYID: (countryId: string) =>
    `admin/statesndpr/import-states/${countryId}`,
  EXPORT_STATES_BY_COUNTRYID: (countryId: string) =>
    `admin/statesndpr/export-states/${countryId}`,

  // Address Endpoint
  GET_ADDRESS_LIST: "account/address/list",
  CREATE_ADDRESS: "account/address/create",
  GET_SINGLE_ADDRESS: (addressId: string) => `account/address/${addressId}`,
  UPDATE_SINGLE_ADDRESS: (addressId: string) =>
    `account/address/update/${addressId}`,
  UPDATE_DEFAULT_ADDRESS: "account/address/set-default",
  DELETE_ADDRESS: "account/address/confirm-delete",

  // search Endpoint
  GET_SEARCH_RESULT: (search: string) => `search/q?q=${search}`,
  GET_MOST_SEARCHED_KEYWORDS: "search-stats/most-serach-keywords",

  // review Endpoints
  DELETE_REVIEW: (reviewId: string) => `admin/reviews/delete/${reviewId}`,
  ADD_PRODUCT_REVIEW: "review-product/add-review",
  GET_PRODUCT_REVIEWS: (
    productId: string,
    pageNumber: number,
    pageSize: number
  ) =>
    `review-product/reviews-for-product?productId=${productId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
  GET_REVIEW_LIST: (
    pageNumber: number,
    pageSize: number,
    startDate?: string,
    endDate?: string,
    search?: string,
    sort?: string
  ) =>
    `admin/reviews/search?Pagination.RequestedPage=${pageNumber}&Pagination.PageSize=${pageSize}${
      startDate ? `&startDate=${startDate}` : ""
    }${endDate ? `&endDate=${endDate}` : ""}${
      sort ? `&Search.PredicateObject.Parameter=${sort}` : ""
    }${search ? `&Search.PredicateObject.Query=${search}` : ""}`,

  // Name&=Okolo
  CHANGE_REVIEW_STATUS: (id: string, productId: string, approve: boolean) =>
    `admin/reviews/change-status/${id}?productId=${productId}&approve=${approve}`,
  GET_REVIEW_OPTIONS: "admin/reviews/search-options",
  // Reply
  POST_REPLY: "reply/add-reply",

  // Shipping Endpoint
  SEARCH_SHIPPING_RATE:
    "admin/shipping-rate/search?Pagination.RequestedPage=1&Pagination.PageSize=200",
  GET_CHECKOUT_SHIPPING_STATES: `checkout/shipping-states`,
  GET_SHIPPING_RATE: (rateId: string) => `admin/shipping-rate/read/${rateId}`,
  GET_SHIPPING_RATES: (page: number, pageSize: number) =>
    `admin/shipping-rate/search?Pagination.RequestedPage=${page}&Pagination.PageSize=${pageSize}`,

  GET_SHIPPING_RATES_OPTIONS: "admin/shipping-rate/search-options",
  CREATE_SHIPPING_RATE: "admin/shipping-rate/create",
  UPDATE_SHIPPING_RATE: "admin/shipping-rate/update",
  DELETE_SHIPPING_RATE: (rateId: string) =>
    `admin/shipping-rate/delete/${rateId}`,
  POST_SHIPPING_RATES: "admin/shipping-rate/import-shipping-rates",

  // Tax Class Endpoint
  GET_TAXCLASS_LIST: "admin/tax-classes/list",
  GET_ACTIVE_TAXCLASS: "admin/tax-classes/active",
  GET_SINGLE_TAXCLASS: (taxClassId: string) =>
    `admin/tax-classes/read/${taxClassId}`,
  GET_DEFAULT_TAXCLASS: "admin/tax-classes/default",
  CREATE_TAXCLASS: "admin/tax-classes/create",
  UPDATE_TAXCLASS: "admin/tax-classes/update",
  DELETE_TAXCLASS: (taxClassId: string) =>
    `admin/tax-classes/delete/${taxClassId}`,
  POST_TAXCLASS_LIST: "admin/tax-classes/import-tax-classes",
  GET_TAXCLASS_LISTS: "admin/tax-classes/export-tax-classes",

  // Users endoint
  GET_USERS_BY_QUICKSEARCH: (query: string) =>
    `admin/users/quick-search/${query}`,
  GET_ALL_USERS: "admin/users/all",
  POST_USERS_BY_SEARCH: (page: number) =>
    // `admin/users/search?Pagination.RequestedPage=${page}&Pagination.PageSize=10`,
    `admin/users/search?Pagination.RequestedPage=${page}&Pagination.PageSize=10&Search.PredicateObject.parameter=Role&Search.PredicateObject.query=Admin`,
  GET_SINGLE_ADMIN: (email: string) =>
    `admin/users/search?Pagination.RequestedPage=1&Pagination.PageSize=2&Search.PredicateObject.parameter=Email&Search.PredicateObject.query=${email}`,

  UPDATE_USER_DETAILS: "admin/users/update",
  GET_USER_BY_ID: (id: string) => `admin/users/${id}`,
  CREATE_USER: "admin/users/create",
  DELETE_USER: (id: string) => `admin/users/delete/${id}`,
  FORCE_DELETE_USER: (id: string) => `admin/users/force-delete/${id}`,
  GET_USER_SEARCH_OPTIONS: "admin/users/search-options",

  // Payment
  GET_ADMIN_PAYMENT: "admin/payments/list",

  // Media Api
  UPLOAD_MEDIA: "admin/media/upload",

  // analytics
  GET_TOTAL_SALES: (startDate: string, endDate: string) =>
    `analytics/dashboard/total-sales?startDate=${startDate}&endDate=${endDate}`,
  GET_TOTAL_ITEMS_SOLD: (startDate: string, endDate: string) =>
    `analytics/dashboard/total-items-sold?startDate=${startDate}&endDate=${endDate}`,
  GET_SALES_OVERVIEW: (startDate: string, endDate: string) =>
    `analytics/dashboard/sales-overview?startDate=${startDate}&endDate=${endDate}`,
  GET_BRANCH_SALES: (startDate: string, endDate: string) =>
    `analytics/dashboard/branch-sales?startDate=${startDate}&endDate=${endDate}`,
  GET_TOTAL_PRODUCT_INSTOCK: "analytics/dashboard/total-products-instock",
  GET_BEST_CUSTOMERS: (startDate: string, endDate: string) =>
    `analytics/dashboard/best-customers?startDate=${startDate}&endDate=${endDate}`,
  GET_POPULAR_CATEGORIES: (startDate: string, endDate: string) =>
    `analytics/dashboard/popular-categories?startDate=${startDate}&endDate=${endDate}`,

  // user
  GET_USER_INFO: "account/user/info",
};
export const STOREID = "fbn46374683";

export const NAMESPACE = {
  // Auth
  AUTH_INITIATE_SIGN: "AUTH_INITIATE_SIGN",
  AUTH_VALIDATE_TOKEN: "AUTH_VALIDATE_TOKEN",
  AUTH_OPENID_CONFIG: "AUTH_OPENID_CONFIG",
  CREATE_WITHDRAWAL_ACCOUNT: "CREATE_WITHDRAWAL_ACCOUNT",

  // Banner
  GET_BANNER_LIST: "GET_BANNER_LIST",
  GET_SINGLE_BANNER: "GET_SINGLE_BANNER",

  // orders
  GET_ORDER_HISTORY: "GET_ORDER_HISTORY",
  GET_ORDER_SEARCH_OPTION: "GET_ORDER_SEARCH_OPTION",
  GET_ORDER_STATUS: "GET_ORDER_STATUS",
  // categories
  GET_CATEGORY_PARENT: "GET_CATEGORY_PARENT",
  GET_CATEGORY_LIST: "GET_CATEGORY_LIST",
  GET_SINGLE_CATEGORY: "GET_SINGLE_CATEGORY",
  CREATE_CATEGORY: "CREATE_CATEGORY",
  UPDATE_CATEGORY: "UPDATE_CATEGORY",
  DELETE_CATEGORY: "DELETE_CATEGORY",
  UPDATE_CATEGORY_STATUS: "UPDATE_CATEGORY_STATUS",
  UPDATE_PRODUCT_IN_CATEGORY: "UPDATE_PRODUCT_IN_CATEGORY",
  ADD_PRODUCT_TO_CATEGORY: "ADD_PRODUCT_TO_CATEGORY",

  // Invoice
  GET_TRANSACTION_INVOICE: "GET_TRANSACTION_INVOICE",
  // Products
  GET_PRODUCTS_BY_SEARCH: "GET_PRODUCTS_BY_SEARCH",
  UPDATE_PRODUCT: "UPDATE_PRODUCT",
  UPDATE_PRODUCT_STATUS: "UPDATE_PRODUCT_STATUS",
  GET_PRODUCTS_SEARCH_OPTIONS: "GET_PRODUCTS_SEARCH_OPTIONS",
  GET_PRODUCTS_ORDERBY: "GET_PRODUCTS_ORDERBY",
  DELETE_PRODUCT: "DELETE_PRODUCT",
  GET_PRODUCT_BY_ID: "GET_PRODUCT_BY_ID",
  GET_PRODUCT_BY_SEARCH: "GET_PRODUCT_BY_SEARCH",

  // cart
  GET_CUSTOMER_CART: "GET_CUSTOMER_CART",
  ADD_ITEM_TO_CUSTOMER_CART: "ADD_ITEM_TO_CUSTOMER_CART",
  ADD_ITEMS_TO_CUSTOMER_CART: "ADD_ITEMS_TO_CUSTOMER_CART",
  UPDATE_CUSTOMER_CART_ITEM_QUANTITY: "UPDATE_CUSTOMER_CART_ITEM_QUANTITY",
  DELETE_CUSTOMER_CART_ITEM: "DELETE_CUSTOMER_CART_ITEM",

  // state
  GET_STATE_LIST: "GET_STATE_LIST",
  GET_SINGLE_STATE: "GET_SINGLE_STATE",
  UPDATE_STATE_DETAILS: "UPDATE_STATE_DETAILS",
  DELETE_STATE: "DELETE_STATE",
  GET_STATES_BY_SEARCH: "GET_STATES_BY_SEARCH",
  CREATE_STATE: "CREATE_STATE",
  IMPORT_STATES_BY_COUNTRYID: "IMPORT_STATES_BY_COUNTRYID",
  EXPORT_STATES_BY_COUNTRYID: "EXPORT_STATES_BY_COUNTRYID",

  // Tax Rate
  GET_TAX_RATE_LIST: "GET_TAX_RATE_LIST",
  GET_SINGLE_TAX: "GET_SINGLE_TAX",

  // Address
  GET_ADDRESS_LIST: "GET_ADDRESS_LIST",
  CREATE_ADDRESS: "CREATE_ADDRESS",
  GET_SINGLE_ADDRESS: "GET_SINGLE_ADDRESS",
  UPDATE_SINGLE_ADDRESS: "UPDATE_SINGLE_ADDRESS",
  UPDATE_DEFAULT_ADDRESS: "UPDATE_DEFAULT_ADDRESS",
  DELETE_ADDRESS: "DELETE_ADDRESS",

  // Search
  GET_SEARCH_RESULT: "GET_SEARCH_RESULT",
  GET_MOST_SEARCHED_KEYWORDS: "GET_MOST_SEARCHED_KEYWORDS",

  // reviews
  GET_PRODUCT_REVIEWS: "GET_PRODUCT_REVIEWS",
  ADD_PRODUCT_REVIEW: "ADD_PRODUCT_REVIEW",
  POST_REPLY: "POST_REPLY",
  GET_REVIEW_LIST: "GET_REVIEW_LIST",
  CHANGE_REVIEW_STATUS: "CHANGE_REVIEW_STATUS",
  GET_REVIEW_OPTIONS: "GET_REVIEW_OPTIONS",

  // Shipping rates
  GET_SHIPPING_RATES: "GET_SHIPPING_RATES",
  SEARCH_SHIPPING_RATE: "SEARCH_SHIPPING_RATE",
  GET_SHIPPING_RATE: "GET_SHIPPING_RATE",
  GET_SHIPPING_RATES_OPTIONS: "GET_SHIPPING_RATES_OPTIONS",
  CREATE_SHIPPING_RATE: "CREATE_SHIPPING_RATE",
  UPDATE_SHIPPING_RATE: "UPDATE_SHIPPING_RATE",
  DELETE_SHIPPING_RATE: "DELETE_SHIPPING_RATE",
  POST_SHIPPING_RATES: "POST_SHIPPING_RATES",
  GET_CHECKOUT_SHIPPING_STATES: "GET_CHECKOUT_SHIPPING_STATES",

  // TAX CLASS
  GET_TAXCLASS_LIST: "GET_TAXCLASS_LIST",
  GET_ACTIVE_TAXCLASS: "GET_ACTIVE_TAXCLASS",
  GET_SINGLE_TAXCLASS: "GET_SINGLE_TAXCLASS",
  GET_DEFAULT_TAXCLASS: "GET_DEFAULT_TAXCLASS",
  CREATE_TAXCLASS: "CREATE_TAXCLASS",
  UPDATE_TAXCLASS: "UPDATE_TAXCLASS",
  DELETE_TAXCLASS: "DELETE_TAXCLASS",
  POST_TAXCLASS_LIST: "POST_TAXCLASS_LIST",
  GET_TAXCLASS_LISTS: "GET_TAXCLASS_LISTS",

  // Users
  GET_USERS_BY_QUICKSEARCH: "GET_USERS_BY_QUICKSEARCH",
  GET_ALL_USERS: "GET_ALL_USERS",
  POST_USERS_BY_SEARCH: "POST_USERS_BY_SEARCH",
  GET_SINGLE_ADMIN: "GET_SINGLE_ADMIN",
  GET_USER_BY_ID: "GET_USER_BY_ID",
  CREATE_USER: "CREATE_USER",
  DELETE_USER: "DELETE_USER",
  FORCE_DELETE_USER: "FORCE_DELETE_USER",
  GET_USER_SEARCH_OPTIONS: "GET_USER_SEARCH_OPTIONS",

  // payment
  GET_ADMIN_PAYMENT: "GET_ADMIN_PAYMENT",

  // Coupons
  GET_COUPONS_LIST: "GET_COUPONS_LIST",
  GET_COUPON: "GET_COUPON",

  // Analytics
  GET_TOTAL_SALES: "GET_TOTAL_SALES",
  GET_TOTAL_ITEMS_SOLD: "GET_TOTAL_ITEMS_SOLD",
  GET_SALES_OVERVIEW: "GET_SALES_OVERVIEW",
  GET_BRANCH_SALES: "GET_BRANCH_SALES",
  GET_BEST_CUSTOMERS: "GET_BEST_CUSTOMERS",
  GET_POPULAR_CATEGORIES: "GET_POPULAR_CATEGORIES",
  GET_TOTAL_PRODUCT_INSTOCK: "GET_TOTAL_PRODUCT_INSTOCK",

  // users
  GET_USER_INFO: "GET_USER_INFO",
};

export const AuthPages = ["/login", "/login/branch"];

export const Constants = {
  token: "Fbn_ww9384123_ad_token_",
  userId: "Fbn_user_ofp499239dfn",
};

export const PAGES = {
  SIGNIN: "/login",
};
