import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { styled } from "@nextui-org/react";

export const STable = styled("table", {
  minWidth: "600px",
  borderSpacing: 0,
});

export const SHeader = styled("thead", {
  backgroundColor: "#f5f5f5",
  fontSize: "14px",
});

export const SHeaderLabel = styled("tr", {
  bgColor: "$primary",
  color: "$white",
  ":first-child": {
    borderTopLeftRadius: "12px",
    borderBottomLeftRadius: "12px",
    border: "1px solid $primary",
  },
  ":last-child": {
    borderTopRightRadius: "12px",
    borderBottomRightRadius: "12px",
    border: "1px solid $primary",
  },
  textAlign: "center",
});

export const SBody = styled("tbody", {
  backgroundColor: "tramsparent",
  fontSize: "14px",
  textAlign: "center",
});

export const STH = styled("th", {
  height: "2.5rem",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textTransform: "capitalize",
});

export const STD = styled("td", {
  padding: "0.5rem",
  color: "$gray900",
  fontSize: "16px",
  textTransform: "capitalize",
});

export const CancelIcon = styled(XCircleIcon, {
  color: "$error",
  height: "1.75rem",
  width: "1.75rem",

  "&:hover": {
    color: "$red700",
  },
});

export const ConfirmIcon = styled(CheckCircleIcon, {
  color: "$success",
  height: "1.75rem",
  width: "1.75rem",
  "&:hover": {
    color: "$green700",
  },
});

export const Box = styled("div", {});

export const ErrorText = styled("p", {
  color: "red",
  fontSize: "10px",
  m: 0,
  ml: "6px",
});
