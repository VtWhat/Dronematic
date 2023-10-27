'use client'

import Link from "next/link";
import DronematicLogo from "./DronematicLogo";

import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/navbar";
import {Button, ButtonGroup} from "@nextui-org/button";
import { Session } from "@supabase/auth-helpers-nextjs";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";

export default function NavBar({ session }: { session: Session | null }) {
    return (
        <Navbar shouldHideOnScroll isBordered classNames={{base: "bg-white"}}>
            <NavbarBrand>
                <DronematicLogo />
            </NavbarBrand>
            <NavbarContent justify="end">
                {session ? (
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="success"
                            name="Dronematic"
                            size="sm"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Logado como</p>
                            <p className="font-semibold">{session.user.email}</p>
                            </DropdownItem>
                            <DropdownItem key="settings">Meus Dados</DropdownItem>
                            <DropdownItem key="configurations">Configurações</DropdownItem>
                            <DropdownItem key="analytics">Analytics</DropdownItem>
                            <DropdownItem key="help_and_feedback">Ajuda & Feedback</DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                <form action="/auth/sign-out" method="post">
                                    <button type="submit">
                                        Sair
                                    </button>
                                </form>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
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
  