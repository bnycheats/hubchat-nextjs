import { type PropsWithChildren } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Logo from "@/assets/logo.svg";

function AuthLayout(props: PropsWithChildren) {
  return (
    <Card className="absolute left-1/2 top-1/4 w-[400px] -translate-x-1/2">
      <CardHeader className="flex items-center">
        <img className="w-2/4" src={Logo} alt="Logo" />
      </CardHeader>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}

export default AuthLayout;
