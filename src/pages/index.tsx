import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Index: FC = () => {
  const { data: repoData } = useQuery<{ id: number; name: string }[]>(['user/repos']);

  return (
    <div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/contacts/uk?message=help me">To Contact UK</Link>
        <Link to="/contacts/tw?message=995">To Contact TW</Link>
      </div>
      <h1>home page</h1>
      <ul>
        {repoData?.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
