import Text from "@components/text";
import { PropsWithChildren } from "react";
import { Form as Root } from "./Form";
import Button from "./button";
import { Input } from "./input";

const ErrorMessage = ({ children }: PropsWithChildren) => (<Text fontSize='10' color='red.600'>{children}</Text>)
const Label = ({ children }: PropsWithChildren) => (<Text fontSize='12'>{children}</Text>)
const HelperText = ({ children }: PropsWithChildren) => (<Text fontSize='10' color='blue.600'>{children}</Text>)


export const Form = {
  ErrorMessage,
  Label,
  HelperText,

  Root,
  Input,
  Button
}
export {
  Button, ErrorMessage, HelperText, Input, Label, Root
};
