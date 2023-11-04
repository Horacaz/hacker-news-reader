import { Heading } from "@chakra-ui/react";
export default function ErrorMessage({ message }: { message: string }) {
  return (
    <>
      <Heading as="h2" fontSize={"xl"} p={2}>
        An error has occurred, please refresh the page and try again in a few
        seconds.
      </Heading>
      <Heading as="h3" fontSize={"xl"} p={2}>
        Error: {message}
      </Heading>
    </>
  );
}
