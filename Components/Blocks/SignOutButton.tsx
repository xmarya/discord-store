import { logout } from "@/_actions/auth/credentials";
import { Button } from "../UI/Buttons/Button";

export default function SignOutButton() {
  return (
    <form action={logout}>
      <Button>
        <span>تسجيل الخروج</span>
      </Button>
    </form>
  );
}
