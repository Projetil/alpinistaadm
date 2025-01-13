import { z } from "zod";

export const newActiveSchema = z.object({
    domain: z.string().min(1, "O domínio é obrigatório"),
    severity: z.string().min(1, "Selecione uma severidade"),
    type: z.string().min(1, "Selecione um tipo"),
    email: z.string().email("E-mail inválido").optional(),
    description: z.string().min(1, "A descrição é obrigatória"),
  });
  
  export type NewActiveValues = z.infer<typeof newActiveSchema>;