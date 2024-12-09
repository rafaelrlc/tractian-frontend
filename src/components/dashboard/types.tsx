export interface HeaderButtonProps {
  text: string
  isActivated: boolean
  onClick : () => void
  icon : React.ReactNode
}

export interface DashboardHeaderButton {
  text: string
  code : string
  icon : React.ReactNode
}

type SensorType = 'energy' | 'vibration' | null
type StatusType = 'operating' | 'alert' | null

export interface TreeNode {
  id: string
  name: string
  type: 'location' | 'asset' | 'component'
  children?: TreeNode[]
  sensorType?: SensorType
  status?: StatusType
  isExpanded?: boolean
}

export interface Asset {
  id: string
  name: string
  locationId: string | null
  parentId: string | null
  sensorType: SensorType
  status: StatusType
  gatewayId?: string
  sensorId?: string
}

export interface Location {
  id: string
  name: string
  parentId: string | null
}
