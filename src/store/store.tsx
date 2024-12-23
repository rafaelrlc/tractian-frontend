import { atom } from 'jotai';
import { Company, CompanyList, SelectedDashboardButtonType, TreeNode} from './types';

export const selectedCompany = atom<Company>({id: '662fd0ee639069143a8fc387', name: 'Jaguar'});
export const companyList = atom<CompanyList>([])
export const selectedDashboardButtonAtom = atom<SelectedDashboardButtonType>(null);
export const treeData = atom<TreeNode[]>([]);
export const searchItemAtom = atom<string>('');

export const toggleDashboardButtonAtom = atom(
  (get) => get(selectedDashboardButtonAtom),
  (get, set, buttonCode: SelectedDashboardButtonType) => {
    const currentSelection = get(selectedDashboardButtonAtom);
    set(selectedDashboardButtonAtom, currentSelection === buttonCode ? null : buttonCode);
  }
);