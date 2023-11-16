import { z } from "zod";

export function mountSchemeErrorMessage<T>(error: string) {
  const data: z.SafeParseError<T> = JSON.parse(error)
  const errors = data.error.issues.at(0)

  return `Erro no campo "${errors?.path.at(0)}": ${errors?.message}`
}