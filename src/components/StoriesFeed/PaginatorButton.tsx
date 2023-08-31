import { Button } from "@chakra-ui/react";
export default function PaginatorButton(props: {
  text: string;
  onClick: () => void;
  isDisabledRef: boolean;
  colorMode: string;
}) {
  return (
    <Button
      fontSize={{ base: "8px", md: "13px" }}
      size={{ base: "xs", md: "md" }}
      fontWeight={"bold"}
      isDisabled={props.isDisabledRef}
      variant="solid"
      m={2}
      colorScheme={props.colorMode === "dark" ? "gray" : "purple"}
      onClick={() => props.onClick()}
    >
      {props.text}
    </Button>
  );
}
