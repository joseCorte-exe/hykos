import { Text as NBText } from "native-base";
import { InterfaceTextProps } from "native-base/lib/typescript/components/primitives/Text/types";

export default function Text({ children, ...rest }: InterfaceTextProps) {
  return (
    <NBText fontSize={12} color='black' {...rest}>
      {children}
    </NBText>
  )
}