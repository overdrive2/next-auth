/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from "next/navigation";

interface LoginButtonProps {
   children: React.ReactNode;
   mode?: "modal" | "redirect",
   asChild?: boolean;
};

export const LoginButton = ({
   children,
   mode = "redirect",
   asChild
}: LoginButtonProps) => {
   
   const route = useRouter();

   const onClick = () => {
      console.log("LOGIN BUTTON CLICKED")
   }

   if (mode === "modal") {
      return (
         <span>
            TODO: Implement modal
         </span>
      )
   }

   return (
      <span onClick={onClick} className="cursor-pointer">
         {children}
      </span>
   )
}