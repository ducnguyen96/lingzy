import { PropsWithChildren } from "react";
import OpenSidebar from "./open-sidebar";

export default function WithOpenSidebar(props: PropsWithChildren) {
  return (
    <>
      <OpenSidebar />
      {props.children}
    </>
  );
}
