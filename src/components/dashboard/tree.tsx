
import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { useQuery } from '@tanstack/react-query'
import useFetchData from '../../hooks/useFetchData'
import { selectedCompany, selectedDashboardButtonAtom, searchItemAtom, treeData } from '../../store/store'

import { hasEnergyChild, hasAlertChild, buildTree } from '../../lib/tree-functions'
import { iconMap } from '../../lib/constants'

import { ChevronRight, ChevronDown, Zap, Search } from 'lucide-react'

import { SelectedDashboardButtonType } from '../../store/types'
import { TreeNode, Asset, Location } from './types'

interface TreeProps {
  setSelectedComponent: (component: TreeNode) => void
  selectedComponent: TreeNode | null
}

const Tree = (
  { setSelectedComponent, selectedComponent }: TreeProps
) => {
  const [company] = useAtom(selectedCompany)
  const [selectedDashboardButton] = useAtom<SelectedDashboardButtonType>(selectedDashboardButtonAtom)
  const [searchItem, setSearchItem] = useAtom(searchItemAtom)
  const [treeDataState, setTreeDataState] = useAtom(treeData)

  const { fetchData } = useFetchData(company)

  const fetchLocations = (): Promise<Location[]> => fetchData('locations', 'Failed to fetch locations');
  const fetchAssets = (): Promise<Asset[]> => fetchData('assets', 'Failed to fetch assets');

  const { data: locations = [], isLoading: loadingLocations } = useQuery<Location[]>({
    queryKey: ['locations', company?.id],
    queryFn: fetchLocations,
    staleTime: 1000 * 60 * 3, // 3 min de cache
  });

  const { data: assets = [], isLoading: loadingAssets } = useQuery<Asset[]>({
    queryKey: ['assets', company?.id],
    queryFn: fetchAssets,
    staleTime: 1000 * 60 * 3,  // 3 min de cache
  });

  useEffect(() => {
    if (!loadingLocations && !loadingAssets) {
      const processedData = buildTree(locations, assets);
      setTreeDataState(processedData);
    }
  }, [locations, assets, loadingLocations, loadingAssets, setTreeDataState]);

  const toggleTreeNode = (nodeId: string) => {
    setTreeDataState(prevData => {
      const updateNodes = (nodes: TreeNode[]): TreeNode[] =>
        nodes.map(node => {
          if (node.id === nodeId) {
            return { ...node, isExpanded: !node.isExpanded };
          }

          if (node.children) {
            return { ...node, children: updateNodes(node.children) };
          }

          return node;
        });

      return updateNodes(prevData);
    });
  };


  const renderTreeNode = (node: TreeNode, level: number = 0) => {
    if (selectedDashboardButton === 'energy') {
      if (node.type === 'component' && node.sensorType !== 'energy') {
        return null
      }
      if (node.type !== 'component' && !hasEnergyChild(node)) {
        return null
      }
    }
    else if (selectedDashboardButton === 'alert') {
      if (node.type === 'component' && node.status !== 'alert') {
        return null
      }
      if (node.type !== 'component' && !hasAlertChild(node)) {
        return null
      }
    }

    if (searchItem && !node.name.toLowerCase().includes(searchItem.toLowerCase())) {
      if (!node.children?.some(child =>
        child.name.toLowerCase().includes(searchItem.toLowerCase())
      )) {
        return null
      }
    }

    function handleNodeClick(node: TreeNode) {
      if (hasChildren && toggleTreeNode(node.id)) {
        return;
      }
      if (node.type === 'component') {
        setSelectedComponent(node);
      }
    }

    const iconSrc = iconMap[node.type] || iconMap['component'];
    const hasChildren = node.children && node.children.length > 0
    const icon = <img src={iconSrc} className='h-4 w-4' />;

    return (
      <div key={node.id} className="ml-4">
        <div
          className={`flex items-center ${selectedComponent?.id !== node.id && "hover:bg-gray-100"} rounded cursor-pointer px-1 ${selectedComponent?.id === node.id && "bg-[#2188FF] text-white "}`}
          onClick={() => handleNodeClick(node)}
        >
          {hasChildren && (
            node.isExpanded ?
              <ChevronDown size={16} className="text-gray-500 mr-2" /> :
              <ChevronRight size={16} className="text-gray-500 mr-2" />
          )}
          {icon}
          <div className="flex items-center ml-2 h-[30px]">
            <span className="text-sm">{node.name}</span>
            {node.type === 'component' && (
              <>
                <span className={`h-2 w-2 ${node.status == "alert" ? "bg-red-500" : "bg-green-500" } text-sm ml-3 rounded-full`}></span>
                {node.sensorType === 'energy' && (
                  <Zap size={14} className="text-yellow-500" />
                )}
              </>
            )}
          </div>
        </div>
        {node.isExpanded && node.children && node.children.length > 0 && (
          <div className="border-l-2 border-gray-200">
            {node.children.map(child => renderTreeNode(child, level + 1)).filter(Boolean)}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Buscar Ativo ou Local"
          className="w-full p-2 pr-10 border rounded"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <Search
          size={18}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>
      <div className="h-[calc(70vh)] overflow-y-auto">
        {treeDataState.map(node => renderTreeNode(node)).filter(Boolean)}
      </div>
    </div>
  )
}

export default Tree