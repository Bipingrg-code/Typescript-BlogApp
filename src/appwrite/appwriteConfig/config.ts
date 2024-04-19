import config from "../../config/api/config";

import { Client, ID, Databases, Storage, Query } from "appwrite";

interface PostType {
  title: string;
  slug: string;
  content: string;
  featureImage: string;
  status: boolean | string;
  userId: boolean | string;
}

export class DatabaseService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //createPost
  async createPost({
    title,
    slug,
    content,
    featureImage,
    status,
    userId,
  }: PostType) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { title, content, featureImage, status, userId }
      );
    } catch (error) {
      console.log("Appwrite service :: create post :: error", error);
    }
  }
  //updatePost
  async updatePost(
    slug: string,
    { title, content, featureImage, status }: PostType
  ) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
        } as PostType
      );
    } catch (error) {
      console.log("Appwrite service :: update post :: error", error);
    }
  }
  // deletePost
  async deletePost(slug: string) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      )
      return true
    } catch (error) {
      console.log("Appwrite service :: delete post :: error", error);
      return false
    }
  }

  // singlePost
  async getPost(slug:string){
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      )
    } catch (error) {
      console.log("Appwrite service :: Get post :: error", error);
    }
  }
  // allPost
  async getAllPosts(queries = [Query.equal("status","active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries,
      )
    } catch (error) {
      console.log("Appwrite service :: Get All post :: error", error);
      return false
    }
  }

  // fileUpload
  async uploadFile(file:any){
    try {
      return await this.bucket.createFile(config.appwriteBucketId,ID.unique(),file)
    } catch (error) {
      console.log('Appwrite Service :: File Upload Error', error)
    }
  }

  // deleteFile
  async deleteFile(fileId:string){
    try {
      await this.bucket.deleteFile(
        config.appwriteBucketId,
        fileId
      )
      return true
    } catch (error) {
      console.log("Appwrite Service :: error : ", error)
      return false
    }
  }

  // filePreview
  getFilePreview(fileId:string){
    return this.bucket.getFilePreview(
      config.appwriteBucketId,
      fileId
    )
  }
}

const service = new DatabaseService();

export default service;
