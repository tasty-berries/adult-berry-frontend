import Repository from "~/repos/Repository";
import type Resource from "~/types/Resource";
import type PaginatedCollection from "~/types/PaginatedCollection";

export default class TagRepository extends Repository {
    public index(page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(`tag.index.${page}`, '/tags?' + querify({page}).toString());
    }

    public show(id: number) {
        return this.client.getData<Resource<any>>(`tag.show.${id}`, `/tags/${id}`);
    }

    public comics(id: number, page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(`tag.show.${id}.comics.index.${page}`, `/tags/${id}/comics?` + querify({page}).toString());
    }

    public characters(id: number, page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(`tag.show.${id}.characters.index.${page}`, `/tags/${id}/characters?` + querify({page}).toString());
    }
}