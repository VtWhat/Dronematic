"use client"

import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js';

export default function FormCliente() {
       

    return (
        <div className="w-full flex flex-col items-center">
            <div className="form-widget flex flex-col gap-3">
                <div className="flex flex-col">
                    <label htmlFor="nome">Nome Completo: </label>
                    <input 
                        id="nome" 
                        type="text"
                        className="bg-zinc-200 rounded-md px-2"
                        //onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Email de contato: </label>
                    <input 
                        id="email" 
                        type="text" 
                        className="bg-zinc-200 rounded-md px-2"
                        //onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="telefone">Telefone de contato: </label>
                    <input 
                        id="telefone" 
                        type="number" 
                        className="bg-zinc-200 rounded-md px-2"
                        //onChange={(e) => setTelefone(e.target.value)}
                    />
                </div>
            <div>
                <button
                    className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-white"
                    //onClick={() => handleSubmit( nome, email, telefone )}
                >
                    Cadastrar
                </button>
            </div>
            </div>
        
        </div>
    )
}
