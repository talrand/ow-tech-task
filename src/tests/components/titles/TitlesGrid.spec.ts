import { mount, shallowMount } from "@vue/test-utils";
import { test, expect, describe } from "vitest";
import { Title } from "../../../types/Title";
import { TitleSort } from "../../../types/TitleSort";
import { SortDirection } from "../../../types/SortDirection";
import TitlesGrid from "../../../components/titles/TitlesGrid.vue";
import GridHeader from "../../../components/ui/GridHeader.vue";
import Pagination from "../../../components/ui/Pagination.vue";

const testData: Title[] = [
    {
        "Title Number": "BB15891",
        "Property Address": "ground floor and basement 32-33 Hatton Garden, London (EC1N 8DL)",
        "Tenure": "Leasehold",
        "X": -0.107986685,
        "Y": 51.51993163
    },
    {
        "Title Number": "87401",
        "Property Address": "45 Hatton Garden, London (EC1N 8EU)",
        "Tenure": "Freehold",
        "X": -0.108401741,
        "Y": 51.52086283
    },
    {
        "Title Number": "AGL436244",
        "Property Address": "Farringdon Station, Cowcross Street, London, EC1M 6BY",
        "Tenure": "Freehold",
        "X": -0.105314569,
        "Y": 51.52098786
    },
    {
        "Title Number": "AGL250417",
        "Property Address": "First Floor Farringdon Place, 20 Farringdon Road, London (EC1M 3HE)",
        "Tenure": "Leasehold",
        "X": -0.105581315,
        "Y": 51.52042461
    },
    {
        "Title Number": "EGL564707",
        "Property Address": "Blocks A-F and H, J, K and L Peabody Estate and 1-5 Peabody Terrace, Farringdon Lane, London",
        "Tenure": "Freehold",
        "X": -0.107177377,
        "Y": 51.52405734
    }
]

const config = {
    propsData: {
        titles: testData,
        resultsPerPage: 3,
        defaultSort: TitleSort.None,
        defaultSortDirection: SortDirection.None,
        defaultPage: 1
    }
}

describe('TitlesGrid', () => {
    test('Tests components are rendered correctly', () => {
        const wrapper = mount(TitlesGrid, config);

        expect(wrapper.findAllComponents(GridHeader)).toHaveLength(2);
        expect(wrapper.findComponent(Pagination).exists()).toBeTruthy();
        expect(wrapper.find('table').exists()).toBeTruthy();
    });

    test('Tests correct details are displayed for current page', () => {
        const wrapper = shallowMount(TitlesGrid, config);

        expect(wrapper.vm.titles).toEqual(testData);
        
        for(let i = config.propsData.defaultPage - 1; i < config.propsData.resultsPerPage; i++) {
            expect(wrapper.text()).toContain(testData[i]["Title Number"]);
            expect(wrapper.text()).toContain(testData[i].Tenure);
        }
    });
});
