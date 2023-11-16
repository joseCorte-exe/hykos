import { Button as NBButton } from "@components/form";
import { HStack } from "native-base";
import { InterfaceButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";

export function Button({ children, ...rest }: InterfaceButtonProps) {
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
