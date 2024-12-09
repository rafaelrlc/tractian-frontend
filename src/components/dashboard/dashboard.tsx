import DashboardHeader from "./header"
import Tree from "./tree"

const DashBoard = () => {
  return (
    <div className='bg-white h-[calc(100vh-65px)] m-[7px] border-[1px] border-gray-300 rounded-lg'>
      <DashboardHeader />
      <div className='flex'>
        <div className='w-[40%]'>
          <Tree />
        </div>
      </div>
    </div>
  )
}

export default DashBoard