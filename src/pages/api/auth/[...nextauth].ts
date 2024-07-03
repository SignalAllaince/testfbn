import { ENDPOINTS } from "@/lib/constants";
import axios, { AxiosResponse } from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userId: {
          label: "userId",
          type: "text",
          placeholder: "enter your userId",
        },
        token: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const data = {
          userId: credentials?.userId,
          token: credentials?.token,
        };
        console.log(data, "data");
        try {
          const response: AxiosResponse<
            CredentialsServerResponseModel<IAuthUserSigninResponse>
          > = await axios.post(
            `${ENDPOINTS.API_BASE_URL}token-validation?UserId=${credentials?.userId}&Token=${credentials?.token}`,
            {}
          );
          console.log(
            `${ENDPOINTS.API_BASE_URL}token-validation?UserId=${credentials?.userId}&Token=${credentials?.token}`,
            "from response"
          );

          return {
            id: credentials?.userId!,
            email: credentials?.userId!,
            accessToken: response.data.data,
          };
        } catch (err: unknown) {
          console.log(err, "from err");
          if (err instanceof Error) {
            throw new Error(err.message, {
              cause: err,
            });
          }
          throw new Error("Authorization failed");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        // @ts-expect-error
        token.accessToken = user.accessToken;
        // @ts-expect-error
        token.accessTokenExpiry = user.accessTokenExpiry;
        token.user = {
          id: user.id,
          image: user.id,
          email: user.email,
        };
        return token;
      }
      return token;
      // Access token has expired, try to update it
    },
    session: async ({ session, token }) => {
      // @ts-expect-error
      session.accessToken = token.accessToken;
      // @ts-expect-error
      session.refreshToken = token.refreshToken;
      // @ts-expect-error
      session.user = token.user;
      return session;
    },
  },
  // @ts-expect-error
  site: process.env.NEXTAUTH_URL,
  session: { strategy: "jwt", maxAge: 1800000 }, // session token expires after 30 mins of user inactivity
  pages: {
    signIn: "/login",
  },
  // events: {
  //   signOut: async ({ token }) => {

  //   },
  // },
});

export type IAuthUserSigninResponse = string;

export type CredentialsServerResponseModel<T> = {
  data: T;
  status: string;
  message: string;
};
