"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store, useAppSelector } from "@/store";
import { useGetMe } from "@/hooks/auth";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  // We call getMe only if we have an access token (indicating we're logged in)
  const isEnabled = !!accessToken;

  // useGetMe hook handles the actual dispatch to Redux on success
  useGetMe(isEnabled);

  return <>{children}</>;
};

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthInitializer>{children}</AuthInitializer>
      </PersistGate>
    </Provider>
  );
}
