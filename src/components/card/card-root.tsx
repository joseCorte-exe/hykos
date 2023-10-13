import { VStack } from "native-base";
import { PropsWithChildren } from "react";

export function Root({ children }: PropsWithChildren) {
  return (
    <VStack
      flex='1'
      space='2'
      alignItems='center'
      background='gray.200'
      padding='4'
      borderRadius='lg'
    >
      {children}
    </VStack>
  )
}
