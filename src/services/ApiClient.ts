import { App, Plugin } from "vue"
import { Title } from "../types/Title";

/** Wrapper class that handles all communication with the OW Titles api */
export class ApiClient {
    private readonly _url = 'https://owfetechtask.blob.core.windows.net/titledata/testdata.json';

    /** Gets all titles from Titles api */
    public async getTitles() :Promise<Title[]> {
        const response = await fetch(this._url, {
            method: 'GET',
            mode: 'cors'
        });

        /* If a sucess response isn't returned an error is raised
         * so user can be informed that the app can't retrieve data */
        if (!response.ok) {
            throw `${response.status} - ${response.statusText}`
        }

        return await response.json();
    }
}

/** Plugin that allows the api client to be used throughout the app via dependency injection */
export const ApiClientPlugin :Plugin = (app: App) => {
    const apiClient = new ApiClient();
    app.provide('apiClient', apiClient);
}