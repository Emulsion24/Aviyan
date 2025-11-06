"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const authToken = cookies.find((c) =>
      c.trim().startsWith("auth_token=")
    );

    if (!authToken) {
      router.replace("/login"); // use router.replace instead of window.location
    }
  }, [router]);

  return <>{children}</>;
}
