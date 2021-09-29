import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API } from "src/constants/api.path";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostApi {
    private readonly BASE_PATH = API.POST
    private readonly UPSERT_PATH = `/post/upsert`
    private readonly GET_ALL_PATH = `/posts`

    constructor(private http: HttpClient) { }

    upsert(post: Post): Observable<Post> {
        return this.http.put<Post>(`${this.BASE_PATH}${this.UPSERT_PATH}`, post)
    }

    all(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.BASE_PATH}${this.GET_ALL_PATH}`)
    }
}
interface Post {
    postId: string
    parentId: string
    type: string
    title: string
    content: string
    username: string
}