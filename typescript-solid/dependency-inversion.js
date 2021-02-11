"use strict";
// Your classes and modules should depend on abstractions instead of concrete implementations
// This comes down to a single concept: interfaces
// The abstractions are actually interfaces
// You structure your code in such a way so that classes depend on interfaces and not actual implementations
// This promotes loose coupling. Loose coupling is a powerful programming paradigm that allows classes to be swapped without breaking your application
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsFeed = exports.MockPostsService = exports.PostsService = void 0;
var fs = require("fs");
var PostsService = /** @class */ (function () {
    function PostsService() {
        this._fileName = "posts.json";
    }
    PostsService.prototype.getAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            fs.readFile(_this._fileName, "utf8", function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(JSON.parse(data));
            });
        });
    };
    PostsService.prototype.save = function (post) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getAll().then(function (posts) {
                posts.push(post);
                fs.writeFile(_this._fileName, posts, function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    };
    return PostsService;
}());
exports.PostsService = PostsService;
var MockPostsService = /** @class */ (function () {
    function MockPostsService() {
        this.posts = [];
        this.posts = [
            { id: 1, title: 'Test Post 1', body: 'Test post 1', postedBy: 'me' },
            { id: 2, title: 'Test Post 2', body: 'Test post 2', postedBy: 'me' },
            { id: 3, title: 'Test Post 3', body: 'Test post 3', postedBy: 'me' },
            { id: 4, title: 'Test Post 4', body: 'Test post 4', postedBy: 'me' }
        ];
    }
    MockPostsService.prototype.getAll = function () {
        return Promise.resolve(this.posts);
    };
    MockPostsService.prototype.save = function (post) {
        this.posts.push(post);
        return Promise.resolve();
    };
    return MockPostsService;
}());
exports.MockPostsService = MockPostsService;
var NewsFeed = /** @class */ (function () {
    function NewsFeed(_service) {
        this._service = _service;
    }
    NewsFeed.prototype.show = function () {
        this._service.getAll().then(function (posts) {
            posts.forEach(function (post) {
                console.log(post.title + " - " + post.body);
            });
        });
    };
    return NewsFeed;
}());
exports.NewsFeed = NewsFeed;
var newsFeed = new NewsFeed(new MockPostsService());
newsFeed.show();
