import { styled } from "@nextui-org/react";

export const SLabel = styled("label", {
  display: "block",
  fontSize: "14px",
  fontWeight: "$normal",
  color: "$primary",
  marginBottom: "0.250rem",
});

export const SSelect = styled("select", {
  padding: "0.5rem 0.5rem",
  width: "100%",
  borderColor: "$border",
  borderRadius: "14px",
  borderWidth: "2px",
  color: "$primary",
  "&:focus": {
    borderColor: "$primary",
  },
  "&:hover": {
    borderColor: "$primary",
    borderWidth: "2px",
  },
  option: {
    color: "$secondary",
  },
});
