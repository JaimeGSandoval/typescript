// Your classes and modules should depend on abstractions instead of concrete implementations
// This comes down to a single concept: interfaces
// The abstractions are actually interfaces
// You structure your code in such a way so that classes depend on interfaces and not actual implementations
// This promotes loose coupling. Loose coupling is a powerful programming paradigm that allows classes to be swapped without breaking your application


import * as fs from "fs";

// We need to have have interface named Post that defines the way that the post is structured
export interface IPost {
  id: number;
  title: string;
  body: string;
  postedBy: string;
}

// Create an interface for the service. Why not just go ahead and create a post service that'll perform the fetching? Wel this is what dependency injection means by depending on abstractions/interfaces. Instead of having a post service, we first create an interface that defines how that that post service will behave

export interface IPostService {
  getAll(): Promise<IPost[]>;
  save(post: IPost): Promise<void>;
}

export class PostsService implements IPostService {
    private _fileName: string = "posts.json";

    constructor() {}

    getAll(): Promise<IPost[]> {
      return new Promise((resolve, reject) => {
        fs.readFile(this._fileName, "utf8", (err, data) => {
            if(err) {
               reject(err);
            }
            resolve(JSON.parse(data));
      });
    });
  }
   save(post:IPost): Promise<void> {
     return new Promise((resolve, reject) => {
       this.getAll().then(posts => {
         posts.push(post);
         fs.writeFile(this._fileName, posts, err => {
           if(err) {
             reject(err);
           }
           else {
             resolve();
           }
         });
       });
     });
   }
}


export class MockPostsService implements IPostService {

posts: IPost[] = [];
constructor() {
  this.posts = [
    {id: 1, title: 'Test Post 1', body: 'Test post 1', postedBy: 'me'},
    {id: 2, title: 'Test Post 2', body: 'Test post 2', postedBy: 'me'},
    {id: 3, title: 'Test Post 3', body: 'Test post 3', postedBy: 'me'},
    {id: 4, title: 'Test Post 4', body: 'Test post 4', postedBy: 'me'}
  ]
}

  getAll(): Promise<IPost[]> {
    return Promise.resolve(this.posts);
  }
  save(post: IPost): Promise<void> {
    this.posts.push(post);
    return Promise.resolve();
  }

}


// newsfeed wil not instantiate PostsService. Instead it will receive it in the constructor. This is the inversion of control/dependency inversion. NewsFeed needs to know how to construct the PostsService.
// For loose coupling purposes, we pass an IPostService interface, not the PostsService itself
export class NewsFeed {
  constructor(private _service: IPostService) {

  }

  show() {
    this._service.getAll().then(posts => {
      posts.forEach(post => {
        console.log(`${post.title} - ${post.body}`);
      })
    });
  }
}

// The newsfeed doesn't know how to construct the PostsService, it just requests a PostsService and we inject it.
// This is the inversion control principle
let newsFeed = new NewsFeed(new PostsService());
newsFeed.show()

// This demonstrates the real power of dependency inversion. We can just swap the real PostsService for the MockPostsService, or any other Service for that matter, and we still get the functionality that we want from the NewsFeed class
let newsFeed2 = new NewsFeed(new MockPostsService()); // mock testing
