'use client'

import Link from "next/link";
import DronematicLogo from "./DronematicLogo";
import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem } from "@nextui-org/navbar";
import {Button } from "@nextui-org/button";
import { Session } from "@supabase/auth-helpers-nextjs";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";
import {Avatar,} from "@nextui-org/avatar";
import { useRouter } from "next/navigation";

export default function NavBar({ session }: { session: Session | null }) {
    const router = useRouter()

    return (
        <Navbar shouldHideOnScroll isBordered classNames={{base: "bg-white"}}>
            <NavbarBrand>
                <DronematicLogo />
            </NavbarBrand>
            <NavbarContent justify="end">
                {session ? (
                    <><p>{session.user.email}</p>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="success"
                                name="Dronematic"
                                size="sm"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat"
                        //throws unhandled runtime error but still wokrs...
                        onAction={(item) => {
                            if(
                                item.toString() == '/home' ||
                                item.toString() == '/user/update') {
                                    router.push( item.toString() )
                            }}}
                        >
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Logado como</p>
                                <p className="font-semibold">{session.user.email}</p>
                            </DropdownItem>
                            <DropdownItem key="/home">
                                Ir para a Home
                            </DropdownItem>
                            <DropdownItem key="/user/update">
                                Meus Dados
                            </DropdownItem>
                            <DropdownItem key="config">Configurações</DropdownItem>
                            <DropdownItem key="analytics">Analytics</DropdownItem>
                            <DropdownItem key="help">Ajuda & Feedback</DropdownItem>
                            <DropdownItem key="/auth/sign-out" color="danger">
                                <form action="/auth/sign-out" method="post">
                                    <button type="submit">
                                        Sair
                                    </button>
                                </form>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown></>
                ) : (
                    <><NavbarItem>
                        <Button as={Link} color="primary" href="/login" variant="shadow">
                            Login
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" href="/signup" variant="ghost">
                            Cadastrar-se
                        </Button>
                    </NavbarItem></>
                )}
            </NavbarContent>
        </Navbar>
    )
  }
  