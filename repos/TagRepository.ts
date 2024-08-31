import Repository from "~/repos/Repository";
import type Resource from "~/types/Resource";

export default class TagRepository extends Repository {
    public show(id: number) {
        return this.client.getData<Resource<any>>(`tag.show.${id}`, `/tags/${id}`);
    }
}