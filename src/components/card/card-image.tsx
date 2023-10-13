import { Image as NBImage } from "native-base";

export function Image({ src }: { src: string }) {
  return (
    <NBImage source={{ uri: src }} size='md' alt="card-banner" />
  )
}
