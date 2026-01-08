
export interface FilterGroupItem<T = string> {
  label: string;
  value: T;
  testID?: string;
}

export interface FilterGroupProps<T = string> {
  items: FilterGroupItem<T>[];
  selectedValue: T;
  onSelect: (value: T) => void;
  style?: any;
  contentContainerStyle?: any;
  itemStyle?: any;
}
