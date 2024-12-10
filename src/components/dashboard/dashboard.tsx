import { useState } from "react";
import ComponentContent from "./component-content"
import Header from "./header"
import Tree from "./tree"
import { TreeNode } from "./types";

const DashBoard = () => {
  const [selectedComponent, setSelectedComponent] = useState<TreeNode | null>(null)

  return (
    <div className="mx-3 h-[calc(100vh-60px)]">
      <Header />
      <div className='flex gap-4'>
        <div className='w-[40%] border'>
          <Tree setSelectedComponent={setSelectedComponent} selectedComponent={selectedComponent} />
        </div>
        <div className='w-[60%] border'>
          <div className='bg-gray-100'>
            {selectedComponent && (
              <ComponentContent component={selectedComponent} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard