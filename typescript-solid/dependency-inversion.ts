// Your classes and modules should depend on abstractions instead of concrete implementations
// This comes down to a single concept: interfaces
// The abstractions are actually interfaces
// You structure your code in such a way so that classes depend on interfaces and not actual implementations
// This promotes loose coupling. Loose coupling is a powerful programming paradigm that allows classes to be swapped without breaking your application


export interface  Post {
  id: number;
  title: string;
  body: string;
  postedBy: string;
}

export interface IPostsService {
  getAll(): Promise<Post[]>;
  save(post: Post): Promise<void>;
}

export class PostsService implements IPostsService {
  getAll(): Promise<Post[]> {
    throw new Error('Method not implemented');
  }

  save(post: Post): Promise<void> {
    throw new Error('Method not implemented');
  }
}
