import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResposeType = InferResponseType<typeof client.api.users.$post>;
type RequestType = InferRequestType<typeof client.api.users.$post>["json"]

export const useCreateUser = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation<
   ResposeType,
   Error,
   RequestType
   >({
      mutationFn: async (json) => {
         const response = await client.api.users.$post({ json });
         return await response.json();
      },
      onSuccess: () => {
         toast.success("User created");
         queryClient.invalidateQueries({ queryKey: ["users"] });
      },
      onError: () => {
         toast.error("Failed to create user")
      },
   });

   return mutation;
};