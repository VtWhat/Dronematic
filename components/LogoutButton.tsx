export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <button className="py-2 px-4 rounded-md no-underline bg-black hover:bg-green-900 text-white">
        Logout
      </button>
    </form>
  )
}
