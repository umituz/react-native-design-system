
export interface FilterItem<T = string> {
  label: string;
  value: T;
  testID?: string;
}

export interface FilterGroupProps<T = string> {
  items: FilterItem<T>[];
  selectedValue: T;
  onSelect: (value: T) => void;
  style?: any;
  contentContainerStyle?: any;
  itemStyle?: any;
}
