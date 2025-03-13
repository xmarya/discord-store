import { discordSignIn } from "@/_actions/authActions";
import { FaDiscord } from "react-icons/fa";

export default function Login() {
  return (
    <div>
      <h3>تسجيل باستخدام Discord</h3>
      <form action={discordSignIn}>
        <button>
          <FaDiscord />
        </button>
      </form>
    </div>
  );
}
