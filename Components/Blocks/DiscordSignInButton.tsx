import { discordSignIn } from "@/_actions/auth/discord";
import { Form } from "../UI/Form/Form";
import { FaDiscord } from "react-icons/fa";
import { DiscordButton } from "../UI/Buttons/DiscordButton";

export default function DiscordSignInButton() {
  return (
    <Form action={discordSignIn}>
      <DiscordButton value="discord">
        دخول باستخدام ديسكورد
        <FaDiscord />
      </DiscordButton>
    </Form>
  );
}
