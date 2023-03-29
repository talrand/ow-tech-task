import {test, expect, describe } from 'vitest';
import { SortByTenure, SortByTitleNumber } from '../../helpers/SortHelper';
import { SortDirection } from '../../types/SortDirection';
import { Title } from '../../types/Title'

const testData :Title[] = [
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

describe('SortHelper', () => {
    test('Tests titles are sorted by title number ascending', () => {
        const sortedData = [...testData].sort((a, b) => SortByTitleNumber(a, b, SortDirection.Ascending));
        let isSorted = true;

        for (let i = 0; i < sortedData.length -1; i++) {
            if (sortedData[i]['Title Number'] > sortedData[i + 1]['Title Number']) {
                isSorted = false;
                break;
            }
        }

        expect(isSorted).toBeTruthy();
    });

    test('Tests titles are sorted by title number descending', () => {
        const sortedData = [...testData].sort((a, b) => SortByTitleNumber(a, b, SortDirection.Descending));
        let isSorted = true;

        for (let i = 0; i < sortedData.length -1; i++) {
            if (sortedData[i]['Title Number'] < sortedData[i + 1]['Title Number']) {
                isSorted = false;
                break;
            }
        }

        expect(isSorted).toBeTruthy();
    });

    test('Tests titles are sorted by tenure ascending', () => {
        const sortedData = [...testData].sort((a, b) => SortByTenure(a, b, SortDirection.Ascending));
        let isSorted = true;

        for (let i = 0; i < sortedData.length -1; i++) {
            if (sortedData[i].Tenure > sortedData[i + 1].Tenure) {
                isSorted = false;
                break;
            }
        }

        expect(isSorted).toBeTruthy();
    });

    test('Tests titles are sorted by tenure number descending', () => {
        const sortedData = [...testData].sort((a, b) => SortByTenure(a, b, SortDirection.Descending));
        let isSorted = true;

        for (let i = 0; i < sortedData.length -1; i++) {
            if (sortedData[i].Tenure < sortedData[i + 1].Tenure) {
                isSorted = false;
                break;
            }
        }

        expect(isSorted).toBeTruthy();
    });    
});