import { Component, OnInit } from '@angular/core';
import { PostModel } from "../model/post-model";
import { PostService } from "../services/post.service";
import { Observable } from "rxjs";

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

    posts: PostModel[] = [];

    constructor(private postService: PostService) {
    }

    ngOnInit() {
        this.findAllPosts();
    }

    findAllPosts() {
        this.postService.getAll().subscribe((data: PostModel[]) => {
            this.posts = data;
        })
    }

    deletePost(id: number) {
        this.postService.deletePost(id).subscribe(res => {
            this.posts = this.posts.filter(item => item.id != id);
        })
    }
}
