import { useState, FC } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import FolderTree, { BaseTreeConfig } from '../components/FolderTree';

const treeConfig = [
  {
    id: '1',
    name: 'Option 1',
    children: [
      {
        id: '1-1',
        name: 'Option 1-1',
        children: [
          {
            id: '1-1-1',
            name: 'Option 1-1-1',
          },
        ],
      },
      {
        id: '1-2',
        name: 'Option 1-2',
      },
    ],
  },
  {
    id: '2',
    name: 'Option 2',
  },
];

const Contact: FC = () => {
  const { contactId } = useParams();
  const [searchParamsInstance] = useSearchParams();
  const [selectedList, setSelectedList] = useState<BaseTreeConfig['id'][]>([]);

  return (
    <div>
      <Link to="/">To Home</Link>
      <h1>
        contact {contactId}: {searchParamsInstance.get('message')}
      </h1>
      <h3>Selected ID List: {selectedList.join(',')} </h3>
      <FolderTree
        config={treeConfig}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
      />
    </div>
  );
};

export default Contact;
