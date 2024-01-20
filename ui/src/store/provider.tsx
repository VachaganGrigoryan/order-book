"use client";

import { PropsWithChildren, useRef } from "react";
import {
  StoreType,
  StoreContext,
  initializeStore,
} from "@/store/index";

function StoreProvider({ children, ...props }: PropsWithChildren) {
  const storeRef = useRef<StoreType>();

  if (!storeRef.current) {
    storeRef.current = initializeStore(props);
  }
  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
