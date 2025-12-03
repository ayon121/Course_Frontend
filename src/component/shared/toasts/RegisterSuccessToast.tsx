"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const RegisterSuccessToast = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("accountCreated") === "true") {
      toast.success("You have been created account successfully.");

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("accountCreated");
      router.replace(newUrl.toString());
    }
  }, [searchParams, router]);
  return null;
};

export default RegisterSuccessToast;