import { Component, OnInit } from '@angular/core';
import { CommentService } from "../services/comment.service";
import { CommentModel } from "../model/comment-model";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

    comments: CommentModel[] = [];
    id!: string;

    constructor(
        private commentService: CommentService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.findCommentsByPostId(this.id);
    }

    findCommentsByPostId(id: string) {
        return this.commentService.findCommentByPostId(id).pipe().subscribe((data: CommentModel[]) => {
            this.comments = data;
        });
    }
}
