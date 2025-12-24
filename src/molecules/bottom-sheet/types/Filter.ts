/**
 * Domain - Filter Entities
 */

export interface FilterOption {
    id: string;
    label: string;
    icon?: string;
    type?: string;
    count?: number;
}

export interface FilterCategory {
    id: string;
    title: string;
    options: FilterOption[];
    multiSelect?: boolean;
}

export class FilterUtils {
    static hasActiveFilter(selectedIds: string[], defaultId: string = "all"): boolean {
        if (selectedIds.length === 0) return false;
        if (selectedIds.length === 1 && selectedIds[0] === defaultId) return false;
        return true;
    }

    static toggleFilter(
        selectedIds: string[],
        filterId: string,
        multiSelect: boolean = false,
        defaultId: string = "all"
    ): string[] {
        if (filterId === defaultId) {
            return [defaultId];
        }

        if (multiSelect) {
            const newIds = selectedIds.filter((id) => id !== defaultId);
            if (newIds.includes(filterId)) {
                const filtered = newIds.filter((id) => id !== filterId);
                return filtered.length === 0 ? [defaultId] : filtered;
            }
            return [...newIds, filterId];
        }

        return [filterId];
    }
}
