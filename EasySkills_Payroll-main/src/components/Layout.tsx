import React, { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren;
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="h-full w-full bg-white dark:bg-black">{children}</div>;
};

export default Layout;
