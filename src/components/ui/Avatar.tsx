import React, { FC } from "react";
import { Avatar, Button, Popover, styled, Text } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Div = styled("div", {
  display: "flex",
  alignItems: "center",
  length: 0,
  gap: "4px",
  paddingRight: "40px",
  "&:hover": {
    cursor: "pointer",
    opacity: 0.8,
  },
});

type Props = {
  name: string | undefined;
};

export const AvatarComponent: FC<Props> = ({ name = "" }) => {
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    router.push("/auth/login");
  };

  return (
    <>
      <Popover>
        <Popover.Trigger>
          <Div>
            <Avatar text={name} color="secondary" textColor="white" />
            <Text>{name}</Text>
          </Div>
        </Popover.Trigger>
        <Popover.Content>
          <Button color="warning" onClick={handleLogout}>
            Logout
          </Button>
        </Popover.Content>
      </Popover>
    </>
  );
};
