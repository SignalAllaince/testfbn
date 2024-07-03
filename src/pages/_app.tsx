import Icon from "@/components/icon";
import { AuthProvider } from "@/lib/context/auth-provider";
import "@/styles/globals.css";
import { AppPropsWithAuth } from "@/types/component.types";
import { HeartIcon } from "@heroicons/react/20/solid";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

const MyApp = ({ Component, pageProps }: AppPropsWithAuth) => {
  const getLayout = Component.getLayout || ((page) => page);
  const layout = getLayout(<Component {...pageProps} />);

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        maxSnack={2}
        iconVariant={{
          info: (
            <Icon
              IconComp={HeartIcon}
              className="mr-2 text-brand-blue"
              boxSize={6}
            />
          ),
        }}
        autoHideDuration={5000}
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        classes={{
          root: "toast-container",
        }}
      >
        <AuthProvider>{layout}</AuthProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};

export default React.memo(MyApp);

// import { AuthPages, Constants } from "@/lib/constants";
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   if (!AuthPages.includes(pathname)) {
//     const token = request.cookies.get(Constants.token);
//     if (!token?.value) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }
//   return reRouteIftoken(request);
// }

// const reRouteIftoken = (request: NextRequest) => {
//   const token = request.cookies.get(Constants.token);
//   const pathname = request.nextUrl.pathname;
//   if (token?.value && AuthPages.includes(pathname)) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
// };
