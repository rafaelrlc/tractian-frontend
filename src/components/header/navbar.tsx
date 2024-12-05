import CompanyButton from './company-button';
import { selectedCompany } from '../../store/store';
import LogoImg from "../../assets/file.png";
import { useAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { Company } from '../../store/types';

const Navbar = () => {
  const [selected, setSelected] = useAtom(selectedCompany);

  const { data: companies = [], error, isLoading } = useQuery<Company[]>({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await fetch('https://fake-api.tractian.com/companies');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  return (
    <nav className="flex justify-between items-center sticky bg-[#17192D] p-2.5 h-[60px]">
      <img src={LogoImg} alt="tractian logo" className="h-10" />
      <div className="flex gap-5 pr-5">
        {companies.map((company, index) => (
          <CompanyButton
            key={company.id || index}
            text={company.name}
            onClick={() => setSelected(company)}
            isSelected={selected?.id === company.id}
          />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;