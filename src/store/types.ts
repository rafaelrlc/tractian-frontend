export type CompanyList = { id: string; name: string }[];
export type SelectedDashboardButtonType = "alert" | "energy" | null;
export type Company = {id : string; name : string}

export type SensorType = 'energy' | 'vibration' | null
export type StatusType = 'operating' | 'alert' | null

export interface TreeNode {
  id: string
  name: string
  type: 'location' | 'asset' | 'component'
  children?: TreeNode[]
  sensorType?: SensorType
  status?: StatusType
  isExpanded?: boolean
}
