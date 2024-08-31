import Repository from "~/repos/Repository";
import type PaginatedCollection from "~/types/PaginatedCollection";
import type Resource from "~/types/Resource";

export default class CharacterRepository extends Repository {
    public index(page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(`character.index.${page}`, '/characters?' + querify({page}).toString());
    }

    public show(id: number) {
        return this.client.getData<Resource<any>>(`character.show.${id}`, `/characters/${id}`);
    }

    public comics(id: number, page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(`character.show.${id}.comics.index.${page}`, `/characters/${id}/comics?` + querify({page}).toString());
    }

    public tags(id: number, page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(`character.show.${id}.tags.index.${page}`, `/characters/${id}/tags?` + querify({page}).toString());
    }

    public titles(id: number, page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(`character.show.${id}.titles.index.${page}`, `/characters/${id}/titles?` + querify({page}).toString());
    }

    public tagComics(characterId: number, tagId: number, page: number = 1) {
        return this.client.getData<PaginatedCollection<any>>(
            `character.show.${characterId}.tags.show.${tagId}.comics.index`,
            `/characters/${characterId}/tags/${tagId}?` + querify({page}).toString()
        );
    }
}