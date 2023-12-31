import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const nomec = String(formData.get('nome'))
  const endereco = String(formData.get('end'))
  const telefone = String(formData.get('tel'))
  const supabase = createRouteHandlerClient({ cookies })

  const { data: signupRes, error: signupErr } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  })

  if(!signupErr){
    const { data: userpData, error: userpErr} = await supabase.from('userprofile').insert({
      nome: nomec,
      endereco: endereco,
      telefone: telefone,
      user_id: signupRes.session?.user.id as string,
    })
  }

  if (signupErr) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Não foi possível realizar o cadastro.`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    )
  }
      
  return NextResponse.redirect(
    `${requestUrl.origin}/login?message=Usuário cadastrado.`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  )
}
