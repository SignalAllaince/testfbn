// import * as CryptoJS from "crypto-js";

// export const decryptResponse = (body: string) => {
//   const cipher = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(body));
//   const key = CryptoJS.lib.WordArray.create(
//     new Uint8Array([
//       47, 21, 93, 79, 222, 129, 39, 96, 105, 244, 50, 31, 80, 5, 101, 48,
//     ]) as unknown as number[]
//   );

//   const iv = CryptoJS.lib.WordArray.create(
//     new Uint8Array([
//       119, 12, 100, 5, 56, 0, 208, 140, 23, 170, 7, 209, 87, 167, 178, 255,
//     ]) as unknown as number[]
//   );

//   const decrypted = CryptoJS.AES.decrypt(cipher, key, {
//     iv: iv,
//   });
//   const plainText = decrypted.toString(CryptoJS.enc.Utf8);

//   return plainText;
// };
const defaultDuration = 500;

export const sleep = (duration = defaultDuration): Promise<undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, duration);
  });
};

export const block = (duration = defaultDuration) => {
  const start = performance.now();
  while (performance.now() < start + duration) {
    /* empty */
  }
};

export const makeExpensive = <T extends (..._args: any[]) => any>(
  fn: T,
  duration = defaultDuration
): ((..._args: Parameters<T>) => ReturnType<T>) => {
  return (...args: Parameters<T>): ReturnType<T> => {
    block(duration);
    return fn(...args);
  };
};

export class Timer {
  public timerId: any;
  private remaining;
  private start;

  constructor(public callback: Function, public delay: number) {
    this.delay = delay;
    this.remaining = delay;
    this.start = delay;
    this.callback = callback;
  }

  pause = () => {
    if (this.timerId) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
      this.remaining -= Date.now() - this.start;
      // console.log(this.remaining, "remains");
    }
  };

  play = () => {
    if (this.timerId) {
      return;
    }

    this.start = Date.now();
    // console.log(this.start);
    this.timerId = window.setTimeout(this.callback, this.remaining);
  };
}

export class Clock {
  private timer: any = null;

  constructor(public template: string) {
    this.template = template;
  }
  render = () => {
    let date = new Date();

    let hours = String(date.getHours());
    if (+hours < 10) hours = "0" + hours;

    let mins = String(date.getMinutes());
    if (+mins < 10) mins = "0" + mins;

    let secs = String(date.getSeconds());
    if (+secs < 10) secs = "0" + secs;

    let output = this.template
      .replace("h", hours)
      .replace("m", mins)
      .replace("s", secs);

    console.log(output);
  };

  stop = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
  };

  start = () => {
    if (!this.timer) {
      this.render();
      this.timer = setInterval(this.render, 1000);
    }
  };
}

export function stringifyCategory(category: string) {
  return category.split("-").join(" ");
}

export function getAllCategories() {
  const categories = [
    "branch",
    "stationery",
    "uniform",
    "others",
    "office-equipment",
    "home-appliance",
  ];

  return categories.map((category) => {
    return {
      params: {
        category,
      },
    };
  });
}

export function getAllCategoriesProduct() {
  const categories = [
    "branch",
    "stationery",
    "uniform",
    "others",
    "office-equipment",
    "home-appliance",
  ];

  return categories.map((category) => {
    return {
      params: {
        category,
        productId: "umbrella",
      },
    };
  });
}

export const compose =
  (...functions: Function[]) =>
  (initialValue: string) =>
    functions.reduceRight((acc, fn) => fn(acc), initialValue);

export const pipe =
  (...functions: Function[]) =>
  (initialValue: number | string) =>
    functions.reduce((acc, fn) => fn(acc), initialValue);

export const sluggify = (text: string, seperator: string): string => {
  const slug = text ? text.split(seperator).join("-").toLowerCase() : "";

  return slug;
};

export const replaceMultiSpace = (str: string, delimiter = "-") => {
  const transformedStr = str.replace(/\s\s+/g, " ");

  return transformedStr.trim().split(" ").join(delimiter).toLowerCase();
};

export const numberFormat = new Intl.NumberFormat("en-US");

export const stripString = (str: string) =>
  str ? str.replace(/[^a-zA-Z0-9 ]/g, "") : "";

export const truncateWord = (str: string, len = 30) => {
  if (str.trim().length < len) return str;

  return `${str.substring(0, len - 1)}..`;
};

export const formatCurrency = (
  amount: string | number,
  showCurrency = true
) => {
  if (!amount) return "₦ 0.00";
  const value = +amount;
  return `${showCurrency ? "₦ " : ""}${value.toLocaleString()}`;
};

export const formatErrors = (error: Record<string, string[]>) => {
  if (!error) return null;
  const keys = Object.keys(error);
  const errorText = keys?.map((err) => error[err]);
  return errorText.join(". ");
};
