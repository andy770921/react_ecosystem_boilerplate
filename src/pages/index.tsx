import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Index = () => {
  const { data: productData } = useQuery<{ data: { title: string }[] }>(['products', 'all']);

  return (
    <div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/contacts/uk?message=help me">To Contact UK</Link>
        <Link to="/contacts/tw?message=995">To Contact TW</Link>
      </div>
      <h1>home page</h1>
      <ul>
        {productData?.data.map(({ title }, idx) => (
          <li key={title + idx}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
