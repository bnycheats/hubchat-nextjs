"use client";

import { createContext, type PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { useState } from "react";

import useAuth from "@/hooks/useAuth";
import Spinner from "@/components/spinner";

import { RolesEnums } from "@/helpers/types";
import { AiOutlineAppstore, AiOutlineTeam } from "react-icons/ai";

import Header from "@/components/header";
import { type MenuModelType } from "@/components/menu";
import Sidebar from "@/components/sidebar";
import { type GetCompanyResponse } from "@/firebase/client/queries/companies/types";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "@/firebase/client/queries/companies";

export const PrivateContext = createContext<PrivateContextType>({
  companies: {} as Array<GetCompanyResponse>,
});

export type PrivateContextType = {
  companies: Array<GetCompanyResponse>;
};

export const PrivateProvider = (props: PrivateProviderProps) => {
  const { companies: initialData, children } = props;
  const { loading, authUser, userDetails } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: companies } = useQuery({
    queryKey: ["PrivateCompanies"],
    queryFn: async () => getCompanies(),
    initialData,
  });

  const menuItems: MenuModelType[] = getMenus(userDetails?.role);

  if (loading) return <Spinner centered fullScreen />;

  if (!authUser) redirect("/login");

  return (
    <PrivateContext.Provider value={{ companies }}>
      <section className="flex h-screen overflow-hidden">
        <Sidebar
          model={menuItems}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-[968px] px-4 py-4 xl:px-0">
              {children}
            </div>
          </main>
        </div>
      </section>
    </PrivateContext.Provider>
  );
};

function getMenus(role?: Array<RolesEnums>): MenuModelType[] {
  return [
    {
      label: "MENU",
      items: [
        {
          itemKey: "dashboard",
          to: "/dashboard",
          label: "Dashboard",
          icon: <AiOutlineAppstore />,
        },
        {
          hidden: !role?.includes(RolesEnums.ADMIN),
          itemKey: "users",
          to: "/users",
          label: "Users",
          icon: <AiOutlineTeam />,
        },
      ],
    },
  ];
}

type PrivateProviderProps = PropsWithChildren & {
  companies: Array<GetCompanyResponse>;
};
