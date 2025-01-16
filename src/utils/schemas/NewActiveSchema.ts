import { z } from "zod";

export const newActiveSchema = z.object({
  domain: z.string().min(1, "O domínio é obrigatório"),
  severity: z.string().optional(),
  type: z.string().min(1, "Selecione um tipo"),
  email: z.string().optional(),
  description: z.string().optional(),
  assetIps: z.array(
    z.object({
      id: z.string().optional(),
      ip: z.string().min(1, "O IP é obrigatório"),
      assetIpPorts: z.array(
        z.object({
          id: z.string().optional(),
          port: z
            .string()
            .min(1, "A porta é obrigatória")
            .refine((val) => {
              const portNumber = parseInt(val, 10);
              return portNumber >= 0 && portNumber <= 65535;
            }, "A porta deve ser um número entre 0 e 65535"),
        })
      ),
    })
  ),
});

export type NewActiveValues = z.infer<typeof newActiveSchema>;
