import { FC, useState, MouseEventHandler, SetStateAction, Dispatch } from 'react';

export interface BaseTreeConfig {
  id: string;
  name: string;
  children?: BaseTreeConfig[];
}

export interface FolderTreeProps {
  config: BaseTreeConfig[];
  selectedList: BaseTreeConfig['id'][];
  setSelectedList: Dispatch<SetStateAction<BaseTreeConfig['id'][]>>;
}

const ExpandToggle: FC<{ isExpanded: boolean; onClick: MouseEventHandler<HTMLButtonElement> }> = ({
  isExpanded,
  onClick,
}) => <button onClick={onClick}>{isExpanded ? '[-]' : '[+]'}</button>;

const FolderTree: FC<FolderTreeProps> = ({ config, selectedList, setSelectedList }) => {
  const [expandedIdList, setExpandedIdList] = useState<BaseTreeConfig['id'][]>([]);

  const makeChangeHandler =
    (targetId: BaseTreeConfig['id'], setFn: Dispatch<SetStateAction<BaseTreeConfig['id'][]>>) =>
    () => {
      setFn((prevList: BaseTreeConfig['id'][]) => {
        if (prevList.includes(targetId)) {
          return prevList.filter((id) => id !== targetId);
        } else {
          return [...prevList, targetId];
        }
      });
    };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {config.map(({ id, name, children }) => {
        const isExpanded = expandedIdList.includes(id);
        const hasChildren = children !== undefined;
        return (
          <div key={id} style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
            <input
              id={id.toString()}
              type="checkbox"
              checked={selectedList.includes(id)}
              onChange={makeChangeHandler(id, setSelectedList)}
            />
            <label htmlFor={id.toString()}>{name}</label>
            {hasChildren && (
              <ExpandToggle
                isExpanded={isExpanded}
                onClick={makeChangeHandler(id, setExpandedIdList)}
              />
            )}
            <div style={{ width: '100%', marginLeft: '20px' }}>
              {isExpanded && hasChildren && (
                <FolderTree
                  config={children}
                  selectedList={selectedList}
                  setSelectedList={setSelectedList}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FolderTree;
