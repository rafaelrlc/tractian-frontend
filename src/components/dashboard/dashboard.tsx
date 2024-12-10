import { useState } from "react";
import ComponentContent from "./component-content"
import Header from "./header"
import Tree from "./tree"
import { TreeNode } from "./types";

const DashBoard = () => {
  const [selectedComponent, setSelectedComponent] = useState<TreeNode | null>(null)

  return (
    <div className='bg-white h-[calc(100vh-75px)] m-[7px] border-[1px] border-gray-300 rounded-lg'>
      <Header />
      <div className='flex h-[calc(70vh)]'>
        <div className='w-[40%]'>
          <Tree setSelectedComponent={setSelectedComponent} selectedComponent={selectedComponent} />
        </div>
        <div className='w-[60%]'>
          <div className='bg-gray-100'>
            {selectedComponent && (
              <ComponentContent component={selectedComponent} /> // Render selected component details
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard