import useUsersQuery from "./hooks/useUsersQuery";
import { useUsersContext } from "./UsersProvider";

export default function App() {

  const { users } = useUsersContext();
  const { isFetchLoading } = useUsersQuery();

  return (
    <div style={{ padding: 20 }}>
      <h2>Users Demo</h2>
      <p>{JSON.stringify(isFetchLoading)}</p>
      <div>
        {JSON.stringify(users)}
      </div>
    </div>
  );
}
