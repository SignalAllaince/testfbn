import Button from "@/components/button";
import FadeInOut from "@/components/fade";
import CustomInput from "@/components/input";
import useValidateToken from "@/hooks/auth/useValidateToken";
import { Constants } from "@/lib/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type Inputs = {
  token: string;
};
type LogininType = {
  query: any;
  userId: string;
};

const tokenSchema = yup.object({
  token: yup.string().required("Token is required").length(8).trim(),
});

const TokenComp = ({ query, userId }: LogininType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    resolver: yupResolver(tokenSchema),
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const validateToken = useValidateToken(userId, watch("token"));

  const submitLoginRequest: SubmitHandler<Inputs> = () => {
    setIsLoading(true);
    validateToken
      .mutateAsync({})
      .then((res) => {
        setCookie(Constants.token, res.data.data, {
          maxAge: 604800,
        });
        router.replace(
          query?.callbackUrl ? (query?.callbackUrl as string) : "/"
        );
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <FadeInOut>
      <form className="pb-6" onSubmit={handleSubmit(submitLoginRequest)}>
        <div className="space-y-10">
          <CustomInput
            {...register("token", { required: true })}
            errors={errors}
            type="password"
            label="token"
            placeholder="Input token"
            min={8}
            max={8}
            autoComplete="off"
            // value="4783IEDH2893"
          />
          <Button
            isLoading={isLoading}
            variant="primary"
            className="w-full"
            type="submit"
          >
            Validate token
          </Button>
        </div>
      </form>
    </FadeInOut>
  );
};

export default TokenComp;
