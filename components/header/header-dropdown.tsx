import { handleLogoutError } from "@/errors/logout-error";
import { logout } from "@/firebase/client/mutations/auth";
import useAuth from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "../spinner";
import { Badge } from "../ui/badge";
import Avatar from "./avatar";

function HeaderDropdown() {
  const { authUser, userDetails } = useAuth();
  const { toast } = useToast();

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onError: (error: any) =>
      toast({
        variant: "destructive",
        title: handleLogoutError(error.code),
      }),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar
          name={
            authUser?.displayName ||
            `${userDetails?.first_name} ${userDetails?.last_name}` ||
            ""
          }
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="flex flex-col items-start gap-2">
          <div className="flex flex-wrap gap-1">
            {userDetails?.role.map((item, index) => (
              <Badge key={index} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
          <span>{authUser?.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className="w-full" href="/settings/profile">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" href="/settings/security">
            Security
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logoutMutation.mutate()}>
          {logoutMutation.isPending && (
            <Spinner className="mr-1 h-5 w-5 text-white" />
          )}
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default HeaderDropdown;
