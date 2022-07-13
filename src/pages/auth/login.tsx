import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { Button, Card, Input, Text } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../../components/layout";
import { Box } from "../../styles/TableStyles";

type FormData = {
  password: string;
  username: string;
};

const Login = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setDisabled(true);
    setShowError(false);
    const { username, password } = data;
    const res = await signIn("credentials", {
      password,
      username,
      redirect: false,
    });

    if (res?.ok) {
      setTimeout(() => {
        setDisabled(false);
        router.push("/");
      }, 2000);
    } else {
      setShowError(true);
    }

    setDisabled(false);
  };

  return (
    <AuthLayout title="Laboratorio Blancarte">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Card
          css={{
            maxWidth: "480px",
            minWidth: "320px",
            p: 20,
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <Text h3 weight="bold" css={{ textAlign: "center" }}>
            Login
          </Text>

          {showError && (
            <Box
              css={{
                my: 20,
                bg: "$error",
                borderRadius: "10px",
              }}
            >
              <Text
                css={{
                  color: "white",
                  fontSize: "0.875rem",
                  gap: "0.5rem",
                  alignItems: "center",
                  d: "flex",
                  jc: "center",
                }}
              >
                <ExclamationCircleIcon className="w-5 h-5" />
                Usuario o contraseña incorrectos
              </Text>
            </Box>
          )}
          <Box
            css={{
              d: "flex",
              fd: "column",
              gap: "2rem",
            }}
          >
            <Input
              bordered
              label="Nombre del Usuario"
              {...register("username")}
              helperText={errors?.username?.message}
              helperColor="error"
              status={errors?.username ? "error" : "primary"}
            />
            <Input.Password
              bordered
              label="Password"
              {...register("password")}
              helperText={errors?.password?.message}
              helperColor="error"
              status={errors?.password ? "error" : "primary"}
            />
            <Button type="submit" color="primary" disabled={disabled}>
              Ingresar
            </Button>
          </Box>
        </Card>
      </form>
    </AuthLayout>
  );
};

export default Login;
