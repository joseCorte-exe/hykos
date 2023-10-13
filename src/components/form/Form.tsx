import { WithChildren } from "@shared/types";

type FormType = {
}

export function Form({ children }: WithChildren<FormType>) {
  return (
    <>{children}</>
  )
}