import React from 'react';
import { TreeNode } from './types';

interface ComponentContentProps {
  component: TreeNode
}

const ComponentContent: React.FC<ComponentContentProps> = ({ component }) => {
  return (
    <div className="bg-white rounded p-4">
      <div className="flex items-center gap-5 mb-3">
        <h3 className="text-lg font-semibold">{component.name.toLocaleUpperCase()}</h3>
        {component.status === 'alert' ? <span className="h-3 w-3 bg-red-500 rounded-full"></span> : <span className="h-3 w-3 bg-green-500 rounded-full"></span>}
      </div>

      <div className="flex gap-6 border-b py-5">
        <div className="flex justify-center items-center h-[250px] w-[45%] border border-dashed border-blue-300 rounded-lg bg-gray-100">
          <button className="text-blue-500 hover:underline text-sm">
            Adicionar imagem do Ativo
          </button>
        </div>

        <div className='w-[55%] mt-6'>
          <div className='flex flex-col'>     
            <div className='flex flex-col gap-2 mb-5'>
            <h2 className="block text-gray-700 font-bold">Tipo de Equipamento</h2>
            <p className="text-gray-500">Motor Elétrico (Trifásico)</p>
          </div>
            <div>
              <h2 className="text-gray-700 font-bold">Responsáveis</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">
                  M
                </div>
                <span className="text-gray-600 text-sm">Mecânica</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5">
        <div>
          <h2 className="text-gray-700 font-bold">Sensor</h2>
          <p className="text-gray-600">{component.sensorType?.toLocaleUpperCase()}</p>
        </div>
        <div>
          <h2 className="text-gray-700 font-bold">Receptor</h2>
          <p className="text-gray-600">86GTFD7</p>
        </div>
      </div>
    </div>
  )
}

export default ComponentContent;