import { z } from "zod";
import { useNewUser } from "@/features/users/hooks/use-new-user";
import { useCreateUser } from "@/features/users/api/use-create-user";

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { UserForm } from "./user-form";
import { insertUserSchema } from "@/db/schema";

const formSchema = insertUserSchema.pick({
   name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewUserDialog = () => {
   const { isOpen, onClose } = useNewUser();

   const mutation = useCreateUser();

   const onSubmit = (values: FormValues) => {
      mutation.mutate(values, {
         onSuccess: () => {
             onClose();
         }
     });
   }

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogTrigger>Open</DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle className="text-left">User Profile</DialogTitle>
            </DialogHeader>
            <UserForm 
               onSubmit={onSubmit} 
               disabled={mutation.isPending}
               defaultValues={{
                  name: "",
               }}
            />
         </DialogContent>
      </Dialog>
   );
};