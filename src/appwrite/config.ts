import conf from "../conf/conf";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DatabaseService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
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
  }: any) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featureImage, status, userId }
      );
    } catch (error) {
      console.log("Appwrite service :: create post :: error", error);
    }
  }
  //updatePost
  async updatePost(slug: any, { title, content, featureImage, status }: any) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: update post :: error", error);
    }
  }
  //deletePost
  async deletePost(slug: any) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: delete post :: error", error);
      return false;
    }
  }
  //get single post
  async getPost(slug: any) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: get post :: error", error);
      return false;
    }
  }
  //get all post
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: get posts :: error", error);
      return false;
    }
  }
  //file upload services
  async uploadFile(file: any) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: file upload :: error", error);
      return false;
    }
  }
  //delete file
  async deleteFile(fileId: any) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: file upload :: error", error);
      return false;
    }
  }
  //file preview
  getFilePreview(fileId: any) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new DatabaseService();

export default service;
