import { createClient } from "../lib/supabase/server"

export default async function Page() {
  const supabase = await createClient()

  // Auth status
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  // Connection check
  const { data: todos, error: todosError } = await supabase.from('todos').select('*')

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold text-liberal">
        Tailwind Check
      </h1>

      {/* debug stuff */}

      <div className="bg-gray-100 p-4 rounded">
        <p>User { user ? user.email : "Not authenticated"}</p>
        <p>Todos count { todos?.length || 0}</p>
        {todosError && <p className="text-red-500">{todosError.message}</p>}
      </div>

      <ul className="list-disc">
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id} className="text-lg">
              {todo.content}
            </li>
          ))
        ) : (
          <p className="text-gray-600">No todos found.</p>
        )}
      </ul>
    </main>    
  );
}
