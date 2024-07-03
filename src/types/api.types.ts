import { BadgeProps } from "@/components/badge";
import { EmojiModel } from "@/lib/constants/rating";
import { QueryFunction, QueryKey } from "@tanstack/react-query";
import { AxiosRequestHeaders, AxiosResponse, Method } from "axios";

export type MethodTypes = "get" | "post" | "patch" | "put" | "delete";

export interface SecureRequestProps<T = Record<string, unknown>> {
  method?: Method;
  url: string;
  body?: Record<string, unknown>;
  isCreathorsApi?: boolean;
  baseURL?: string;
  headers?: AxiosRequestHeaders;
  endpoint?: string;
  queryKey?: string | string[] | number[];
  showToast?: boolean;
  token?: string;
  queryFn?: QueryFunction<FirstBankResponseType<T>, QueryKey>;
}

export interface RequestResponse<T = Record<string, unknown>> {
  queryFn?: QueryFunction<FirstBankResponseType<T>, QueryKey>;
}

export type FirstBankResponseType<D> = AxiosResponse<
  CredentialsServerResponseModel<D>
>;

export type CredentialsServerResponseModel<T> = {
  data: T;
  oid: any;
  response_code: string;
  errors: Record<string, unknown>;
  errorCode: number;
  status: string;
  message: string;
  response_message: string;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
};

export interface ResponseErrorType {
  message: string;
  name: string;

  response: {
    data: {
      response_message: string;
      status: string;
      statusCode: number;
      message: string;
      details: string[];
      source: string;
    };
  };
}

export type CustomMethod = "get" | "put" | "delete" | "post";

export type PaymentMethod =
  | "card"
  | "ussd"
  | "transfer"
  | "QR"
  | "solId"
  | "first-checkout"
  | null;

export interface CreateProductResponse {
  name: string;
}

// Cart interfaces
export interface CartQuantityUpdate {
  cartItemId: number;
  quantity: number;
}

export interface IItemSchema {
  id: number;
  name: string;
  slug: string;
  status: "Active";
  hasOptions: boolean;
  isVisibleIndividually: boolean;
  dateCreated: string;
  isPublished: boolean;
  isFeatured: boolean;
  thumbnailUrl: string;
  isCallForPricing: boolean;
  isAllowToOrder: boolean;
  stockQuantity: number;
  categories: {
    id: number;
    name: string;
    slug: string;
    primaryImage: null | string;
    displayOrder: 0;
    isFeatured: boolean;
    status: "Active";
    includeInSearch: boolean;
    parentId: null | string;
    showInDashboard: boolean;
  }[];
}

export interface IProductItem {
  items: IItemSchema[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
}

export interface IUserSchema {
  id: string;
  userName: string;
  fullName: string | null;
  status: 0 | 1;
  email: string;
  dateCreated: string;
  profilePicture: null;
  password: null;
  concurrencyStamp: null;
  roles: string[];
}

export interface IUserItem {
  items: IUserSchema[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
}

export interface ProductDetailsRes {
  id: number;
  name: string;
  slug: string;
  sku: null;
  thumbnailUrl: string;
  shortDescription: string;
  seoKeywords: string;
  description: string;
  specification: string;
  isAllowToOrder: boolean;
  stockQuantity: number | string;
  reviewsCount: number;
  ratingAverage: null;
  availableOptions: any[];
  optionDisplayValues: {};
  variations: any[];
  attributes: any[];
  categoryIds: number[];

  minimumOrder: null;
  price: number;
  oldPrice: number;
  specialPrice: number;
  specialPriceStart: null;
  specialPriceEnd: null;
  gtin: null;
  status: "Suspended";
  isFeatured: true;
  isVisibleIndividually: true;

  taxClassId: number;
  concurrencyStamp: string;
  options: [];
  thumbnailImage: string;
  productImages: string[];
  productDocuments: [];
}

export interface ICategoryType {
  id: string;
  icon: string;
  name: string;
  slug: string;
  displayOrder: 0;
  isFeatured: boolean;
  status: "Active";
  includeInSearch: true;
  parentId: null;
  description: string;
  showInDashboard: boolean;
}

export interface IProductOrderBy {
  id: string;
  name: string;
}

export interface ITaxClassModel {
  id: string;
  name: string;
  isActive: boolean;
}

export type RateItem = {
  id: string;
  name: string;
  taxClass: string;
  providerName: string;
  stateOrProvinceName: string;
  minOrderSubtotal: string;
  shippingPrice: string;
  note: string;
};
export interface IShippingRateModel {
  items: RateItem[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
}

export type ReviewItem = {
  id: string;
  rating: number;
  title: EmojiModel["text"];
  userId: string | null;
  status: "Pending" | "Approved" | "Rejected";
  productSlug: string | null;
  productName: string | null;
  productId: string;
  comment: string | null;
  reviewerName: string | null;
  dateCreated: string;
  replies: any[];
};
export interface IReviewListModel {
  items: ReviewItem[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
}

// order
export type CheckoutOrderItem = {
  id: string;
  customerId: string;
  customerName: string;
  orderTotal: number;
  orderTotalString: string;
  dateCreated: string;
  status: BadgeProps["variant"];
};

export interface IOrderItemListModel {
  items: CheckoutOrderItem[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
}

// COUPON
export type CouponItem = {
  id: number;
  code: string;
  startOn: string;
  endOn: string;
  isActive: boolean;
};
export interface ICouponListModel {
  items: CouponItem[];
  totalItems: 0;
  currentPage: 0;
  pageSize: 0;
  hasPreviousPage: true;
  hasNextPage: true;
  totalPages: 0;
}

export type taxClassProps = {
  id: string;
  isActive: boolean;
  name: string;
};

export interface ITaxRateItem {
  id: string;
  taxClassName: string;
  stateName: null | string;
  zipCode: string;
  rate: string;
}

export type OrderItem = {
  productId: number;
  productName: string;
  productOptions: [];
  productOptionString: string;
  quantity: number;
  thumbnailImage: string;
  id: null;
  productImage: string;
  slug: null;
  productPrice: number;
  productStockQuantity: number;
  isAvailableToOrder: boolean;
  shippedQuantity: number;
  shippingPrice: number;
  shippingPriceString: string;
  taxAmount: number;
  taxPercent: number;
  discountAmount: number;
  total: number;
  taxIncludedAmount: number;
  rowTotal: number;
  taxAmountString: string;
  productPriceString: string;
  discountAmountString: string;
  totalString: string;
  taxIncludedAmountString: string;
  rowTotalString: string;
};

export type AddressType = {
  id: number;
  contactName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  zipCode: null | number;
  stateId: number;
  stateName: string;
  cityName: string;
  isCityEnabled: boolean;
  isZipCodeEnabled: boolean;
};

export interface IOrderDetails {
  id: string;
  mId: string;
  dateCreated: string;
  subTotal: number;
  subTotalString: string;
  orderStatus: "New";
  orderItems: OrderItem[];
}
export interface ISinglOrderDetails extends IOrderDetails {
  shippingAddress: AddressType;
  customerId: string;
  customerName: string;
  customerEmail: string;
  orderStatusString: string;
  discountAmount: number;
  subTotalWithDiscount: number;
  taxAmount: number;
  shippingAmount: number;
  orderTotal: number;
  shippingMethod: null;
  paymentMethod: null;
  paymentFee: number;
  discountAmountString: string;
  subtotalWithDiscountString: string;
  taxAmountString: string;
  shippingAmountString: string;
  paymentFeeAmountString: string;
  orderTotalString: string;
  subOrderIds: null;
  isMasterOrder: boolean;
  isProductPriceIncludeTax: boolean;
  orderNote: null;
}
