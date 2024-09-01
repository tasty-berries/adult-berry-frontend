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

    public characters(id: number, page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(`author.show.${id}.characters.index.${page}`, `/authors/${id}/characters?` + querify({page}).toString());
    }

    public tags(id: number, page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(`author.show.${id}.tags.index.${page}`, `/authors/${id}/tags?` + querify({page}).toString());
    }

    public characterComics(authorId: number, characterId: number, page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(
            `author.show.${authorId}.characters.show.${characterId}.comics.index`,
            `/authors/${authorId}/characters/${characterId}?` + querify({page}).toString()
        );
    }

    public tagComics(authorId: number, tagId: number, page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(
            `author.show.${authorId}.tags.show.${tagId}.comics.index`,
            `/authors/${authorId}/tags/${tagId}?` + querify({page}).toString()
        );
    }
}