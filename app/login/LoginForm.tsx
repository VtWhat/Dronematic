'use client'

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {Image} from "@nextui-org/image";
import { useState } from "react";
import { EyeSlashFilledIcon } from "@/components/LoginIcons/EyeSlashedFilledIcon";
import { EyeFilledIcon } from "@/components/LoginIcons/EyeFilledIcon";
import Link from "next/link";
import Messages from "./messages";

export default function LoginForm() {
    const router = useRouter()

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className='w-full flex flex-col justify-center items-center mt-16'>
            <Link href="/">
                <Image
                src="/dronematic-logo.png"
                width={390}
                height={400}
                alt="Dronematic Logo"
                />
            </Link>    
            <form
            className="bg-white flex flex-col justify-center items-center py-16 px-24 rounded-xl gap-6 shadow-2xl mt-8"
            action="/auth/sign-in"
            method="post"
            >
                <label className="text-3xl font-sans font-bold text-black">Faça seu Login!</label>

                <Input type="email" label="Email" size="sm" variant="faded" radius="full" name="email"/>
                
                <Input
                label="Senha"
                size="sm"
                variant="faded"
                radius="full"
                name="password"
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
                />

                <Button color="primary" variant="shadow" radius="full" size="lg" type="submit">Entrar</Button>

                <div>
                    <Link
                    href="/signup"
                    className='text-center text-black text-decoration-line: underline'>
                        Não possuo uma conta
                    </Link>
                    <label> | </label>
                    <Link
                    href="#"
                    className='text-center text-black text-decoration-line: underline'>
                        Esqueci minha senha
                    </Link>
                </div>
                <Messages />
            </form>
        </div>
    )
  }
  