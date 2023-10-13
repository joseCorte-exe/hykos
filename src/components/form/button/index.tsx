import { Button as NBButton } from "native-base";
import { InterfaceButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";

export default function Button({ children, ...rest }: InterfaceButtonProps) {
  return (
    <NBButton
      flexDir='row'
      shadow='none'
      paddingLeft='4'
      paddingRight='4'
      _text={{ color: 'white' }}
      _spinner={{ color: 'white' }}
      _light={{ background: 'primary.100' }}
      _dark={{ background: 'primary.100' }}
      borderRadius='lg'
      {...rest}
    >
      {children}
    </NBButton >
  )
}
