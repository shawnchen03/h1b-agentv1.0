'use client';

import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function LogoutButton() {
  return (
    <Button
      asChild
      variant="ghost"
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      <Link href="/api/auth/logout">
        Logout
      </Link>
    </Button>
  );
} 