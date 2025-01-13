import { z } from "zod";

export const newActiveSchema = z.object({
  domain: z.string().min(1, "O domínio é obrigatório"),
  severity: z.string().min(1, "Selecione uma severidade"),
  type: z.string().min(1, "Selecione um tipo"),
  email: z.string().optional(),
  description: z.string().min(1, "A descrição é obrigatória"),
  assetIps: z.array(
    z.object({
      id: z.string().optional(),
      ip: z.string().min(1, "O IP é obrigatório"),
      assetIpPorts: z.array(
        z.object({
          id: z.string().optional(),
          port: z.string().min(1, "A porta é obrigatória"),
        })
      ),
    })
  ),
});

export type NewActiveValues = z.infer<typeof newActiveSchema>;
