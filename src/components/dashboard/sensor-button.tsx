import { HeaderButtonProps } from "./types"

const HeaderButton = (
  { text, isActivated, icon, onClick }: HeaderButtonProps
) => {
  
  const buttonStyle = isActivated ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'

  return (
    <div>
      <button className={`${buttonStyle} p-1 rounded border px-3 flex items-center`} onClick={onClick}>
        {icon}
        <span className='ml-1'>{text}</span>
      </button>
    </div>
  )
}

export default HeaderButton