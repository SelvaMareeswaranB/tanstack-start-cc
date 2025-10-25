import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/user/$id")({
  component: RouteComponent,
  notFoundComponent: () => <h1>This is not an user</h1>,
  errorComponent:({error})=><p>{String(error)}</p>,
  pendingComponent:()=><p>loading</p>,
  loader: async ({ params }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${params.id}`
    );
    if(!res.ok){
      throw new Error("Failed to fetch user")
    }
    const user = await res.json();
    if (!user.id) throw notFound();
    return user;
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const data = Route.useLoaderData();
  console.log(data);
  return <div>Hello "/user" {id} with {data.username}!</div>;
}
