import { getUserById } from '@libs/services';
import { User } from '@libs/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getUserById(Number(id))
      .then((data: User) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <section className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      {/* <UserShowcase user={user} /> */}
    </section>
  );
}

export default UserDetailPage;
