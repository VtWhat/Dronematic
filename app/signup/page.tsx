import Link from 'next/link'
import Messages from '../login/messages'
import Image from 'next/image'

export default function CadastrarUsuario() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-black hover:bg-green-900 flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Voltar
      </Link>


      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action="/auth/sign-up"
        method="post"
      >
        <Image
          src="/dronematic-logo.png"
          width={390}
          height={400}
          alt="Dronematic Logo"
        />
        <label className="text-md text-black" htmlFor="email">
          Nome Completo
        </label>
        <input
          className="rounded-md px-4 py-2 bg-zinc-200 border mb-6 text-black"
          name="nome"
          placeholder="Digite seu Nome completo"
          required
        />
        <label className="text-md text-black" htmlFor="email">
          Endereço
        </label>
        <input
          className="rounded-md px-4 py-2 bg-zinc-200 border mb-6 text-black"
          name="end"
          placeholder="Digite seu Endereço"
          required
        />
        <label className="text-md text-black" htmlFor="email">
          Telefone
        </label>
        <input
          className="rounded-md px-4 py-2 bg-zinc-200 border mb-6 text-black"
          name="tel"
          placeholder="Digite seu Telefone"
          required
        />
        <label className="text-md text-black" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-zinc-200 border mb-6 text-black"
          name="email"
          placeholder="email@gmail.com"
          required
        />
        <label className="text-md text-black" htmlFor="password">
          Senha
        </label>
        <input
          className="rounded-md px-4 py-2 bg-zinc-200 border mb-6 text-black"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        <button
          formAction="/auth/sign-up"
          className="bg-green-900 rounded px-4 py-2 text-white mb-2"
        >
          Criar uma conta
        </button>
        <Link
        href="/login"
        className='text-center text-black text-decoration-line: underline'
        >
          Já possuo uma conta
        </Link>
        <Messages />
      </form>
    </div>
  )
}
