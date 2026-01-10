import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import UserButton from "@/modules/auth/components/user-button";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Button>
        Get Started
      </Button>

      {user ? (
        <UserButton user={user} />
      ) : (
        <div className="mt-4 text-gray-700">Not Signed In</div>
      )}
    </div>
  );
}


