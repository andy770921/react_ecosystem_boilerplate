import { Link, useParams, useSearchParams } from 'react-router-dom';

const Contact = () => {
  const { contactId } = useParams();
  const [searchParamsInstance] = useSearchParams();

  return (
    <div>
      <Link to="/">To Home</Link>
      <h1>
        contact {contactId}: {searchParamsInstance.get('message')}
      </h1>
    </div>
  );
};

export default Contact;
