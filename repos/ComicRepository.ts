import Repository from "~/repos/Repository";
import type Resource from "~/types/Resource";
import type PaginatedCollection from "~/types/PaginatedCollection";

export default class ComicRepository extends Repository {
    public index(page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(`comic.index.${page}`, '/comics?' + querify({page}).toString());
    }

    public show(id: number) {
        return this.client.getData<Resource<any>>(`comic.show.${id}`, `/comics/${id}`);
    }
}