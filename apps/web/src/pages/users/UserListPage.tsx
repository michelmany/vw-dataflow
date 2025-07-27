import { useUsers } from '@libs/hooks';
import { Container } from '@libs/ui';
import { useNavigate } from 'react-router-dom';
import { UserDataTable } from '../../features/users/components/UserDataTable';

export function UserListPage() {
  const { users } = useUsers();
  const navigate = useNavigate();

  return (
    <Container>
      <h1 className="text-4xl text-center font-bold text-gray-900 mb-8">
        Welcome to VW Dataflow
      </h1>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">Users</h1>
      </div>

      <UserDataTable data={users} />
    </Container>
  );
}
