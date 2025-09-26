import { mutation, query } from "./_generated/server";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name });
      }
      return user._id;
    }
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("users", {
      name: identity.name ?? "",
    email: identity.email ?? "",          // ✅ REQUIRED
    imageUrl: identity.pictureUrl ?? "",  // ✅ optional but safe to fill
    username: identity.nickname ?? "",    // ✅ optional but safe to fill
    tokenIdentifier: identity.tokenIdentifier,
    lastActiveAt: Date.now(),  
    });
  },
});

export const getCurrentuser = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Called getCurrentUser without authentication present");
        }
        const user = await ctx.db.query("users").withIndex.withIndex("by_token", (q) =>
            q.eq("tokenIdentifier", identity.tokenIdentifier)
        ).unique();
        
        if(!user){
            throw new Error("User not found");
        }
        return user;
    },
});

