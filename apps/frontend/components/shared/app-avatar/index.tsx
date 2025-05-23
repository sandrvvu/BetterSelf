import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";

export default function AppAvatar() {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        className="rounded-none"
        alt="@shadcn"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
