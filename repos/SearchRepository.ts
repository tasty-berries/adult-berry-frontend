import Repository from "~/repos/Repository";
import type PaginatedCollection from "~/types/PaginatedCollection";

export default class SearchRepository extends Repository {
    public index(request: () => any) {
        return this.client.getLazyFetch<PaginatedCollection<any>>(() => '/search?' + querify(request()).toString());
    }
}
