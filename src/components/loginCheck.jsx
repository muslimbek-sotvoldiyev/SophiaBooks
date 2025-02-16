"use client"
import Dashboard from "@/components/dashboard/page";
import { usePathname } from "next/navigation";

export default function LoginCheck({ children }) {

    const location = usePathname()

    if (location != "/login") {
        return (
            <div>
                <Dashboard>{children}</Dashboard>
            </div>
        );
    }
    return (
        <div>
            {children}
        </div>
    );
}
