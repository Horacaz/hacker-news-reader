import { Heading, IconButton, useColorMode, Flex } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
export default function Header(props: { title: string }) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex alignItems={"center"} justifyContent={"center"}>
      <Heading as="h1" p={4} textAlign={"center"} color={"purple.600"}>
        {props.title}
      </Heading>
      <IconButton
        variant={"ghost"}
        aria-label="Toggle dark mode"
        icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
      />
    </Flex>
  );
}
