// import { z } from "zod";

// export const RegisterUserScheme = z.object({
//   name: z.string(),
//   email: z.string().refine((value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value))
// });

// export type RegisterUserType = z.infer<typeof RegisterUserScheme>;

// Implementação do schema de validação sem usar nenhuma biblioteca
const RegisterUserSchema = {
  safeParse: function (input) {
    const issues = [];

    // Valida se "name" é uma string
    if (typeof input.name !== "string") {
      issues.push({
        path: ["name"],
        message: 'O campo "name" deve ser uma string.'
      });
    }

    // Valida se "email" é uma string
    if (typeof input.email !== "string") {
      issues.push({
        path: ["email"],
        message: 'O campo "email" deve ser uma string.'
      });
    } else {
      // Valida o formato do email utilizando regex
      const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(input.email)) {
        issues.push({
          path: ["email"],
          message: "Formato de email inválido."
        });
      }
    }

    // Se houver algum erro, retorna objeto com success false e os detalhes dos problemas
    if (issues.length > 0) {
      return { success: false, error: { issues } };
    }

    // Se a validação passar, retorna success true e os dados validados
    return { success: true, data: input };
  }
};

// Exemplo de uso:
const inputData = {
  name: "José",
  email: "jose@example.com"
};

const result = RegisterUserSchema.safeParse(inputData);

if (result.success) {
  console.log("Validação bem-sucedida:", result.data);
} else {
  console.error("Erro na validação:", result.error.issues);
}
