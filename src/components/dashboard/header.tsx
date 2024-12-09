import HeaderButton from "./sensor-button"

import { useAtom } from 'jotai';
import { selectedCompany, toggleDashboardButtonAtom } from "../../store/store";
import { SelectedDashboardButtonType } from "../../store/types";

import { CircleAlert, Zap } from 'lucide-react';

import { DashboardHeaderButton } from "./types";

const DashboardHeader = () => {

  const [company] = useAtom(selectedCompany);
  const [selectedDashboardButton, toggleDashboardButton] = useAtom(toggleDashboardButtonAtom);

  const dashboardHeaderButtons: DashboardHeaderButton[] = [
    {
      text: 'Sensor de Energia',
      code: 'energy',
      icon: <Zap size={14} />
    },
    {
      text: 'Crítico',
      code: 'alert',
      icon: <CircleAlert size={14} />
    }
  ]

  return (
    <div className="m-3">
      <div className="flex justify-between items-center my-4 mx-2">
        <div className="flex gap-3 items-center">
          <h1 className="text-black text-[1.35rem]">Ativos</h1>
          <p className="text-sm text-gray-400 flex items-center">
          / {company ? `${company.name} Unit` : ''}
          </p>
        </div>
        <div className="flex gap-3">
          {
            dashboardHeaderButtons.map((button, index) => (
              <HeaderButton
                key={index}
                text={button.text}
                isActivated={button.code === selectedDashboardButton}
                icon={button.icon}
                onClick={() => toggleDashboardButton(button.code as SelectedDashboardButtonType)}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader