// 'use client'
// import { useCallback, useEffect, useState } from 'react'
// import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function FormCliente() {
    // const supabase = createClientComponentClient()
    // const user = session?.user

     const nome = ''
     const email = ''
     const telefone = ''

    // async function insertCliente({ nome, email, telefone }) {
    //     try {

    //     let { error } = await supabase.from('clientes').insert({
    //         id: user?.id,
    //         nome: nome,
    //         email: email,
    //         telefone: telefone,
    //         inserted_at: new Date().toISOString(),
    //     })
    //     if (error) throw error
    //     alert('Cliente Cadastrado com sucesso!!')
    //     } catch (error) {
    //     alert('Erro ao cadastrar cliente!')
    //     }
    // }

    return (
        <div className="w-full flex flex-col items-center">
            <div className="form-widget flex flex-col gap-3">
                <div className="flex flex-col">
                <label htmlFor="nome">Nome Completo: </label>
                <input 
                id="nome" 
                type="text"
                value={nome}
                className="bg-zinc-200 rounded-md px-2"
                //onChange={(e) => setNome(e.target.value)}
                />
                </div>
                <div className="flex flex-col">
                <label htmlFor="email">Email de contato: </label>
                <input 
                id="email" 
                type="text" 
                value={email}
                className="bg-zinc-200 rounded-md px-2"
                //onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className="flex flex-col">
                <label htmlFor="telefone">Telefone de contato: </label>
                <input 
                id="telefone" 
                type="number" 
                value={telefone}
                className="bg-zinc-200 rounded-md px-2"
                //onChange={(e) => setTelefone(e.target.value)}
                />
                </div>
            <div>
                <button
                    className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-white"
                    //onClick={() => insertCliente({ nome, email, telefone })}
                >
                    Cadastrar
                </button>
            </div>
            </div>
        
        </div>
    )
}
