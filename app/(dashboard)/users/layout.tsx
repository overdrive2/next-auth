import { UserDialogProvider } from "@/providers/user-dialog-provider";

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
   return (
     <>
      <UserDialogProvider />
      {children}
     </>
   )
 }
 
 export default UsersLayout; 