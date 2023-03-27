import { defineStore } from 'pinia';
import { inject, ref } from 'vue';
import { ApiClient } from '../services/ApiClient';
import { Title } from '../types/Title';
import { Mutex } from 'async-mutex';

export const useTitlesStore = defineStore('titlesStore', () => {
    const titles = ref<Title[]>([])
    const apiClient = inject('apiClient') as ApiClient;
    const mutex = new Mutex();
    
    /** Retrieves all property titles */
    const getTitles = async () => {
        /* To avoid degrading performance and putting unnecessary strain on the api,
         * only allow 1 thread/process to get data at a time */
        return await mutex.runExclusive(async () => {           
            // To improve performance, only call api if title data hasn't already been retrieved
            if (isTitleDataEmpty()) {
                titles.value = await apiClient.getTitles();
            }
    
            return titles.value;
        });
    }

    /** Retrieves the title details for the passed title number */
    const getTitleByNumber = async (titleNumber :string) => {
        if (!titleNumber) {
            throw 'id cannot be null or empty';
        }

        /* Populate title data if it hasn't already been populated
         * This can happen if a user goes directly to a title details page 
         * without loading the titles page first */
        if (isTitleDataEmpty()) {
            await getTitles();
        }

        return titles.value.find(title => title['Title Number'] === titleNumber);
    }

    /** Checks whether the title data is empty */
    const isTitleDataEmpty = () => !titles.value?.length;

    return { getTitles, getTitleByNumber }
});