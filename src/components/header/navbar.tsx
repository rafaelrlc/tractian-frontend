import CompanyButton from './company-button';

import { useAtom } from 'jotai';
import { selectedHeaderButtonAtom } from '../../store/store';
import { SelectedHeaderButtonType } from '../../store/types';

import { headerButtons } from "../../lib/constants";
import logo from "../../assets/file.png";

const Navbar = () => {
  const [selectedHeaderButton, setSelectedHeaderButton] = useAtom(selectedHeaderButtonAtom);

  return (
    <nav className="flex justify-between items-center sticky bg-[#17192D] p-2.5 h-[60px]">
      <img src={logo} alt="tractian logo" className="h-10" />
      <div className="flex gap-5">
        {headerButtons.map((company, index) => (
          <CompanyButton
            key={index}
            text={company.text}
            onClick={() => setSelectedHeaderButton(company.code as SelectedHeaderButtonType)}
            isSelected={selectedHeaderButton === company.code}
          />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;