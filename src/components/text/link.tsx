import { Link as RLink } from 'expo-router'
import { LinkProps } from 'expo-router/build/link/Link'
import { Text } from "native-base"
import { InterfaceTextProps } from 'native-base/lib/typescript/components/primitives/Text/types'

type LinkType = React.PropsWithChildren<{} & LinkProps & InterfaceTextProps>

export function Link({ children, href, ...rest }: LinkType) {
  return (
    <RLink href={href}>
      <Text fontSize={12} color='darkBlue.600' {...rest as InterfaceTextProps}>
        {children}
      </Text>
    </RLink>
  )
}
