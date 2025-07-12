export default function UserList({ users }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Connected Users</h2>
      <ul className="space-y-1">
        {users.map((user, i) => (
          <li key={i} className="bg-gray-700 px-3 py-1 rounded">{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
