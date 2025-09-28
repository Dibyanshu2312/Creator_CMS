import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  //usertable
  users: defineTable({
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
    username: v.optional(v.string()),
    tokenIdentifier: v.string(),
    createdAt: v.float64(),
    lastActiveAt: v.float64(),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"])
    .index("by_username", ["username"])
    .searchIndex("search_name", { searchField: "name" })
    .searchIndex("search_email", { searchField: "email" }),

    //posttable
     posts:defineTable({

      title: v.string(),
      content: v.string(),
      status: v.union(v.literal("draft"), v.literal("published")),
//author relationship
      authorId: v.id("users"),
//content metadata
      tags:v.array(v.string()),
      category: v.optional(v.string()),
      featuredImage: v.optional(v.string()),//imagekit url
//timestamps
      createdAt:v.number(),
      updatedAt:v.number(),
      publishedAt:v.optional(v.number()),
      scheduledFor:v.optional(v.number()),

      //analytics 
      viewCount:v.number(),
      likeCount: v.number(),
    })

    .index("by_author",["authorId"])
    .index("by_status",["status"])
    .index("by_published", ["status","publishedAt"])
    .index("by_author_status",["authorId", "status"])
    .searchIndex("search_content",{searchField:"title"}),

//commenttable
    comments: defineTable({
      postId: v.id("posts"),
      authorId:v.optional(v.id("users")),
      authorName:v.string(),
      authorEmail:v.optional(v.string()),

      content:v.string(),
      status:v.union(v.literal("approved"),v.literal("pending"),v.literal("rejected")),
      createdAt:v.number(),//optional for anonymous likes

    })

    .index("by_post",["postId"])
    .index("by_post_status",["postId","status"])
    .index("by_author",["authorId"]),//prevent duplicate likes

    likes:defineTable({
      postId: v.id("posts"),
      userId: v.optional(v.id("users")),
      createdAt:v.number(),
    })
    .index("by_post",["postId"])
    .index("by_user",["userId"])
    .index("by_post_user",["postId", "userId"]),//prevent duplicate likes
//followtable
    follows: defineTable({
      followerId:v.id("users"),
      followingId:v.id("users"),

      createdAt:v.number(),

    })
    .index("by_follower",["followerId"])
    .index("by_following",["followingId"])
    .index("by_relationship",["followerId","followingId"]),//prevent duplicates

//dailystats table
    dailyStats: defineTable({
      postId:v.id("posts"),
      date:v.string(),
      views:v.number(),
      
      createdAt:v.number(),
      updatedAt:v.number(),
    })
.index("by_post",["postId"])
.index("by_date",["date"])
.index("by_post_date",["postId","date"])//unique constraint
});
