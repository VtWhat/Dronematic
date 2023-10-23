import Link from "next/link";
import DronematicLogo from "./DronematicLogo";
import LogoutButton from "./LogoutButton";

export default function NavBar(props: { email: string | undefined}) {
    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
                <Link
                    href={{
                        pathname: '/home',
                    }}
                >
                    <DronematicLogo />
                </Link>
                <div className="flex items-center gap-4 text-black">
                Olá, {props.email}!
                <LogoutButton />
                </div>
            </div>
      </nav>
    )
  }
  