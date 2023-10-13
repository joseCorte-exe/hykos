import { Button as NBButton } from "@components/form";
import { HStack } from "native-base";
import { InterfaceIconButtonProps } from "native-base/lib/typescript/components/composites/IconButton/types";

export function Button({ children, ...rest }: InterfaceIconButtonProps) {
  return (
    <NBButton
      w='full'
      {...rest}
    >
      <HStack alignItems='center' space='2'>
        {children}
      </HStack>
    </NBButton>
  )
}
