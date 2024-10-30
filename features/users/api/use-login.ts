import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useLogin = (email?: string, password?: string) => {
    const query = useQuery({
      enabled: !!email,
      queryKey: ["login", { email, password }],
      queryFn: async () => {
        const response = await client.api.login.$get({
          param: { email, password },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch account");
        }

        const { data } = await response.json();
        return data;
      }    
    });

    return query;
}