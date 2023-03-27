import {test, expect } from 'vitest';
import { ApiClient } from '../../services/ApiClient';
import { Title } from '../../types/Title'

test('Test api client returns results', async () => {
    const apiClient = new ApiClient();
    const titles :Title[] = await apiClient.getTitles();

    /* As there's no way of knowing what data is returned by the api,
     * the only behaviour we can test is that the api doesn't error 
     * and some results are returned */ 
    expect(titles).toBeTruthy();
    expect(titles.length).toBeGreaterThan(0);
});