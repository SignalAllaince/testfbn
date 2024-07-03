export interface Table {
  name: string;
  email: string;
  date: string;
}

export interface select {
  label: string;
  value: string;
}

export interface Inventory {
  // itemNumber: number;
  itemName: string;
  stock: number;
  category: string;
  subCategory: string;
  date: string;
}

export interface Flashsales {
  title: string;
  PCount: number;
  SCount: number;
  startDate: string;
  endDate: string;
  status: string;
  sales: number;
}

export interface Reviews {
  Date: string;
  buyerName: string;
  productName: string;
  rating: number;
  status: string;
}

export interface Customer {
  name: string;
  date: string;
}

export const customerArr = [
  {
    name: "Nzekwe Emeka",
    date: "10-03-2023",
  },
  {
    name: "Nzekwe Emeka",
    date: "10-03-2023",
  },
  {
    name: "Nzekwe Emeka",
    date: "10-03-2023",
  },
  {
    name: "Nzekwe Emeka",
    date: "10-03-2023",
  },
  {
    name: "Nzekwe Emeka",
    date: "10-03-2023",
  },
  {
    name: "Nzekwe Emeka",
    date: "10-03-2023",
  },
  {
    name: "Nzekwe Emeka",
    date: "10-03-2023",
  },
  {
    name: "Nzekwe Emeka",
    date: "10-03-2023",
  },
];

export const reviewsArr: Reviews[] = [
  {
    Date: "01-01-2023",
    buyerName: "Emeka Nzekwe",
    productName: "Water Bottle",
    rating: 5,
    status: "Pending",
  },
  {
    Date: "01-01-2023",
    buyerName: "Emeka Nzekwe",
    productName: "Water Bottle",
    rating: 5,
    status: "Pending",
  },
  {
    Date: "01-01-2023",
    buyerName: "Emeka Nzekwe",
    productName: "Water Bottle",
    rating: 5,
    status: "Pending",
  },
  {
    Date: "01-01-2023",
    buyerName: "Emeka Nzekwe",
    productName: "Water Bottle",
    rating: 5,
    status: "Pending",
  },
  {
    Date: "01-01-2023",
    buyerName: "Emeka Nzekwe",
    productName: "Water Bottle",
    rating: 5,
    status: "Pending",
  },
  {
    Date: "01-01-2023",
    buyerName: "Emeka Nzekwe",
    productName: "Water Bottle",
    rating: 5,
    status: "approved",
  },
  {
    Date: "01-01-2023",
    buyerName: "Emeka Nzekwe",
    productName: "Water Bottle",
    rating: 5,
    status: "approved",
  },
  {
    Date: "01-01-2023",
    buyerName: "Emeka Nzekwe",
    productName: "Water Bottle",
    rating: 5,
    status: "approved",
  },
  {
    Date: "01-01-2023",
    buyerName: "Emeka Nzekwe",
    productName: "Water Bottle",
    rating: 5,
    status: "Pending",
  },
  {
    Date: "01-01-2023",
    buyerName: "Emeka Nzekwe",
    productName: "Water Bottle",
    rating: 5,
    status: "archived",
  },
  {
    Date: "01-01-2023",
    buyerName: "Emeka Nzekwe",
    productName: "Water Bottle",
    rating: 5,
    status: "archived",
  },
  {
    Date: "01-01-2023",
    buyerName: "Emeka Nzekwe",
    productName: "Water Bottle",
    rating: 5,
    status: "Pending",
  },
  {
    Date: "01-01-2023",
    buyerName: "Emeka Nzekwe",
    productName: "Water Bottle",
    rating: 5,
    status: "archived",
  },
  {
    Date: "01-01-2023",
    buyerName: "Emeka Nzekwe",
    productName: "Water Bottle",
    rating: 5,
    status: "Pending",
  },
  {
    Date: "01-01-2023",
    buyerName: "Emeka Nzekwe",
    productName: "Water Bottle",
    rating: 5,
    status: "Pending",
  },
  {
    Date: "01-01-2023",
    buyerName: "Emeka Nzekwe",
    productName: "Water Bottle",
    rating: 5,
    status: "Pending",
  },
  {
    Date: "01-01-2023",
    buyerName: "Emeka Nzekwe",
    productName: "Water Bottle",
    rating: 5,
    status: "Pending",
  },
  {
    Date: "01-01-2023",
    buyerName: "Emeka Nzekwe",
    productName: "Water Bottle",
    rating: 5,
    status: "Pending",
  },
  {
    Date: "01-01-2023",
    buyerName: "Emeka Nzekwe",
    productName: "Water Bottle",
    rating: 5,
    status: "Pending",
  },
];

export const catArr = [
  {
    label: "Bags",
    value: "Bags",
  },
  {
    label: "Shoes",
    value: "Shoes",
  },
  {
    label: "stationery",
    value: "stationery",
  },
  {
    label: "glasses",
    value: "glasses",
  },
  {
    label: "shirts",
    value: "shirts",
  },
];

export const flashSalesHistoryArr: Flashsales[] = [
  {
    title:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    PCount: 50,
    SCount: 0,
    startDate: "01-10-2023",
    endDate: "31-10-2023",
    status: "Coming Soon",
    sales: 0,
  },
  {
    title:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    PCount: 50,
    SCount: 0,
    startDate: "01-10-2023",
    endDate: "31-10-2023",
    status: "Coming Soon",
    sales: 0,
  },
  {
    title:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    PCount: 50,
    SCount: 0,
    startDate: "01-10-2023",
    endDate: "31-10-2023",
    status: "Coming Soon",
    sales: 0,
  },
  {
    title:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    PCount: 50,
    SCount: 0,
    startDate: "01-10-2023",
    endDate: "31-10-2023",
    status: "Coming Soon",
    sales: 0,
  },
  {
    title:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    PCount: 50,
    SCount: 239,
    startDate: "01-05-2023",
    endDate: "31-05-2023",
    status: "Ongoing",
    sales: 785500,
  },
  {
    title:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    PCount: 50,
    SCount: 645,
    startDate: "01-07-2023",
    endDate: "14-07-2023",
    status: "Ended",
    sales: 785500,
  },
  {
    title:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    PCount: 50,
    SCount: 645,
    startDate: "01-07-2023",
    endDate: "14-07-2023",
    status: "Ended",
    sales: 785500,
  },
  {
    title:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    PCount: 50,
    SCount: 645,
    startDate: "01-07-2023",
    endDate: "14-07-2023",
    status: "Ended",
    sales: 785500,
  },
  {
    title:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    PCount: 50,
    SCount: 645,
    startDate: "01-07-2023",
    endDate: "14-07-2023",
    status: "Ended",
    sales: 785500,
  },
  {
    title:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    PCount: 50,
    SCount: 645,
    startDate: "01-07-2023",
    endDate: "14-07-2023",
    status: "Ended",
    sales: 785500,
  },
  {
    title:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    PCount: 50,
    SCount: 645,
    startDate: "01-07-2023",
    endDate: "14-07-2023",
    status: "Ended",
    sales: 785500,
  },
  {
    title:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    PCount: 50,
    SCount: 645,
    startDate: "01-07-2023",
    endDate: "14-07-2023",
    status: "Ended",
    sales: 785500,
  },
  {
    title:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    PCount: 50,
    SCount: 645,
    startDate: "01-07-2023",
    endDate: "14-07-2023",
    status: "Ended",
    sales: 785500,
  },
  {
    title:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    PCount: 50,
    SCount: 645,
    startDate: "01-07-2023",
    endDate: "14-07-2023",
    status: "Ended",
    sales: 785500,
  },
  {
    title:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    PCount: 50,
    SCount: 645,
    startDate: "01-07-2023",
    endDate: "14-07-2023",
    status: "Ended",
    sales: 785500,
  },
  {
    title:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    PCount: 50,
    SCount: 645,
    startDate: "01-07-2023",
    endDate: "14-07-2023",
    status: "Ended",
    sales: 785500,
  },
];

export const inventoryArr: Inventory[] = [
  {
    itemName:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    stock: 72,
    category: "Stationery",
    subCategory: "Commemorative Notebook",
    date: "10/02/2023",
  },
  {
    itemName:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    stock: 72,
    category: "Stationery",
    subCategory: "Commemorative Notebook",
    date: "10/02/2023",
  },
  {
    itemName:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    stock: 72,
    category: "Stationery",
    subCategory: "Commemorative Notebook",
    date: "10/02/2023",
  },
  {
    itemName:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    stock: 72,
    category: "Stationery",
    subCategory: "Commemorative Notebook",
    date: "10/02/2023",
  },
  {
    itemName:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    stock: 72,
    category: "Stationery",
    subCategory: "Commemorative Notebook",
    date: "10/02/2023",
  },
  {
    itemName:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    stock: 72,
    category: "Stationery",
    subCategory: "Commemorative Notebook",
    date: "10/02/2023",
  },
  {
    itemName:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    stock: 72,
    category: "Stationery",
    subCategory: "Commemorative Notebook",
    date: "10/02/2023",
  },
  {
    itemName:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    stock: 72,
    category: "Stationery",
    subCategory: "Commemorative Notebook",
    date: "10/02/2023",
  },
  {
    itemName:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    stock: 72,
    category: "Stationery",
    subCategory: "Commemorative Notebook",
    date: "10/02/2023",
  },
  {
    itemName:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    stock: 72,
    category: "Stationery",
    subCategory: "Commemorative Notebook",
    date: "10/02/2023",
  },
  {
    itemName:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    stock: 72,
    category: "Stationery",
    subCategory: "Commemorative Notebook",
    date: "10/02/2023",
  },
  {
    itemName:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    stock: 72,
    category: "Stationery",
    subCategory: "Commemorative Notebook",
    date: "10/02/2023",
  },
  {
    itemName:
      "Independence  Day Commemorative Notebook: The rest of the product Name goes here",
    stock: 72,
    category: "Stationery",
    subCategory: "Commemorative Notebook",
    date: "10/02/2023",
  },
];

export const tableArr: Table[] = [
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
  {
    name: "Oluwashola Adamu",
    email: "emailemailemail@fbn.com",
    date: "25 Jan 2022",
  },
];
