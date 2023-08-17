import { Heading } from "@chakra-ui/react";
export default function Header(props: { title: string }) {
  return (
    <Heading as="h1" p={4} textAlign={"center"} color={"purple.500"}>
      {props.title}
    </Heading>
  );
}
