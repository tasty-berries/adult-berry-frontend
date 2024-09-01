import Repository from "~/repos/Repository";
import type PaginatedCollection from "~/types/PaginatedCollection";
import type Resource from "~/types/Resource";

export default class TitleRepository extends Repository {
    public index(page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(`title.index.${page}`, '/titles?' + querify({page}).toString());
    }

    public show(id: number) {
        return this.client.getData<Resource<any>>(`title.show.${id}`, `/titles/${id}`);
    }

    public comics(id: number, page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(`title.show.${id}.comics.index.${page}`, `/titles/${id}/comics?` + querify({page}).toString());
    }

    public characters(id: number, page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(`title.show.${id}.characters.index.${page}`, `/titles/${id}/characters?` + querify({page}).toString());
    }

    public tags(id: number, page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(`title.show.${id}.tags.index.${page}`, `/titles/${id}/tags?` + querify({page}).toString());
    }

    public authors(id: number, page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(`title.show.${id}.authors.index.${page}`, `/titles/${id}/authors?` + querify({page}).toString());
    }

    public characterComics(titleId: number, characterId: number, page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(
            `title.show.${titleId}.characters.show.${characterId}.comics.index`,
            `/titles/${titleId}/characters/${characterId}?` + querify({page}).toString()
        );
    }

    public tagComics(titleId: number, tagId: number, page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(
            `title.show.${titleId}.tags.show.${tagId}.comics.index`,
            `/titles/${titleId}/tags/${tagId}?` + querify({page}).toString()
        );
    }
}
