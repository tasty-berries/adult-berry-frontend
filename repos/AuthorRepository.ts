import Repository from "~/repos/Repository";
import type PaginatedCollection from "~/types/PaginatedCollection";
import type Resource from "~/types/Resource";

export default class AuthorRepository extends Repository {
    public index(page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(`author.index.${page}`, '/authors?' + querify({page}).toString());
    }

    public show(id: number) {
        return this.client.getData<Resource<any>>(`author.show.${id}`, `/authors/${id}`);
    }

    public comics(id: number, page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(`author.show.${id}.comics.index.${page}`, `/authors/${id}/comics?` + querify({page}).toString());
    }
}