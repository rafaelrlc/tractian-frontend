import DashboardHeader from "./header"
import Tree from "./tree"

const DashBoard = () => {
  return (
    <div className='bg-white h-[calc(100vh-60px)] m-2 border-2 border-gray-300 rounded-lg'>
      <DashboardHeader />
      <div>
        <Tree />
      </div>
    </div>
  )
}

export default DashBoard