import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API } from "src/constants/api.path";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostApi {
    private readonly BASE_PATH = API.POST
    private readonly POST_PATH = `/post`
    private readonly COMMENT_PATH = `/comment`
    private readonly LOCATION_PATH = `/location`
    private readonly UPSERT_PATH = `/upsert`
    private readonly UPLOAD_PATH = `/image`
    private readonly GET_ALL_PATH = `s`

    constructor(private http: HttpClient) { }

    upsertPost(post: Post): Observable<Post> {
        return this.http.put<Post>(`${this.BASE_PATH}${this.POST_PATH}${this.UPSERT_PATH}`, post)
    }

    allPost(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.BASE_PATH}${this.POST_PATH}${this.GET_ALL_PATH}`)
    }

    deletePost(postId: string): Observable<string> {
        return this.http.delete(`${this.BASE_PATH}${this.POST_PATH}/${postId}`, { responseType: 'text' })
    }

    upsertComment(comment: Comment): Observable<Comment> {
        return this.http.put<Comment>(`${this.BASE_PATH}${this.COMMENT_PATH}${this.UPSERT_PATH}`, comment)
    }

    allComment(): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${this.BASE_PATH}${this.COMMENT_PATH}${this.GET_ALL_PATH}`)
    }

    allCommentByParentId(parentId: string): Observable<Comment[]> {
        const params = new HttpParams()
            .set('parentId', parentId)
        return this.http.get<Comment[]>(`${this.BASE_PATH}${this.COMMENT_PATH}${this.GET_ALL_PATH}`, { params: params })
    }

    deleteComment(postId: string): Observable<string> {
        return this.http.delete(`${this.BASE_PATH}${this.COMMENT_PATH}/${postId}`, { responseType: 'text' })
    }

    uploadFile(file): Observable<string> {
        const formData: FormData = new FormData();
        formData.append('file', file)
        return this.http.put(`${this.BASE_PATH}${this.UPLOAD_PATH}`, formData, { responseType: 'text' })
    }

    deleteFile(url): Observable<string> {
        const params = new HttpParams()
            .set('url', url)
        return this.http.delete(`${this.BASE_PATH}${this.UPLOAD_PATH}`, { params: params, responseType: 'text' })
    }

    upsertLocation(location: Location): Observable<Location> {
        return this.http.put<Location>(`${this.BASE_PATH}${this.LOCATION_PATH}${this.UPSERT_PATH}`, location)
    }

    allLocation(): Observable<Location[]> {
        return this.http.get<Location[]>(`${this.BASE_PATH}${this.LOCATION_PATH}${this.GET_ALL_PATH}`)
    }

    allLocationByParentId(parentId: string): Observable<Location[]> {
        const params = new HttpParams()
            .set('parentId', parentId)
        return this.http.get<Location[]>(`${this.BASE_PATH}${this.LOCATION_PATH}${this.GET_ALL_PATH}`, { params: params })
    }

    deleteLocation(postId: string): Observable<string> {
        return this.http.delete(`${this.BASE_PATH}${this.LOCATION_PATH}/${postId}`, { responseType: 'text' })
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
interface Comment {
    postId: string
    parentId: string
    type: string
    content: string
    username: string
}
interface Location {
    postId: string
    parentId: string
    type: string
    lat: number
    lng: number
    address: string
    img: string
    content: string
    username: string
}