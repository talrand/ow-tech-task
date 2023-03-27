import { SortDirection } from "../types/SortDirection";
import { Title } from "../types/Title";

export const SortByTitleNumber = (a :Title, b :Title, direction :SortDirection) => {
    if (a["Title Number"] === b["Title Number"]) {
        return 0
    }
    switch (direction) {
        case SortDirection.Ascending:
            return a["Title Number"] < b["Title Number"] ? -1 : 1;

        case SortDirection.Descending:
            return a["Title Number"] < b["Title Number"] ? 1 : -1;

        default:
            return 0;
    }
}

export const SortByTenure = (a :Title, b :Title, direction :SortDirection) => {
    if (a.Tenure === b.Tenure) {
        return 0
    }

    switch (direction) {
        case SortDirection.Ascending:
            return a.Tenure < b.Tenure ? -1 : 1;

        case SortDirection.Descending:
            return a.Tenure < b.Tenure ? 1 : -1;
            
        default:
            return 0;
    }
}