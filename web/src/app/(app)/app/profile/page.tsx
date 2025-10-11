import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { CardDescription, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { ShieldCheckIcon } from "lucide-react";
import { prisma } from "~/lib/prisma";
import { Separator } from "~/components/ui/separator";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  const bookmarksCount = await prisma.site.count();

  if (!session?.user) {
    return null;
  }

  const { user } = session; // better DX

  return (
    <div>
      <div className="py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image!} alt={user.name} />
            <AvatarFallback className="text-2xl">
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription className="text-base mt-1">
              {user.email}
            </CardDescription>
            <div className="flex flex-wrap gap-2 mt-3">
              {user.emailVerified && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <ShieldCheckIcon className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="py-6">
        <h2 className="text-lg font-medium mb-4">Statistics</h2>
        <p className="text-muted-foreground">
          You have saved <strong>{bookmarksCount}</strong> bookmarks.
        </p>
      </div>
    </div>
  );
}
