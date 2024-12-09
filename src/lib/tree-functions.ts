import { TreeNode } from "../store/types";
import { Asset, Location } from "../components/dashboard/types"

export const buildTree = (locations: Location[], assets: Asset[]): TreeNode[] => {

  const nodeMap = new Map<string, TreeNode>();

  locations.forEach(location => {
    nodeMap.set(location.id, {
      id: location.id,
      name: location.name,
      type: 'location',
      children: [],
      isExpanded: false // como default vem fechado por questões de performance
    });
  });

  assets.forEach(asset => {
    const node: TreeNode = {
      id: asset.id,
      name: asset.name,
      type: asset.sensorType ? 'component' : 'asset',
      sensorType: asset.sensorType,
      status: asset.status,
      children: [],
      isExpanded: false // como default vem fechado por questões de performance
    };
    nodeMap.set(asset.id, node);
  });

  const root: TreeNode[] = [];

  locations.forEach(location => {
    const node = nodeMap.get(location.id);
    if (location.parentId) {
      const parent = nodeMap.get(location.parentId);
      if (parent && node) {
        parent.children?.push(node);
      }
    } else if (node) {
      root.push(node);
    }
  });

  assets.forEach(asset => {
    const node = nodeMap.get(asset.id);
    if (!node) return;

    if (asset.parentId) {
      const parent = nodeMap.get(asset.parentId);
      if (parent) {
        parent.children?.push(node);
      }
    } else if (asset.locationId) {
      const parent = nodeMap.get(asset.locationId);
      if (parent) {
        parent.children?.push(node);
      }
    }
  });

  return root;
};

export const hasEnergyChild = (node: TreeNode): boolean => {
  if (node.type === 'component' && node.sensorType === 'energy') {
    return true
  }
  return node.children?.some(child => hasEnergyChild(child)) ?? false
}

export const hasAlertChild = (node: TreeNode): boolean => {
  if (node.type === 'component' && node.status === 'alert') {
    return true
  }
  return node.children?.some(child => hasAlertChild(child)) ?? false
}
